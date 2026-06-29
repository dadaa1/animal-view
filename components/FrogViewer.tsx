"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FrogModel } from "./FrogModel";

export type FrogViewerProps = {
  className?: string;
  backgroundColor?: string;
  modelUrl?: string;
  onSelectPart?: (name: string) => void;
};

export function FrogViewer({
  className = "",
  backgroundColor = "#0f172a",
  modelUrl,
  onSelectPart = () => undefined,
}: FrogViewerProps) {
  return (
    <section className={`h-screen w-screen overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 180], fov: 45 }}
        className="h-full w-full"
      >
        <color attach="background" args={[backgroundColor]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />

        <Suspense fallback={null}>
          <FrogModel
            modelUrl={modelUrl}
            onSelectPart={onSelectPart}
          />
        </Suspense>

        <OrbitControls
          enableDamping
          dampingFactor={0.08}
        />
      </Canvas>
    </section>
  );
}
