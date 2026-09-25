"use client";

import { View, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import {
  LinearFilter,
  Mesh,
  ShaderMaterial,
  SRGBColorSpace,
  Vector2,
} from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uVelocity;

  void main() {
    vUv = uv;
    vec3 transformed = position;
    transformed.y += sin(uv.x * 3.14159265) * uVelocity * 0.002;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform vec2 uImageSize;
  uniform vec2 uPlaneSize;
  uniform float uHover;
  uniform float uVelocity;
  uniform float uTime;

  vec2 coverUv(vec2 uv, vec2 imageSize, vec2 planeSize) {
    float imageAspect = imageSize.x / imageSize.y;
    float planeAspect = planeSize.x / planeSize.y;
    vec2 ratio = vec2(
      min(planeAspect / imageAspect, 1.0),
      min(imageAspect / planeAspect, 1.0)
    );
    return uv * ratio + (1.0 - ratio) * 0.5;
  }

  void main() {
    vec2 uv = coverUv(vUv, uImageSize, uPlaneSize);
    vec2 delta = uv - uMouse;
    float distanceToMouse = length(delta);
    float ripple = sin(distanceToMouse * 34.0 - uTime * 5.0)
      * exp(-distanceToMouse * 7.0)
      * uHover
      * 0.018;
    uv += normalize(delta + 0.0001) * ripple;

    float shift = clamp(abs(uVelocity) * 0.00022, 0.0, 0.012);
    float red = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
    float green = texture2D(uTexture, uv).g;
    float blue = texture2D(uTexture, uv - vec2(shift, 0.0)).b;
    float alpha = texture2D(uTexture, uv).a;

    gl_FragColor = vec4(red, green, blue, alpha);
  }
`;

type PointerPosition = { x: number; y: number };

function ShaderImage({
  src,
  hovered,
  mouse,
}: {
  src: string;
  hovered: boolean;
  mouse: React.MutableRefObject<PointerPosition>;
}) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const texture = useTexture(src);
  const viewport = useThree((state) => state.viewport);
  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new Vector2(0.5, 0.5) },
      uImageSize: { value: new Vector2(1, 1) },
      uPlaneSize: { value: new Vector2(1, 1) },
      uHover: { value: 0 },
      uVelocity: { value: 0 },
      uTime: { value: 0 },
    }),
    [texture],
  );

  useEffect(() => {
    texture.colorSpace = SRGBColorSpace;
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;
    const image = texture.image as { width?: number; height?: number } | undefined;
    uniforms.uImageSize.value.set(image?.width ?? 1, image?.height ?? 1);
  }, [texture, uniforms]);

  useEffect(() => {
    gsap.to(uniforms.uHover, {
      value: hovered ? 1 : 0,
      duration: 0.8,
      ease: "aurora",
      overwrite: "auto",
    });
  }, [hovered, uniforms]);

  useFrame((state, delta) => {
    const material = materialRef.current;
    if (!material) return;
    const lenis = (
      window as unknown as { auroraLenis?: { velocity?: number } }
    ).auroraLenis;
    const targetVelocity = lenis?.velocity ?? 0;

    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
    material.uniforms.uPlaneSize.value.set(viewport.width, viewport.height);
    material.uniforms.uVelocity.value = gsap.utils.interpolate(
      material.uniforms.uVelocity.value,
      targetVelocity,
      Math.min(1, delta * 7),
    );
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        transparent
        uniforms={uniforms}
        vertexShader={vertexShader}
      />
    </mesh>
  );
}

type DistortedImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export function DistortedImage({
  src,
  alt,
  sizes,
  className = "",
  priority = false,
}: DistortedImageProps) {
  const mouse = useRef<PointerPosition>({ x: 0.5, y: 0.5 });
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute inset-0"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouse.current.x = (event.clientX - rect.left) / rect.width;
        mouse.current.y = 1 - (event.clientY - rect.top) / rect.height;
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`webgl-image-fallback object-cover ${className}`}
      />
      <View className="webgl-image-view absolute inset-0">
        <Suspense fallback={null}>
          <ShaderImage hovered={hovered} mouse={mouse} src={src} />
        </Suspense>
      </View>
    </div>
  );
}
