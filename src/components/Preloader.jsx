import { useEffect, useState } from 'react'

function Preloader() {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = reduceMotion ? 320 : 1500
    const startTime = performance.now()
    let animationFrame = 0
    let exitTimer = 0
    let removeTimer = 0

    document.body.style.overflow = 'hidden'

    const updateProgress = (now) => {
      const nextProgress = Math.min(100, Math.round(((now - startTime) / duration) * 100))
      setProgress(nextProgress)

      if (nextProgress < 100) {
        animationFrame = requestAnimationFrame(updateProgress)
        return
      }

      exitTimer = window.setTimeout(() => setIsExiting(true), reduceMotion ? 60 : 180)
      removeTimer = window.setTimeout(
        () => {
          setIsVisible(false)
          document.body.style.overflow = previousOverflow
        },
        reduceMotion ? 180 : 700,
      )
    }

    animationFrame = requestAnimationFrame(updateProgress)

    return () => {
      cancelAnimationFrame(animationFrame)
      clearTimeout(exitTimer)
      clearTimeout(removeTimer)
      document.body.style.overflow = previousOverflow
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`preloader${isExiting ? ' preloader--exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-label={`Loading portfolio, ${progress}%`}
    >
      <div className="preloader__content">
        <span className="preloader__label" data-text="LOADING">
          LOADING
        </span>
        <strong className="preloader__progress" data-text={`${progress}%`}>
          {progress}%
        </strong>
      </div>
      <div className="preloader__track" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
    </div>
  )
}

export default Preloader
