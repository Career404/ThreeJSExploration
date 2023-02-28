/* eslint-disable */
import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'

function Box(props: JSX.IntrinsicElements['mesh']) {
	const ref = useRef<THREE.Mesh>(null!)
	const [hovered, hover] = useState(false)
	const [clicked, click] = useState(false)
	// Rotate mesh every frame, this is outside of React without overhead
	useFrame((state, delta) => (ref.current.rotation.x += delta))

	return (
		<mesh
			{...props}
			ref={ref}
			scale={clicked ? 1.5 : 1}
			onClick={(event) => {
				event.stopPropagation()
				click(!clicked)
			}}
			onPointerOver={(event) => {
				event.stopPropagation()
				hover(true)
			}}
			onPointerOut={(event) => {
				event.stopPropagation()
				hover(false)
			}}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
		</mesh>
	)
}

export default function App() {
	return (
		<Canvas>
			<CameraControls />
			<ambientLight intensity={0.01} />
			<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
			<pointLight position={[-10, -10, -10]} />
			<Box position={[-1.2, 0, 0]} />
			<Box position={[1.2, 0, 0]} />
		</Canvas>
	)
}
