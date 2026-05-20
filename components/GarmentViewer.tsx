'use client'

import { useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useGLTF, OrbitControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function garmentUrl(garment: string): string {
  if (garment === 'hoodie') return '/models/hoodie.glb'
  if (garment === 'sweatshirt') return '/models/sweatshirt.glb'
  return '/models/tshirt.glb'
}

// Position the graphic decal based on placement selection
function placementPosition(placement: string): [number, number, number] {
  if (placement === 'back')        return [0,    0.12, -0.32]
  if (placement === 'sleeve')      return [0.28, 0.12,  0]
  return [0, 0.12, 0.32] // front-chest (default)
}

function GraphicDecal({
  logoUrl,
  placement,
}: {
  logoUrl: string
  placement: string
}) {
  const texture = useLoader(THREE.TextureLoader, logoUrl)
  const pos = placementPosition(placement)

  // Square aspect — caller can upload any ratio; we constrain to 0.22 wide
  const aspect = texture.image
    ? texture.image.width / texture.image.height
    : 1
  const w = 0.22
  const h = w / aspect

  return (
    <mesh position={pos}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial
        map={texture}
        transparent
        alphaTest={0.05}
        depthWrite={false}
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
      {/* key={url} forces full unmount/remount on garment switch — prevents blank viewer */}
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
