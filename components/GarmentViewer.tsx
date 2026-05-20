'use client'

import { Suspense, useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useGLTF, OrbitControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function garmentUrl(garment: string): string {
  if (garment === 'hoodie') return '/models/hoodie.glb'
  if (garment === 'sweatshirt') return '/models/sweatshirt.glb'
  return '/models/tshirt.glb'
}

// All positions + rotations are in group local space (group has scale=1.4).
// Models are centred at origin after Blender recentre export.
// After Blender Y-up GLTF export:
//   Three.js +Z = front of garment (faces camera)
//   Three.js +Y = up
// Front shirt surface ≈ local Z +0.35; back ≈ local Z -0.35
function placementTransform(placement: string): {
  pos: [number, number, number]
  rot: [number, number, number]
  w: number
} {
  if (placement === 'back')
    return { pos: [0, 0.06, -0.37], rot: [0, Math.PI, 0], w: 0.20 }
  if (placement === 'sleeve')
    return { pos: [0.32, 0.06, 0.08], rot: [0, -Math.PI / 2, 0], w: 0.10 }
  // front-chest
  return { pos: [0, 0.07, 0.37], rot: [0, 0, 0], w: 0.14 }
}

function GraphicDecal({
  logoUrl,
  placement,
}: {
  logoUrl: string
  placement: string
}) {
  const texture = useLoader(THREE.TextureLoader, logoUrl)
  const { pos, rot, w } = placementTransform(placement)

  const aspect =
    texture.image && texture.image.width && texture.image.height
      ? texture.image.width / texture.image.height
      : 1
  const h = w / aspect

  return (
    <mesh
      position={pos}
      rotation={new THREE.Euler(...rot)}
      renderOrder={1}
    >
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial
        map={texture}
        transparent
        alphaTest={0.04}
        depthWrite={false}
        polygonOffset
        polygonOffsetFactor={-2}
        polygonOffsetUnits={-2}
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
        <Suspense fallback={null}>
          <GraphicDecal logoUrl={logoUrl} placement={placement} />
        </Suspense>
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
