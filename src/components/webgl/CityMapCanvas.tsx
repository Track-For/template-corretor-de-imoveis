"use client";

import { neighborhoods } from "@/data/neighborhoods";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  Group,
  InstancedMesh,
  MathUtils,
  Object3D,
  Vector3,
} from "three";

const BUILDING_COUNT = 2000;

function CityBlocks() {
  const meshRef = useRef<InstancedMesh>(null);
  const matrices = useMemo(() => {
    const dummy = new Object3D();
    const values = [];
    for (let index = 0; index < BUILDING_COUNT; index += 1) {
      const column = index % 50;
      const row = Math.floor(index / 50);
      const seed = Math.abs(Math.sin(index * 12.9898) * 43758.5453) % 1;
      const height = 0.12 + seed * 0.9;
      dummy.position.set((column - 24.5) * 0.72, height / 2, (row - 19.5) * 0.72);
      dummy.scale.set(0.46 + seed * 0.12, height, 0.46 + (1 - seed) * 0.12);
      dummy.updateMatrix();
      values.push(dummy.matrix.clone());
    }
    return values;
  }, []);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    matrices.forEach((matrix, index) => mesh.setMatrixAt(index, matrix));
    mesh.instanceMatrix.needsUpdate = true;
  }, [matrices]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, BUILDING_COUNT]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#1f1d1a"
        emissive="#8a5e26"
        emissiveIntensity={0.055}
        metalness={0.08}
        roughness={0.88}
      />
    </instancedMesh>
  );
}

function LightPin({
  index,
  activeIndex,
}: {
  index: number;
  activeIndex: number;
}) {
  const groupRef = useRef<Group>(null);
  const neighborhood = neighborhoods[index];

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;
    const active = activeIndex === index;
    const pulse = 1 + Math.sin(clock.elapsedTime * 2.2 + index) * 0.08;
    const target = active ? 1.65 * pulse : 0.9 * pulse;
    const scale = MathUtils.lerp(group.scale.x, target, 0.08);
    group.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef} position={[neighborhood.x, 0.1, neighborhood.z]}>
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.07, 0.28, 2.8, 16, 1, true]} />
        <meshBasicMaterial
          blending={AdditiveBlending}
          color="#c9954d"
          depthWrite={false}
          opacity={0.72}
          transparent
        />
      </mesh>
      <mesh position={[0, 2.9, 0]}>
        <sphereGeometry args={[0.18, 20, 20]} />
        <meshBasicMaterial color="#f0bd72" toneMapped={false} />
      </mesh>
    </group>
  );
}

function CityScene({ activeIndex }: { activeIndex: number }) {
  const cityRef = useRef<Group>(null);
  const camera = useThree((state) => state.camera);
  const targetRef = useRef(new Vector3(0, 0, 0));

  useGSAP(
    () => {
      const neighborhood = neighborhoods[activeIndex];
      const timeline = gsap.timeline({ defaults: { duration: 1.6, ease: "aurora" } });
      timeline
        .to(
          camera.position,
          { x: neighborhood.x + 6.5, y: 7.5, z: neighborhood.z + 7.5 },
          0,
        )
        .to(
          targetRef.current,
          { x: neighborhood.x, y: 0.4, z: neighborhood.z },
          0,
        );
      return () => timeline.kill();
    },
    { dependencies: [activeIndex] },
  );

  useFrame(({ clock }) => {
    camera.lookAt(targetRef.current);
    if (cityRef.current) cityRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.08) * 0.025;
  });

  return (
    <>
      <color attach="background" args={["#111014"]} />
      <ambientLight intensity={0.55} />
      <directionalLight color="#d9b681" intensity={0.7} position={[10, 14, 6]} />
      <group ref={cityRef}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
          <planeGeometry args={[42, 34]} />
          <meshStandardMaterial color="#111014" roughness={1} />
        </mesh>
        <CityBlocks />
        {neighborhoods.map((neighborhood, index) => (
          <LightPin key={neighborhood.id} activeIndex={activeIndex} index={index} />
        ))}
      </group>
    </>
  );
}

export default function CityMapCanvas({
  activeIndex,
  active,
}: {
  activeIndex: number;
  active: boolean;
}) {
  return (
    <Canvas
      camera={{ fov: 45, position: [13, 14, 17] }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "demand"}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <CityScene activeIndex={activeIndex} />
    </Canvas>
  );
}
