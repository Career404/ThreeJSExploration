import * as THREE from 'three'
import gsap from 'gsap'

const width = window.innerWidth
const height = window.innerHeight

const renderer = new THREE.WebGLRenderer({
	canvas: document.getElementById('app') as HTMLCanvasElement,
	antialias: true,
})
renderer.setSize(width, height)
renderer.shadowMap.enabled = true

const mainCamera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x010105)

renderer.render(scene, mainCamera)
const center = new THREE.Vector3()
scene.updateMatrixWorld(true)

const cameraDistance = 2
let theta = 0
mainCamera.position.y = center.y + cameraDistance
mainCamera.position.z = center.z + cameraDistance
mainCamera.lookAt(center)

const ground = new THREE.Mesh(
	new THREE.PlaneGeometry(10, 10),
	new THREE.MeshPhongMaterial({
		color: 'darkgreen',
	})
)
ground.position.set(0, -0.5, 0)
ground.rotateX(-Math.PI / 2)
ground.receiveShadow = true

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshPhongMaterial({
	color: 0x506000,
})
const cube = new THREE.Mesh(geometry, material)
let cubeBB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
cubeBB.setFromObject(cube)

const geometry2 = new THREE.BoxGeometry(0.5, 0.5, 2)
const material2 = new THREE.MeshPhongMaterial({
	color: 0x808080,
})
const cube2 = new THREE.Mesh(geometry2, material2)
cube2.position.x = 0
let cube2BB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3())
cube2BB.setFromObject(cube2)

const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.1)
const light = new THREE.DirectionalLight(0xffff99, 1.5)
light.position.set(1, 5, 0.2)

scene.add(cube, cube2, ground, light, ambient)
const cube2target = {
	positiveLimit: 1,
	negativeLimit: -1,
	direction: true,
	colorIntersects: new THREE.Color(0.4, 0.5, 0.3),
	colorNotIntersects: new THREE.Color(0.1, 0.1, 0.2),
}
function animate() {
	cube2.rotation.z += 0.01
	cube2.position.x >= cube2target.positiveLimit
		? (cube2target.direction = false)
		: cube2.position.x <= cube2target.negativeLimit
		? (cube2target.direction = true)
		: false

	cube2target.direction
		? (cube2.position.x += 0.002)
		: (cube2.position.x -= 0.002)
	mainCamera.position.x = center.x + cameraDistance * Math.sin(theta)
	mainCamera.position.z = center.z + cameraDistance * Math.cos(theta)
	mainCamera.lookAt(center)
	theta += 0.003

	cube2BB.copy(cube2.geometry.boundingBox).applyMatrix4(cube2.matrixWorld)

	checkCollisions()
	renderer.render(scene, mainCamera)
	requestAnimationFrame(animate)
}
function checkCollisions() {
	if (cube2BB.intersectsBox(cubeBB)) {
		gsap.to(cube2.material.color, {
			duration: 3,
			r: cube2target.colorIntersects.r,
			g: cube2target.colorIntersects.g,
			b: cube2target.colorIntersects.b,
		})
	} else
		gsap.to(cube2.material.color, {
			duration: 3,
			r: cube2target.colorNotIntersects.r,
			g: cube2target.colorNotIntersects.g,
			b: cube2target.colorNotIntersects.b,
		})
}
animate()
