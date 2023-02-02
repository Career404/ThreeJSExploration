import * as THREE from 'three'

const width = window.innerWidth
const height = window.innerHeight

const renderer = new THREE.WebGLRenderer({
	canvas: document.getElementById('app') as HTMLCanvasElement,
})
renderer.setSize(width, height)

const mainCamera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100)

const scene = new THREE.Scene()

renderer.render(scene, mainCamera)
const center = new THREE.Vector3()
scene.updateMatrixWorld(true)
scene.traverse((object) => {
	if (object.geometry) {
		object.geometry.computeBoundingBox()
		object.geometry.boundingBox.getCenter(center)
	}
})
const cameraDistance = 2
let theta = 0
mainCamera.position.y = center.y + cameraDistance
mainCamera.position.z = center.z + cameraDistance
mainCamera.lookAt(center)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.LineDashedMaterial({
	color: 0x00ff00,
	linewidth: 0.1,
	dashSize: 3,
	gapSize: 1,
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
const geometry2 = new THREE.BoxGeometry(0.5, 0.5, 2)
const material2 = new THREE.LineDashedMaterial({
	color: 0x00f1f0,
	linewidth: 0.1,
	dashSize: 3,
	gapSize: 1,
})
const cube2 = new THREE.Mesh(geometry2, material2)
cube2.position.x = 0
scene.add(cube2)

const cube2target = {
	positiveLimit: 1,
	negativeLimit: -1,
	direction: true,
}
function animate() {
	requestAnimationFrame(animate)
	cube2.rotation.z += 0.01
	cube2.position.x >= cube2target.positiveLimit
		? (cube2target.direction = false)
		: cube2.position.x <= cube2target.negativeLimit
		? (cube2target.direction = true)
		: false

	cube2target.direction
		? (cube2.position.x += 0.01)
		: (cube2.position.x -= 0.01)
	mainCamera.position.x = center.x + cameraDistance * Math.sin(theta)
	mainCamera.position.z = center.z + cameraDistance * Math.cos(theta)
	mainCamera.lookAt(center)
	renderer.render(scene, mainCamera)
	theta += 0.003
	renderer.render(scene, mainCamera)
}
animate()
