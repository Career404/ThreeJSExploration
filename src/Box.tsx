/* eslint-disable */
import * as THREE from 'three'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Box(props: JSX.IntrinsicElements['mesh']) {
	const ref = useRef<THREE.Mesh>(null!)
	const [hovered, hover] = useState(false)
	const [clicked, click] = useState(false)

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
