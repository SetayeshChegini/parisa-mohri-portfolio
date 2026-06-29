import * as React from 'react'
import * as THREE from 'three'

const vertexShader = `
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;
void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
uniform sampler2D uDataTexture;
uniform sampler2D uTexture;
uniform vec4 resolution;
uniform float uAssembly;
uniform float uGrid;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec4 offset = texture2D(uDataTexture, vUv);
  vec4 color = texture2D(uTexture, uv - 0.02 * offset.rg);
  vec2 cellUv = fract(vUv * uGrid);
  float gap = (1.0 - uAssembly) * 0.07;
  float tileMask =
    step(gap, cellUv.x) *
    step(gap, cellUv.y) *
    step(gap, 1.0 - cellUv.x) *
    step(gap, 1.0 - cellUv.y);
  color.a *= tileMask;
  gl_FragColor = color;
}
`

export default function GridDistortion({
  mediaType = 'image',
  image = {
    src: 'https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg',
    alt: 'Image',
  },
  video = '',
  grid = 16,
  mouse = 0.12,
  strength = 0.15,
  relaxation = 0.9,
  hoverMultiplier = 1.5,
  background = '#000000',
  dprCap = 2,
  assemble = true,
  className = '',
  style,
}) {
  const wrapRef = React.useRef(null)
  const rendererRef = React.useRef(null)
  const cameraRef = React.useRef(null)
  const planeRef = React.useRef(null)
  const dataTexRef = React.useRef(null)
  const videoElRef = React.useRef(null)
  const uniformsRef = React.useRef(null)
  const imageAspectRef = React.useRef(1)
  const isHoveredRef = React.useRef(false)
  const assemblyRef = React.useRef(assemble)

  React.useEffect(() => {
    assemblyRef.current = assemble
  }, [assemble])

  const mouseState = React.useRef({
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
    vX: 0,
    vY: 0,
  })

  React.useEffect(() => {
    if (!wrapRef.current) return

    const container = wrapRef.current
    const scene = new THREE.Scene()

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, dprCap))
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000)
    camera.position.z = 2
    cameraRef.current = camera

    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector4() },
      uTexture: { value: null },
      uDataTexture: { value: null },
      uAssembly: { value: assemblyRef.current ? 1 : 0 },
      uGrid: { value: Math.max(2, Math.floor(grid)) },
    }
    uniformsRef.current = uniforms

    function handleResize() {
      const width = container.clientWidth || 1
      const height = container.clientHeight || 1
      renderer.setSize(width, height)

      const containerAspect = width / height
      const mediaAspect = imageAspectRef.current
      const scale = Math.max(containerAspect / mediaAspect, 1)

      if (planeRef.current) {
        planeRef.current.scale.set(mediaAspect * scale, scale, 1)
      }

      const frustumH = 1
      const frustumW = frustumH * containerAspect
      camera.left = -frustumW / 2
      camera.right = frustumW / 2
      camera.top = frustumH / 2
      camera.bottom = -frustumH / 2
      camera.updateProjectionMatrix()

      uniforms.resolution.value.set(width, height, 1, 1)
    }

    let videoTexture = null
    let imgTexture = null

    const loadImage = () =>
      new Promise((resolve) => {
        const texLoader = new THREE.TextureLoader()
        texLoader.load(image.src, (tex) => {
          tex.minFilter = THREE.LinearFilter
          tex.magFilter = THREE.LinearFilter
          tex.wrapS = THREE.ClampToEdgeWrapping
          tex.wrapT = THREE.ClampToEdgeWrapping
          const img = tex.image
          imageAspectRef.current = (img.width || 1) / (img.height || 1)
          uniforms.uTexture.value = tex
          imgTexture = tex
          resolve()
        })
      })

    const loadVideo = () =>
      new Promise((resolve) => {
        const v = document.createElement('video')
        v.src = video
        v.loop = true
        v.muted = true
        v.autoplay = true
        v.playsInline = true
        v.crossOrigin = 'anonymous'
        videoElRef.current = v

        const onMeta = () => {
          const vw = v.videoWidth || 16
          const vh = v.videoHeight || 9
          imageAspectRef.current = vw / Math.max(vh, 1)
          handleResize()
        }
        v.addEventListener('loadedmetadata', onMeta, { once: true })

        const tryPlay = () => {
          v.play().catch(() => {
            console.warn('Autoplay blocked, requiring user interaction')
            container.addEventListener('click', () => v.play(), {
              once: true,
            })
          })
        }
        tryPlay()

        videoTexture = new THREE.VideoTexture(v)
        videoTexture.minFilter = THREE.LinearFilter
        videoTexture.magFilter = THREE.LinearFilter
        videoTexture.wrapS = THREE.ClampToEdgeWrapping
        videoTexture.wrapT = THREE.ClampToEdgeWrapping
        videoTexture.needsUpdate = true

        uniforms.uTexture.value = videoTexture
        imageAspectRef.current = 16 / 9
        resolve()
      })

    const loadMedia = async () => {
      if (mediaType === 'video' && video) {
        await loadVideo()
      } else {
        await loadImage()
      }
      handleResize()
    }

    const size = Math.max(2, Math.floor(grid))
    const data = new Float32Array(4 * size * size)
    const scatteredData = new Float32Array(4 * size * size)
    for (let i = 0; i < size * size; i++) {
      scatteredData[i * 4 + 0] = (Math.random() - 0.5) * 12
      scatteredData[i * 4 + 1] = (Math.random() - 0.5) * 12
      data[i * 4 + 0] = assemblyRef.current ? 0 : scatteredData[i * 4 + 0]
      data[i * 4 + 1] = assemblyRef.current ? 0 : scatteredData[i * 4 + 1]
      data[i * 4 + 2] = 0
      data[i * 4 + 3] = 1
    }
    const dataTexture = new THREE.DataTexture(
      data,
      size,
      size,
      THREE.RGBAFormat,
      THREE.FloatType,
    )
    dataTexture.needsUpdate = true
    dataTexRef.current = dataTexture
    uniforms.uDataTexture.value = dataTexture

    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    })
    const geometry = new THREE.PlaneGeometry(1, 1, size - 1, size - 1)
    const plane = new THREE.Mesh(geometry, material)
    scene.add(plane)
    planeRef.current = plane

    const onMouseMove = (event) => {
      const rect = container.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = 1 - (event.clientY - rect.top) / rect.height
      mouseState.current.vX = x - mouseState.current.prevX
      mouseState.current.vY = y - mouseState.current.prevY
      mouseState.current.prevX = x
      mouseState.current.prevY = y
      mouseState.current.x = x
      mouseState.current.y = y
    }
    const onMouseEnter = () => {
      isHoveredRef.current = true
    }
    const onMouseLeave = () => {
      isHoveredRef.current = false
      mouseState.current = {
        x: 0,
        y: 0,
        prevX: 0,
        prevY: 0,
        vX: 0,
        vY: 0,
      }
    }

    container.addEventListener('mousemove', onMouseMove)
    container.addEventListener('mouseenter', onMouseEnter)
    container.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', handleResize)

    loadMedia()

    let raf = 0
    const animate = () => {
      raf = requestAnimationFrame(animate)
      uniforms.time.value += 0.05

      if (videoTexture) {
        videoTexture.needsUpdate = true
      }

      if (assemblyRef.current) {
        uniforms.uAssembly.value += (1 - uniforms.uAssembly.value) * 0.055
      }

      const dt = dataTexture.image.data
      const count = size * size
      if (assemblyRef.current) {
        for (let i = 0; i < count; i++) {
          dt[i * 4 + 0] *= 0.925
          dt[i * 4 + 1] *= 0.925
        }
      }

      if (assemblyRef.current && isHoveredRef.current) {
        const mult = strength * 100 * hoverMultiplier
        const gridMouseX = size * mouseState.current.x
        const gridMouseY = size * mouseState.current.y
        const maxDist = size * mouse

        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            const dx = gridMouseX - i
            const dy = gridMouseY - j
            const distSq = dx * dx + dy * dy
            if (distSq < maxDist * maxDist && distSq > 0.0001) {
              const idx = 4 * (i + size * j)
              const power = Math.min(maxDist / Math.sqrt(distSq), 10)
              dt[idx + 0] += mult * mouseState.current.vX * power
              dt[idx + 1] -= mult * mouseState.current.vY * power
            }
          }
        }
      }

      dataTexture.needsUpdate = true
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('mouseenter', onMouseEnter)
      container.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', handleResize)

      geometry.dispose()
      plane.material.dispose()
      dataTexture.dispose()

      if (imgTexture) imgTexture.dispose()
      if (videoTexture) videoTexture.dispose?.()
      if (videoElRef.current) {
        try {
          videoElRef.current.pause()
          videoElRef.current.removeAttribute('src')
          videoElRef.current.load()
        } catch {
          // The media element may already be detached during teardown.
        }
      }

      renderer.dispose()
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [
    mediaType,
    image.src,
    video,
    grid,
    mouse,
    strength,
    relaxation,
    hoverMultiplier,
    dprCap,
  ])

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        background,
        cursor: 'pointer',
        ...style,
      }}
      role="img"
      aria-label={mediaType === 'image' ? image.alt || 'Grid Distortion' : 'Distorted video'}
    />
  )
}
