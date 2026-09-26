"use client";

import { useProgress, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { Property } from "@/data/properties";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import * as easing from "maath/easing";
import { useEffect, useMemo, useRef, useState } from "react";
import { Mesh, ShaderMaterial, SRGBColorSpace } from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uProximity;

  void main() {
    vUv = uv;
    vec3 transformed = position;
    float edge = pow(abs(uv.x - 0.5) * 2.0, 2.0);
    transformed.z += edge * uProximity * 0.32;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uHover;
  uniform float uDistance;

  void main() {
    float zoom = mix(1.0, 0.9, uHover);
    vec2 uv = 0.5 + (vUv - 0.5) * zoom;
    vec4 color = texture2D(uTexture, uv);
    float fog = smoothstep(2.4, 10.0, uDistance);
    vec3 fogColor = vec3(0.953, 0.937, 0.910);
    gl_FragColor = vec4(mix(color.rgb, fogColor, fog), 1.0 - fog * 0.94);
  }
`;

function GalleryPlane({ property, index }: { property: Property; index: number }) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const texture = useTexture(property.image);
  const x = index % 2 === 0 ? -2.65 : 2.65;
  const z = -index * 4;
  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uHover: { value: 0 },
      uDistance: { value: 10 },
      uProximity: { value: 0 },
    }),
    [texture],
  );

  useEffect(() => {
    texture.colorSpace = SRGBColorSpace;
    return () => texture.dispose();
  }, [texture]);

  useEffect(() => {
    const tween = gsap.to(uniforms.uHover, {
      value: hovered ? 1 : 0,
      duration: 0.6,
      ease: "aurora",
      overwrite: true,
    });
    return () => {
      tween.kill();
    };
  }, [hovered, uniforms]);

  useFrame(({ camera }) => {
    const material = materialRef.current;
    if (!material) return;
    const distance = Math.abs(camera.position.z - z);
    material.uniforms.uDistance.value = distance;
    material.uniforms.uProximity.value = Math.max(0, 1 - distance / 5);
  });

  return (
    <mesh
      ref={meshRef}
      position={[x, index % 3 === 1 ? 0.35 : -0.15, z]}
      rotation={[0, index % 2 === 0 ? 0.08 : -0.08, 0]}
      onClick={() => window.location.assign(`/imoveis/${property.slug}`)}
      onPointerOut={() => setHovered(false)}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
    >
      <planeGeometry args={[3.8, 2.75, 32, 20]} />
      <shaderMaterial
        ref={materialRef}
        depthWrite={false}
        fragmentShader={fragmentShader}
        transparent
        uniforms={uniforms}
        vertexShader={vertexShader}
      />
    </mesh>
  );
}

function TextureProgress() {
  const { progress } = useProgress();
  useEffect(() => {
    if (progress === 100) ScrollTrigger.refresh();
  }, [progress]);
  return null;
}

function GalleryScene({
  properties,
  progressRef,
}: {
  properties: Property[];
  progressRef: React.MutableRefObject<number>;
}) {
  const camera = useThree((state) => state.camera);

  useFrame((_, delta) => {
    const targetZ = 5.5 - progressRef.current * (properties.length * 4 - 1.5);
    easing.damp3(camera.position, [0, 0.2, targetZ], 0.72, delta);
    camera.lookAt(0, 0, camera.position.z - 5);
  });

  return (
    <>
      <TextureProgress />
      {properties.map((property, index) => (
        <GalleryPlane key={property.id} property={property} index={index} />
      ))}
    </>
  );
}

export default function PropertyGalleryCanvas({
  properties,
  progressRef,
  active,
}: {
  properties: Property[];
  progressRef: React.MutableRefObject<number>;
  active: boolean;
}) {
  return (
    <Canvas
      camera={{ fov: 42, position: [0, 0.2, 5.5] }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "demand"}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor("#f3efe8")}
    >
      <GalleryScene properties={properties} progressRef={progressRef} />
    </Canvas>
  );
}
