"use client";

import { useCallback, useRef, useMemo, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import { Line, Html } from "@react-three/drei";
import type { GLTF } from "three-stdlib";

// ─── Constants ───────────────────────────────────────────────────────
const DEFAULT_MODEL_URL = "/models/frog.glb";
const HIGHLIGHT_COLOR = "#93c5fd";
const LINE_COLOR = "#475569";

// Chinese name mapping for the 9 mesh parts.
// The GLB uses generic names (Object_0 ~ Object_8). Update these
// keys/values to match your actual model's anatomy.
const PART_NAMES: Record<string, string> = {
  Object_0: "整体皮肤",
  Object_1: "消化系统",
  Object_2: "循环系统",
  Object_3: "呼吸系统",
  Object_4: "神经系统",
  Object_5: "骨骼系统",
  Object_6: "肌肉系统",
  Object_7: "排泄系统",
  Object_8: "生殖系统",
};

// ─── Type-safe GLTF shape ────────────────────────────────────────────
type FrogNodes = {
  Spine?: THREE.Mesh;
  Sciatic_Nerve?: THREE.Mesh;
  Heart?: THREE.Mesh;
} & Record<string, THREE.Mesh>;

type FrogMaterials = Record<string, THREE.Material>;

type FrogGLTF = GLTF & {
  nodes: FrogNodes;
  materials: FrogMaterials;
};

// ─── Props ───────────────────────────────────────────────────────────
export type FrogModelProps = Omit<
  ThreeElements["group"],
  "onClick" | "onPointerOver" | "onPointerOut"
> & {
  modelUrl?: string;
  onSelectPart: (name: string) => void;
  labeled?: boolean;
};

// ─── Helpers ─────────────────────────────────────────────────────────
function getColorMaterials(
  material: THREE.Material | THREE.Material[] | undefined,
): (THREE.Material & { color: THREE.Color })[] {
  if (!material) return [];
  const list = Array.isArray(material) ? material : [material];
  return list.filter(
    (m): m is THREE.Material & { color: THREE.Color } =>
      "color" in m && m.color instanceof THREE.Color,
  );
}

// ─── Component ───────────────────────────────────────────────────────
export function FrogModel({
  modelUrl = DEFAULT_MODEL_URL,
  onSelectPart,
  labeled = true,
  ...groupProps
}: FrogModelProps) {
  const gltf = useGLTF(modelUrl) as unknown as FrogGLTF;
  const originalColors = useRef(
    new WeakMap<THREE.Material, THREE.Color>(),
  );
  const groupRef = useRef<THREE.Group>(null);

  const setMeshHighlighted = useCallback(
    (mesh: THREE.Mesh, highlighted: boolean) => {
      getColorMaterials(mesh.material).forEach((mat) => {
        if (highlighted) {
          if (!originalColors.current.has(mat)) {
            originalColors.current.set(mat, mat.color.clone());
          }
          mat.color.set(HIGHLIGHT_COLOR);
        } else {
          const saved = originalColors.current.get(mat);
          if (saved) {
            mat.color.copy(saved);
          }
        }
        mat.needsUpdate = true;
      });
    },
    [],
  );

  // ─── Pointer event handlers ──────────────────────────────────────
  const handlePointerOver: ThreeElements["group"]["onPointerOver"] = (
    event,
  ) => {
    event.stopPropagation();
    setMeshHighlighted(event.object as THREE.Mesh, true);
  };

  const handlePointerOut: ThreeElements["group"]["onPointerOut"] = (
    event,
  ) => {
    setMeshHighlighted(event.object as THREE.Mesh, false);
  };

  const handleClick: ThreeElements["group"]["onClick"] = (event) => {
    event.stopPropagation();
    const mesh = event.object as THREE.Mesh;
    if (mesh.name) {
      onSelectPart(mesh.name);
    }
  };

  // ─── Collect mesh nodes ──────────────────────────────────────────
  const meshNodes: THREE.Mesh[] = useMemo(() => {
    const nodes: THREE.Mesh[] = [];
    gltf.scene.traverse((child: THREE.Object3D) => {
      const obj = child as THREE.Mesh;
      if (obj.isMesh) {
        nodes.push(obj);
      }
    });
    return nodes;
  }, [gltf.scene]);

  // ─── Compute label positions ─────────────────────────────────────
  //
  // All meshes in this GLB share the same vertex data and bounding box,
  // so we can't distinguish them by geometry position. Instead we place
  // labels radially around the model center, distributing them evenly
  // like spokes on a wheel.
  const labelData = useMemo(() => {
    if (meshNodes.length === 0) return [];

    // Compute the model's world-space bounding box
    const bbox = new THREE.Box3();
    meshNodes.forEach((mesh) => {
      // Force bounding box update
      mesh.updateMatrixWorld(true);
      bbox.union(new THREE.Box3().setFromObject(mesh));
    });

    const center = bbox.getCenter(new THREE.Vector3());
    const size = bbox.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const radius = maxDim * 0.65; // label ring radius from center

    const count = meshNodes.length;
    return meshNodes.map((mesh, i) => {
      // Distribute labels evenly around the center in the XZ plane,
      // tilted slightly upward so they don't overlap with the model silhouette
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      const tilt = 0.3; // slight upward tilt in radians

      // Base position on the ring
      const baseX = Math.cos(angle) * radius;
      const baseZ = Math.sin(angle) * radius;
      const baseY = Math.sin(tilt) * radius * 0.3;

      // Anchor point: project from center toward the label position,
      // clamped to the bounding box surface
      const dir = new THREE.Vector3(baseX, baseY, baseZ).normalize();
      const anchor = center.clone().add(dir.multiplyScalar(maxDim * 0.45));

      // Label position: further out along the same direction
      const labelPos = center.clone().add(
        dir.clone().multiplyScalar(radius),
      );

      return {
        name: PART_NAMES[mesh.name] || mesh.name || "未知部位",
        displayName: PART_NAMES[mesh.name] || mesh.name || "未知部位",
        anchor: [anchor.x, anchor.y, anchor.z] as [number, number, number],
        labelPos: [labelPos.x, labelPos.y, labelPos.z] as [number, number, number],
        meshIndex: i,
      };
    });
  }, [meshNodes]);

  // ─── Render ──────────────────────────────────────────────────────
  return (
    <group
      ref={groupRef}
      {...groupProps}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {/* Model meshes */}
      {meshNodes.map((node, i) => (
        <primitive key={i} object={node} />
      ))}

      {/* Labels with leader lines */}
      {labeled && labelData.map((item, i) => (
        <>
          {/* Leader line from model surface to label */}
          <Line
            key={"line-" + i}
            points={[item.anchor, item.labelPos]}
            color={LINE_COLOR}
            lineWidth={1}
          />
          {/* HTML label */}
          <Html
            key={"label-" + i}
            center
            distanceFactor={180}
            position={item.labelPos}
            style={{
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontFamily:
                  "-apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif",
                color: "#e2e8f0",
                background: "rgba(15, 23, 42, 0.9)",
                padding: "3px 8px",
                borderRadius: 4,
                whiteSpace: "nowrap",
                border: "1px solid #334155",
                boxShadow: "0 0 8px rgba(0,0,0,0.4)",
              }}
            >
              {item.displayName}
            </span>
          </Html>
        </>
      ))}
    </group>
  );
}

useGLTF.preload(DEFAULT_MODEL_URL);
