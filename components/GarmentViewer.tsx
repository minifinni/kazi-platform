'use client'

import { useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, ContactShadows } from '@react-three/drei'
import { DecalGeometry } from 'three-stdlib'
import * as THREE from 'three'

function garmentUrl(garment: string): string {
  if (garment === 'hoodie') return '/models/hoodie.glb'
  if (garment === 'sweatshirt') return '/models/sweatshirt.glb'
  return '/models/tshirt.glb'
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
  const decalRef = useRef<THREE.Mesh | null>(null)
  const pendingTex = useRef<THREE.Texture | null>(null)

  // Apply colour to all garment meshes
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

  // Load logo texture — on success, signal useFrame to bake the decal
  useEffect(() => {
    // Remove any existing decal
    if (decalRef.current) {
      decalRef.current.parent?.remove(decalRef.current)
      decalRef.current.geometry.dispose()
      decalRef.current = null
    }
    pendingTex.current = null
    if (!logoUrl) return

    const loader = new THREE.TextureLoader()
    loader.load(
      logoUrl,
      (tex) => { tex.needsUpdate = true; pendingTex.current = tex },
      undefined,
      (err) => console.warn('logo load failed', err),
    )
  }, [logoUrl])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const rotY = Math.sin(clock.elapsedTime * 0.25) * 0.35
    ref.current.rotation.y = rotY

    // Bake DecalGeometry onto the shirt surface on the first frame after texture loads
    if (!pendingTex.current) return
    const tex = pendingTex.current
    pendingTex.current = null

    // Find the first Mesh inside the cloned scene
    let target: THREE.Mesh | null = null
    ref.current.traverse((o) => {
      const m = o as THREE.Mesh
      if (m.isMesh && !target) target = m
    })
    if (!target) return

    // Temporarily zero rotation so the bounding box is axis-aligned (front = +Z)
    ref.current.rotation.y = 0
    ref.current.updateWorldMatrix(true, true)

    const box = new THREE.Box3().setFromObject(ref.current)
    const shirtWidth = box.max.x - box.min.x
    const logoSize = shirtWidth * 0.24
    const projDepth = (box.max.z - box.min.z) * 2 + 0.5  // generous depth so rays pierce mesh

    // World-space position of the front-chest area
    const midY = (box.min.y + box.max.y) / 2
    const chestY = midY + (box.max.y - midY) * 0.25

    let wPos: THREE.Vector3
    let wRot: THREE.Euler
    if (placement === 'back') {
      wPos = new THREE.Vector3(0, chestY, box.min.z - 0.01)
      wRot = new THREE.Euler(0, Math.PI, 0)
    } else if (placement === 'sleeve') {
      wPos = new THREE.Vector3(box.max.x * 0.8, chestY, (box.min.z + box.max.z) / 2)
      wRot = new THREE.Euler(0, -Math.PI / 2, 0)
    } else {
      wPos = new THREE.Vector3(0, chestY, box.max.z + 0.01)
      wRot = new THREE.Euler(0, 0, 0)
    }

    const size = new THREE.Vector3(logoSize, logoSize, projDepth)

    // Build decal geometry — vertices come out in world space
    const decalGeo = new DecalGeometry(target, wPos, wRot, size)

    // Convert to target mesh local space so it rotates with the shirt
    const invWorld = (target as THREE.Mesh).matrixWorld.clone().invert()
    decalGeo.applyMatrix4(invWorld)

    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      alphaTest: 0.04,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -4,
      polygonOffsetUnits: -4,
    })

    const decalMesh = new THREE.Mesh(decalGeo, mat)
    decalMesh.renderOrder = 10
    ;(target as THREE.Mesh).add(decalMesh)
    decalRef.current = decalMesh

    // Restore rotation
    ref.current.rotation.y = rotY
    ref.current.updateWorldMatrix(true, true)
  })

  return (
    <group ref={ref} scale={1.4} position={[0, -0.1, 0]}>
      <primitive object={cloned} />
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
