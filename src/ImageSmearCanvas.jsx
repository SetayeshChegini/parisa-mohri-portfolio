import { useEffect, useRef } from 'react'

const defaults = {
  gridDensity: 30,
  smearStrength: 1.5,
  returnSpeed: 0.07,
  trailLength: 0.8,
  interactionRadius: 120,
}

function ImageSmearCanvas({
  sourceImage,
  className = '',
  scrollAssembly = 1,
  gridDensity = defaults.gridDensity,
  smearStrength = defaults.smearStrength,
  returnSpeed = defaults.returnSpeed,
  trailLength = defaults.trailLength,
  interactionRadius = defaults.interactionRadius,
}) {
  const canvasRef = useRef(null)
  const assemblyRef = useRef(scrollAssembly)

  useEffect(() => {
    assemblyRef.current = scrollAssembly
  }, [scrollAssembly])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return undefined

    let frameId
    let image
    let particles = []
    let isVisible = false
    let renderedAssembly = assemblyRef.current
    const pointer = {
      x: 0,
      y: 0,
      lastX: 0,
      lastY: 0,
      vx: 0,
      vy: 0,
      active: false,
      lastActiveTime: 0,
    }

    const buildParticles = () => {
      if (!image) return
      const bounds = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(bounds.width * dpr))
      canvas.height = Math.max(1, Math.round(bounds.height * dpr))

      const scale = Math.max(canvas.width / image.width, canvas.height / image.height)
      const imageWidth = image.width * scale
      const imageHeight = image.height * scale
      const imageX = (canvas.width - imageWidth) / 2
      const imageY = (canvas.height - imageHeight) / 2
      const columns = Math.max(16, Math.round(gridDensity))
      const rows = Math.max(12, Math.round(columns * canvas.height / canvas.width))
      const cellWidth = canvas.width / columns
      const cellHeight = canvas.height / rows
      const sourceCellWidth = cellWidth / scale
      const sourceCellHeight = cellHeight / scale

      canvas.dataset.imageX = imageX
      canvas.dataset.imageY = imageY
      canvas.dataset.imageWidth = imageWidth
      canvas.dataset.imageHeight = imageHeight
      particles = []

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x = (column + 0.5) * cellWidth
          const y = (row + 0.5) * cellHeight
          const sourceX = (column * cellWidth - imageX) / scale
          const sourceY = (row * cellHeight - imageY) / scale
          const angle = Math.atan2(y - canvas.height / 2, x - canvas.width / 2)
          const variation = ((row * 17 + column * 29) % 11) / 10
          const distance = (24 + variation * 38) * dpr
          const disperseX = Math.cos(angle + variation * 0.45) * distance
          const disperseY = Math.sin(angle - variation * 0.35) * distance
          const assembly = assemblyRef.current
          particles.push({
            x: x + disperseX * (1 - assembly),
            y: y + disperseY * (1 - assembly),
            originX: x,
            originY: y,
            disperseX,
            disperseY,
            vx: 0,
            vy: 0,
            sourceX,
            sourceY,
            sourceWidth: sourceCellWidth,
            sourceHeight: sourceCellHeight,
            width: cellWidth,
            height: cellHeight,
          })
        }
      }
    }

    const getPointer = (event) => {
      const bounds = canvas.getBoundingClientRect()
      return {
        x: (event.clientX - bounds.left) * (canvas.width / bounds.width),
        y: (event.clientY - bounds.top) * (canvas.height / bounds.height),
      }
    }

    const handlePointerEnter = (event) => {
      const next = getPointer(event)
      Object.assign(pointer, next, { lastX: next.x, lastY: next.y, active: true })
      pointer.lastActiveTime = Date.now()
    }

    const handlePointerMove = (event) => {
      const next = getPointer(event)
      pointer.x = next.x
      pointer.y = next.y
      pointer.active = true
      pointer.lastActiveTime = Date.now()
    }

    const handlePointerLeave = () => {
      pointer.active = false
      pointer.lastActiveTime = Date.now()
    }

    const animate = () => {
      if (!image) {
        frameId = requestAnimationFrame(animate)
        return
      }

      if (!isVisible) {
        frameId = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalAlpha = 1
      ctx.drawImage(
        image,
        Number(canvas.dataset.imageX),
        Number(canvas.dataset.imageY),
        Number(canvas.dataset.imageWidth),
        Number(canvas.dataset.imageHeight),
      )

      pointer.vx = pointer.vx * 0.72 + (pointer.x - pointer.lastX) * 0.28
      pointer.vy = pointer.vy * 0.72 + (pointer.y - pointer.lastY) * 0.28
      const radius = interactionRadius * (canvas.width / canvas.getBoundingClientRect().width)

      renderedAssembly += (assemblyRef.current - renderedAssembly) * 0.12
      let particlesMoving = false

      for (const particle of particles) {
        const targetX = particle.originX + particle.disperseX * (1 - renderedAssembly)
        const targetY = particle.originY + particle.disperseY * (1 - renderedAssembly)

        if (pointer.active) {
          const dx = particle.x - pointer.x
          const dy = particle.y - pointer.y
          const distance = Math.hypot(dx, dy)
          if (distance < radius) {
            const force = 1 - distance / radius
            particle.vx += pointer.vx * smearStrength * force * 0.055
            particle.vy += pointer.vy * smearStrength * force * 0.055
            const push = force * smearStrength * 0.09
            particle.vx += (dx / Math.max(distance, 1)) * push
            particle.vy += (dy / Math.max(distance, 1)) * push
          }
        }

        particle.vx += (targetX - particle.x) * returnSpeed
        particle.vy += (targetY - particle.y) * returnSpeed
        particle.vx *= 0.78
        particle.vy *= 0.78

        const speed = Math.hypot(particle.vx, particle.vy)
        const velocityLimit = Math.max(particle.width, particle.height) * 0.72
        if (speed > velocityLimit) {
          particle.vx = (particle.vx / speed) * velocityLimit
          particle.vy = (particle.vy / speed) * velocityLimit
        }

        particle.x += particle.vx
        particle.y += particle.vy
        if (
          Math.abs(particle.vx) > 0.05 ||
          Math.abs(particle.vy) > 0.05 ||
          Math.abs(targetX - particle.x) > 0.2 ||
          Math.abs(targetY - particle.y) > 0.2
        ) {
          particlesMoving = true
        }
      }

      const shouldShowGridEffect =
        pointer.active ||
        Date.now() - pointer.lastActiveTime < 900 ||
        renderedAssembly < 0.998 ||
        particlesMoving

      if (!shouldShowGridEffect) {
        pointer.lastX = pointer.x
        pointer.lastY = pointer.y
        frameId = requestAnimationFrame(animate)
        return
      }

      const overlap = 2
      ctx.globalAlpha = Math.min(0.75, 0.5 + trailLength * 0.3125)
      for (const particle of particles) {
        const speed = Math.hypot(particle.vx, particle.vy)
        ctx.save()
        if (speed > 0.65) {
          ctx.translate(particle.x, particle.y)
          ctx.rotate(Math.atan2(particle.vy, particle.vx))
          const stretch = Math.min(2.1, 1 + speed * 0.035 * smearStrength)
          ctx.drawImage(
            image,
            particle.sourceX,
            particle.sourceY,
            particle.sourceWidth,
            particle.sourceHeight,
            Math.round(-particle.width * stretch / 2 - overlap / 2),
            Math.round(-particle.height / 2 - overlap / 2),
            Math.ceil(particle.width * stretch + overlap),
            Math.ceil(particle.height + overlap),
          )
        } else {
          ctx.drawImage(
            image,
            particle.sourceX,
            particle.sourceY,
            particle.sourceWidth,
            particle.sourceHeight,
            Math.round(particle.x - particle.width / 2 - overlap / 2),
            Math.round(particle.y - particle.height / 2 - overlap / 2),
            Math.ceil(particle.width + overlap),
            Math.ceil(particle.height + overlap),
          )
        }
        ctx.restore()
      }
      ctx.globalAlpha = 1

      pointer.lastX = pointer.x
      pointer.lastY = pointer.y
      frameId = requestAnimationFrame(animate)
    }

    const observer = new ResizeObserver(buildParticles)
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { rootMargin: '180px 0px' },
    )
    image = new Image()
    image.onload = () => {
      buildParticles()
      observer.observe(canvas)
    }
    image.src = sourceImage
    visibilityObserver.observe(canvas)
    canvas.addEventListener('pointerenter', handlePointerEnter)
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerleave', handlePointerLeave)
    frameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
      visibilityObserver.disconnect()
      canvas.removeEventListener('pointerenter', handlePointerEnter)
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [gridDensity, interactionRadius, returnSpeed, smearStrength, sourceImage, trailLength])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}

export default ImageSmearCanvas
