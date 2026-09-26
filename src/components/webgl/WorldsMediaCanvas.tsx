"use client";

import { useTexture } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { gsap } from "@/lib/gsap";
import { useEffect, useMemo, useRef } from "react";
import {
  DataTexture,
  FloatType,
  Mesh,
  RedFormat,
  ShaderMaterial,
  SRGBColorSpace,
  Texture,
  Vector2,
} from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uFrom;
  uniform sampler2D uTo;
  uniform sampler2D uNoise;
  uniform vec2 uFromSize;
  uniform vec2 uToSize;
  uniform vec2 uPlaneSize;
  uniform float uProgress;

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
    float noise = texture2D(uNoise, vUv * 1.35).r - 0.5;
    float arc = sin(uProgress * 3.14159265);
    vec2 fromUv = coverUv(vUv, uFromSize, uPlaneSize);
    vec2 toUv = coverUv(vUv, uToSize, uPlaneSize);
    vec2 drift = vec2(noise * 0.17 * arc, noise * 0.1 * arc);
    vec4 fromColor = texture2D(uFrom, fromUv + drift * uProgress);
    vec4 toColor = texture2D(uTo, toUv - drift * (1.0 - uProgress));
    float dissolve = smoothstep(-0.22, 0.22, uProgress - 0.5 + noise * 0.34);
    gl_FragColor = mix(fromColor, toColor, dissolve);
  }
`;

function createNoiseTexture() {
  const size = 64;
  const data = new Float32Array(size * size);
  for (let index = 0; index < data.length; index += 1) {
    const x = index % size;
    const y = Math.floor(index / size);
    data[index] = (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
    data[index] = Math.abs(data[index]);
  }
  const texture = new DataTexture(data, size, size, RedFormat, FloatType);
  texture.needsUpdate = true;
  return texture;
}

function imageSize(texture: Texture) {
  const image = texture.image as { width?: number; height?: number } | undefined;
  return new Vector2(image?.width ?? 1, image?.height ?? 1);
}

function DisplacementPlane({ images, activeIndex }: { images: string[]; activeIndex: number }) {
  const textures = useTexture(images);
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const previousIndex = useRef(activeIndex);
  const viewport = useThree((state) => state.viewport);
  const noiseTexture = useMemo(() => createNoiseTexture(), []);
  const uniforms = useMemo(
    () => ({
      uFrom: { value: textures[activeIndex] },
      uTo: { value: textures[activeIndex] },
      uNoise: { value: noiseTexture },
      uFromSize: { value: imageSize(textures[activeIndex]) },
      uToSize: { value: imageSize(textures[activeIndex]) },
      uPlaneSize: { value: new Vector2(viewport.width, viewport.height) },
      uProgress: { value: 1 },
    }),
    [activeIndex, noiseTexture, textures, viewport.height, viewport.width],
  );

  useEffect(() => {
    textures.forEach((texture) => {
      texture.colorSpace = SRGBColorSpace;
    });
    return () => {
      textures.forEach((texture) => texture.dispose());
      noiseTexture.dispose();
    };
  }, [noiseTexture, textures]);

  useEffect(() => {
    const fromIndex = previousIndex.current;
    const material = materialRef.current;
    if (!material || fromIndex === activeIndex) return;

    material.uniforms.uFrom.value = textures[fromIndex];
    material.uniforms.uTo.value = textures[activeIndex];
    material.uniforms.uFromSize.value.copy(imageSize(textures[fromIndex]));
    material.uniforms.uToSize.value.copy(imageSize(textures[activeIndex]));
    material.uniforms.uProgress.value = 0;
    previousIndex.current = activeIndex;

    const tween = gsap.to(material.uniforms.uProgress, {
      value: 1,
      duration: 1.2,
      ease: "aurora",
    });
    return () => {
      tween.kill();
    };
  }, [activeIndex, textures]);

  useEffect(() => {
    uniforms.uPlaneSize.value.set(viewport.width, viewport.height);
  }, [uniforms, viewport.height, viewport.width]);

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        vertexShader={vertexShader}
      />
    </mesh>
  );
}

export default function WorldsMediaCanvas({
  images,
  activeIndex,
}: {
  images: string[];
  activeIndex: number;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <DisplacementPlane activeIndex={activeIndex} images={images} />
    </Canvas>
  );
}
