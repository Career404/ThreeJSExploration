import { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls, Grid } from '@react-three/drei'
import Box from './Box'
import './App.css'

export default function App() {
	const [camera, setCamera] = useState(true)
	const [linkHover, setLinkHover] = useState(false)

	const cameraControlRef = useRef<CameraControls | null>(null)
	return (
		<>
			<div className="controls">
				<label htmlFor="cameraCheckbox">
					Camera controls: {camera ? 'on' : 'off'}
					<input
						type="checkbox"
						name="camera"
						id="cameraCheckbox"
						checked={camera}
						onChange={() => {
							setCamera(!camera)
						}}
					/>
				</label>
			</div>
			<Canvas>
				<Grid infiniteGrid />
				{camera ? <CameraControls ref={cameraControlRef} /> : null}

				<ambientLight intensity={0.1} />
				<spotLight position={[10, 10, 10]} angle={0.08} penumbra={0.5} />
				<pointLight position={[-10, -10, -10]} />

				<Box position={[-1, 0, 0]} />
				<mesh
					onClick={(e) => {
						e.stopPropagation()
						cameraControlRef.current?.rotate(Math.PI / 4, 0, true)
					}}
					onPointerOver={() => setLinkHover(true)}
					onPointerOut={() => setLinkHover(false)}
				>
					<boxBufferGeometry attach="geometry" args={[1, 0.5, 0.5]} />
					<meshStandardMaterial
						attach="material"
						color={!linkHover ? 'salmon' : 'red'}
						wireframe={linkHover}
					/>
				</mesh>
				<Box position={[1, 0, 0]} />
			</Canvas>
		</>
	)
}
