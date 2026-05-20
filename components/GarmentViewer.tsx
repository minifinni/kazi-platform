'use client'

import { useEffect, useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function garmentUrl(garment: string): string {
  if (garment === 'hoodie') return '/models/hoodie.glb'
  if (garment === 'sweatshirt') return '/models/sweatshirt.glb'
  return '/models/tshirt.glb'
}

// Models are centred at origin after Blender recentre.
// After Blender Y-up GLTF export: front of shirt faces +Z (toward camera at Z=2.4).
// Front surface ≈ local Z +0.36. All positions are in group local space (group scale=1.4).
function placementTransform(placement: string): {
  pos: [number, number, number]
  rot: [number, number, number]
  w: number
} {
  if (placement === 'back')   return { pos: [0, 0.06, -0.38], rot: [0, Math.PI, 0],        w: 0.20 }
  if (placement === 'sleeve') return { pos: [0.33, 0.06, 0.08], rot: [0, -Math.PI / 2, 0], w: 0.10 }
  return                             { pos: [0, 0.07, 0.38],    rot: [0, 0, 0],             w: 0.14 }
}

function GraphicDecal({ logoUrl, placement }: { logoUrl: string; placement: string }) {
  const [tex, setTex] = useState<THREE.Texture | null>(null)

  useEffect(() => {
    let cancelled = false
    const loader = new THREE.TextureLoader()
    loader.load(
      logoUrl,
      (loaded) => {
        if (!cancelled) {
          loaded.needsUpdate = true
          setTex(loaded)
        }
      },
      undefined,
      (err) => console.warn('Logo texture failed to load', err),
    )
    return () => {
      cancelled = true
    }
  }, [logoUrl])

  if (!tex) return null

  const { pos, rot, w } = placementTransform(placement)
  const aspect = tex.image?.width && tex.image?.height
    ? tex.image.width / tex.image.height
    : 1
  const h = w / aspect

  return (
    <mesh position={pos} rotation={new THREE.Euler(...rot)} renderOrder={10}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial
        map={tex}
        transparent
        alphaTest={0.04}
        depthWrite={false}
        polygonOffset
        polygonOffsetFactor={-4}
        polygonOffsetUnits={-4}
        side={THREE.FrontSide}
      />
    </mesh>
  )
}

function GarmentMesh({
  url,
  colour,
  logoUrl,
  placement,
}: {
  url: string
  colour: string
  logoUrl?: string
  placement?: string
}) {
  const { scene } = useGLTF(url)
  const cloned = useMemo(() => scene.clone(true), [scene])
  const ref = useRef<THREE.Group>(null)

  useEffect(() => {
    const c = new THREE.Color(colour)
    cloned.traverse((child) => {
      const mesh = child as THREE.Mesh
      if (mesh.isMesh && mesh.material) {
        const mat = (mesh.material as THREE.MeshStandardMaterial).clone()
        mat.color.set(c)
        mat.needsUpdate = true
        mesh.material = mat
      }
    })
  }, [cloned, colour])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.35
  })

  return (
    <group ref={ref} scale={1.4} position={[0, -0.1, 0]}>
      <primitive object={cloned} />
      {logoUrl && placement && (
        <GraphicDecal logoUrl={logoUrl} placement={placement} />
      )}
    </group>
  )
}

export default function GarmentViewer({
  garment,
  colour,
  logoUrl,
  placement,
}: {
  garment: string
  colour: string
  logoUrl?: string
  placement?: string
}) {
  const url = garmentUrl(garment)
  return (
    <Canvas
      camera={{ position: [0, 0.2, 2.4], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 3]} intensity={1.8} />
      <directionalLight position={[-2, 2, -2]} intensity={0.4} />
      <GarmentMesh key={url} url={url} colour={colour} logoUrl={logoUrl} placement={placement} />
      <ContactShadows position={[0, -0.55, 0]} opacity={0.3} blur={2.5} far={1} />
      <OrbitControls
        enablePan={false}
        minDistance={1.4}
        maxDistance={4.5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 1.6}
        autoRotate
        autoRotateSpeed={0.6}
      />
    </Canvas>
  )
}
