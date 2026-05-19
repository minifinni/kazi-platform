'use client'

import { useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function garmentUrl(garment: string): string {
  if (garment === 'hoodie') return '/models/hoodie.glb'
  if (garment === 'sweatshirt') return '/models/sweatshirt.glb'
  return '/models/tshirt.glb'
}

function GarmentMesh({ url, colour }: { url: string; colour: string }) {
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

  return <primitive ref={ref} object={cloned} scale={1.4} position={[0, -0.4, 0]} />
}

export default function GarmentViewer({ garment, colour }: { garment: string; colour: string }) {
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
      <GarmentMesh key={url} url={url} colour={colour} />
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
