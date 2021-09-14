import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'


// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()


// gltf loader

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)


// COLOR PALETTE
const colorPalette = 
{
    color1: `#ccff66`,
    color2: `#ff5faa`,
    color3: `#DF00FF`,
    color4: `#D3D3D3`,
    color5: `#FFE4E1`
}
scene.background = new THREE.Color(colorPalette.color5)

// TExTURE
const textureLoader = new THREE.TextureLoader()
const handPaintedMatcap1 = textureLoader.load(`textures/matcaps/matcap-handpainted1.jpg`)
const handPaintedMatcap2 = textureLoader.load(`textures/matcaps/matcap-handpainted2.jpg`)
const sparkleMatcap = textureLoader.load(`textures/matcaps/matcap-sparkle.png`)
const spaceMatcap = textureLoader.load(`textures/matcaps/matcap-planet.png`)

// MATERIAL
const material1 = new THREE.MeshMatcapMaterial()
material1.matcap = sparkleMatcap
// material1.color = new THREE.Color(colorPalette.color2)

const material4 = new THREE.MeshMatcapMaterial()
material4.matcap = spaceMatcap

const material5 = new THREE.MeshMatcapMaterial()
material5.matcap = handPaintedMatcap1

const material6 = new THREE.MeshMatcapMaterial()
material6.matcap = handPaintedMatcap2


// Text 
const fontLoader = new THREE.FontLoader()
fontLoader.load(
    `fonts/Blue Yellow_Regular.json`,
    function(font)
    {
        const textGeometry = new THREE.TextBufferGeometry(
            `I        U`,
            {
                font: font,
                size: 1.2,
                height: .2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: .03,
                bevelSize: .02,
                bevelOffset: 0,
                bevelSegments: 1
            }
        )

        textGeometry.center()
        const text = new THREE.Mesh(textGeometry, material1)
        text.position.x = .1
        text.position.y = 0.5
        scene.add(text)       
    }
)

fontLoader.load(
    `fonts/Good Unicorn_Regular.json`,
    function(font)
    {
        const textGeometry = new THREE.TextBufferGeometry(
            `Aku Kangen Kamu Za!!!`,
            {
                font: font,
                size: .7,
                height: .4,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: .03,
                bevelSize: .02,
                bevelOffset: 0,
                bevelSegments: 1
            }
        )

        textGeometry.center()
        const text = new THREE.Mesh(textGeometry, material4)
        text.position.x = .1
        text.position.y = -2.2
        scene.add(text)        
    }
)

fontLoader.load(
    `fonts/Blue Yellow_Regular.json`,
    function(font)
    {
        const textGeometry = new THREE.TextBufferGeometry(
            `Selamat Ulang Tahun`,
            {
                font: font,
                size: .7,
                height: .2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: .03,
                bevelSize: .02,
                bevelOffset: 0,
                bevelSegments: 1
            }
        )

        textGeometry.center()
        const text = new THREE.Mesh(textGeometry, material4)
        text.position.x = .1
        text.position.y = -1.2
        scene.add(text)

        
        for (let i = 0; i < 100; i++)
        {
            randomCake()
            randomFlower()
            randomHeart()
        }        
    }
)

let animationMixer = null

gltfLoader.load(
    `/models/inlove/heart.glb`,
    (gltf) => 
    {
        gltf.scene.children[0].material = material1
        
        animationMixer = new THREE.AnimationMixer(gltf.scene)
        const animationAction = animationMixer.clipAction(gltf.animations[0])
        animationAction.play()

        gltf.scene.rotation.y = Math.PI * 0.5
        gltf.scene.scale.set(0.7, 0.7, 0.7)
        gltf.scene.position.y = -0.2
        scene.add(gltf.scene)
    }
)

function randomCake()
{
    gltfLoader.load(
        `/models/inlove/cake.glb`,
        (gltf) => 
        {
            gltf.scene.children[0].material = material4
            gltf.scene.children[0].scale.set(3.5, 3.5, 3.5)
            gltf.scene.position.set(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15
            )

            gltf.scene.rotation.x = Math.random() * Math.PI
            gltf.scene.rotation.y = Math.random() * Math.PI

            const randomScale = Math.random()
            gltf.scene.scale.set(
                randomScale,
                randomScale,
                randomScale
            )

            scene.add(gltf.scene)
        }
    )
}


function randomFlower()
{
    gltfLoader.load(
        `/models/inlove/flower.glb`,
        (gltf) => 
        {
            gltf.scene.children[0].material = material6
            gltf.scene.children[0].scale.set(.5, .5, .5)

            gltf.scene.position.set(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15
            )

            gltf.scene.rotation.x = Math.random() * Math.PI
            gltf.scene.rotation.y = Math.random() * Math.PI

            const randomScale = Math.random()
            gltf.scene.scale.set(
                randomScale,
                randomScale,
                randomScale
            )

            scene.add(gltf.scene)
        }
    )
}


function randomHeart()
{
    gltfLoader.load(
        `/models/inlove/heart.glb`,
        (gltf) => 
        {
            gltf.scene.children[0].material = material4
            gltf.scene.children[0].scale.set(.2, .2, .2)

            gltf.scene.position.set(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15
            )

            gltf.scene.rotation.x = Math.random() * Math.PI
            gltf.scene.rotation.y = Math.random() * Math.PI

            const randomScale = Math.random()
            gltf.scene.scale.set(
                randomScale,
                randomScale,
                randomScale
            )

            scene.add(gltf.scene)
        }
    )
}


// SCREEN
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// CAMERA
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = -6
camera.position.y = -3
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// RENDERER
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// ANIMATe
const clock = new THREE.Clock()
let previousTime = 0

const animate = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    if(animationMixer !== null) animationMixer.update(deltaTime)

    // cam pos + rot
    camera.position.z = Math.sin(0.5 * elapsedTime) + 9

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)


    // Call tick again on the next frame
    window.requestAnimationFrame(animate)
}
animate()

