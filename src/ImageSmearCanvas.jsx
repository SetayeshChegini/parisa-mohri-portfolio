import { useEffect, useRef } from 'react'

const defaults = {
  gridDensity: 18,
  smearStrength: 0.6,
  returnSpeed: 0.06,
  trailLength: 0.88,
  interactionRadius: 140,
}

function ImageSmearCanvas({
  sourceImage,
  className = '',
  imageFit = 'cover',
  gridDensity = defaults.gridDensity,
  smearStrength = defaults.smearStrength,
  returnSpeed = defaults.returnSpeed,
  trailLength = defaults.trailLength,
  interactionRadius = defaults.interactionRadius,
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return undefined

    let frameId
    let image
    let particles = []
    let isVisible = false
    let effectAlpha = 0
    const pointer = {
      x: 0,
      y: 0,
      lastX: 0,
      lastY: 0,
      vx: 0,
      vy: 0,
      active: false,
    }

    const buildParticles = () => {
      if (!image) return
      const bounds = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 3)
      canvas.width = Math.max(1, Math.round(bounds.width * dpr))
      canvas.height = Math.max(1, Math.round(bounds.height * dpr))
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'

      const scaleMethod = imageFit === 'contain' ? Math.min : Math.max
      const scale = scaleMethod(canvas.width / image.width, canvas.height / image.height)
      const imageWidth = image.width * scale
      const imageHeight = image.height * scale
      const imageX = (canvas.width - imageWidth) / 2
      const imageY = (canvas.height - imageHeight) / 2
      const columns = Math.max(16, Math.round(gridDensity))
      const rows = Math.max(12, Math.round(columns * imageHeight / imageWidth))
      const cellWidth = imageWidth / columns
      const cellHeight = imageHeight / rows
      const sourceCellWidth = image.width / columns
      const sourceCellHeight = image.height / rows

      canvas.dataset.imageX = imageX
      canvas.dataset.imageY = imageY
      canvas.dataset.imageWidth = imageWidth
      canvas.dataset.imageHeight = imageHeight
      particles = []

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x = imageX + (column + 0.5) * cellWidth
          const y = imageY + (row + 0.5) * cellHeight
          const sourceX = column * sourceCellWidth
          const sourceY = row * sourceCellHeight
          particles.push({
            x,
            y,
            originX: x,
            originY: y,
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
    }

    const handlePointerMove = (event) => {
      const next = getPointer(event)
      pointer.x = next.x
      pointer.y = next.y
      pointer.active = true
    }

    const handlePointerLeave = () => {
      pointer.active = false
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
      if (imageFit === 'contain') {
        const backdropScale = Math.max(canvas.width / image.width, canvas.height / image.height)
        const backdropWidth = image.width * backdropScale
        const backdropHeight = image.height * backdropScale
        ctx.save()
        ctx.globalAlpha = 0.22
        ctx.filter = `blur(${18 * Math.min(window.devicePixelRatio || 1, 3)}px) brightness(0.58)`
        ctx.drawImage(
          image,
          (canvas.width - backdropWidth) / 2,
          (canvas.height - backdropHeight) / 2,
          backdropWidth,
          backdropHeight,
        )
        ctx.restore()
      }
      ctx.drawImage(
        image,
        Number(canvas.dataset.imageX),
        Number(canvas.dataset.imageY),
        Number(canvas.dataset.imageWidth),
        Number(canvas.dataset.imageHeight),
      )

      pointer.vx = pointer.vx * 0.9 + (pointer.x - pointer.lastX) * 0.1
      pointer.vy = pointer.vy * 0.9 + (pointer.y - pointer.lastY) * 0.1
      const radius = interactionRadius * (canvas.width / canvas.getBoundingClientRect().width)

      let particlesMoving = false

      for (const particle of particles) {
        if (pointer.active) {
          const dx = particle.x - pointer.x
          const dy = particle.y - pointer.y
          const distance = Math.hypot(dx, dy)
          if (distance < radius) {
            const force = 1 - distance / radius
            particle.vx += pointer.vx * smearStrength * force * 0.025
            particle.vy += pointer.vy * smearStrength * force * 0.025
            const push = force * smearStrength * 0.03
            particle.vx += (dx / Math.max(distance, 1)) * push
            particle.vy += (dy / Math.max(distance, 1)) * push
          }
        }

        particle.vx += (particle.originX - particle.x) * returnSpeed
        particle.vy += (particle.originY - particle.y) * returnSpeed
        particle.vx *= 0.88
        particle.vy *= 0.88

        const speed = Math.hypot(particle.vx, particle.vy)
        const velocityLimit = Math.max(particle.width, particle.height) * 0.2
        if (speed > velocityLimit) {
          particle.vx = (particle.vx / speed) * velocityLimit
          particle.vy = (particle.vy / speed) * velocityLimit
        }

        particle.x += particle.vx
        particle.y += particle.vy
        if (
          Math.abs(particle.vx) > 0.05 ||
          Math.abs(particle.vy) > 0.05 ||
          Math.abs(particle.originX - particle.x) > 0.2 ||
          Math.abs(particle.originY - particle.y) > 0.2
        ) {
          particlesMoving = true
        }
      }

      const shouldShowGridEffect = pointer.active || particlesMoving
      const targetAlpha = shouldShowGridEffect ? Math.min(0.36, 0.12 + trailLength * 0.26) : 0
      effectAlpha += (targetAlpha - effectAlpha) * (shouldShowGridEffect ? 0.12 : 0.07)

      if (!shouldShowGridEffect && effectAlpha < 0.01) {
        effectAlpha = 0
        pointer.lastX = pointer.x
        pointer.lastY = pointer.y
        frameId = requestAnimationFrame(animate)
        return
      }

      const overlap = 2
      ctx.globalAlpha = effectAlpha
      for (const particle of particles) {
        const speed = Math.hypot(particle.vx, particle.vy)
        ctx.save()
        if (speed > 0.65) {
          ctx.translate(particle.x, particle.y)
          ctx.rotate(Math.atan2(particle.vy, particle.vx))
          const stretch = 1 + Math.min(speed * 0.006 * smearStrength, 0.12)
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
  }, [gridDensity, imageFit, interactionRadius, returnSpeed, smearStrength, sourceImage, trailLength])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}

export default ImageSmearCanvas
