import { useEffect, useRef } from 'react'

const defaults = {
  gridDensity: 130,
  smearStrength: 3.5,
  returnSpeed: 0.1,
  trailLength: 0.55,
  interactionRadius: 110,
}

function ImageSmearCanvas({
  sourceImage,
  className = '',
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
    const pointer = { x: 0, y: 0, lastX: 0, lastY: 0, vx: 0, vy: 0, active: false }

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
      const columns = Math.max(24, Math.round(gridDensity * (bounds.width / 720)))
      const rows = Math.max(18, Math.round(columns * canvas.height / canvas.width))
      const cellWidth = canvas.width / columns
      const cellHeight = canvas.height / rows
      const sourceCellWidth = image.width / columns
      const sourceCellHeight = image.height / rows

      canvas.dataset.imageX = imageX
      canvas.dataset.imageY = imageY
      canvas.dataset.imageWidth = imageWidth
      canvas.dataset.imageHeight = imageHeight
      particles = []

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x = (column + 0.5) * cellWidth
          const y = (row + 0.5) * cellHeight
          particles.push({
            x,
            y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
            sourceX: column * sourceCellWidth,
            sourceY: row * sourceCellHeight,
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

      ctx.globalAlpha = 0.48 + trailLength * 0.18
      for (const particle of particles) {
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

        particle.vx += (particle.originX - particle.x) * returnSpeed
        particle.vy += (particle.originY - particle.y) * returnSpeed
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
            -particle.width * stretch / 2 - 1,
            -particle.height / 2 - 1,
            particle.width * stretch + 2,
            particle.height + 2,
          )
        } else {
          ctx.drawImage(
            image,
            particle.sourceX,
            particle.sourceY,
            particle.sourceWidth,
            particle.sourceHeight,
            particle.x - particle.width / 2 - 1,
            particle.y - particle.height / 2 - 1,
            particle.width + 2,
            particle.height + 2,
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
