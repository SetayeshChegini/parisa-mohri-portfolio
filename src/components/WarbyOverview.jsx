import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import './WarbyOverview.css'

const sentences = [
  'Warby Parker helped reshape',
  'direct-to-consumer eyewear.',
  'As the category became crowded,',
  'the campaign needed to make',
  'its value visible again.',
]

const meta = [
  ['Project', 'Integrated campaign pitch'],
  ['Focus', 'Brand strategy + art direction'],
  ['Channels', 'OOH, social, retail'],
  ['Campaign', 'Spot the Difference'],
]

function IntelRow({ label, value, delay, reduceMotion }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    if (!inView || reduceMotion) return undefined

    let glitchTimer
    const revealTimer = window.setTimeout(() => {
      setGlitch(true)
      glitchTimer = window.setTimeout(() => setGlitch(false), 400)
    }, delay + 200)

    return () => {
      window.clearTimeout(revealTimer)
      window.clearTimeout(glitchTimer)
    }
  }, [inView, delay, reduceMotion])

  return (
    <div ref={ref} className="wb-intel-row">
      <motion.div
        className="wb-redact"
        initial={reduceMotion ? false : { scaleX: 1 }}
        animate={inView ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 0.65,
          delay: reduceMotion ? 0 : delay / 1000,
          ease: [0.77, 0, 0.18, 1],
        }}
      />
      <dt className="wb-intel-dt">{label}</dt>
      <dd className={`wb-intel-dd${glitch ? ' is-glitching' : ''}`}>{value}</dd>
    </div>
  )
}

export default function WarbyOverview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduceMotion = useReducedMotion()

  return (
    <section className="wb-overview" ref={ref} aria-labelledby="warby-overview-title">
      <motion.div
        className="wb-status-bar"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.1 }}
      >
        <div className="wb-status-tag">
          <span className="wb-status-dot" aria-hidden="true" />
          Overview / Section 01
        </div>
        <span className="wb-status-right">Warby Parker - The Pitch</span>
      </motion.div>

      <div className="wb-grid">
        <div className="wb-editorial">
          <motion.p
            className="wb-editorial-label"
            id="warby-overview-title"
            initial={reduceMotion ? false : { opacity: 0, y: 4 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.3 }}
          >
            Campaign context
          </motion.p>
          <div className="wb-lines" aria-label="Campaign overview">
            {sentences.map((sentence, index) => (
              <div className="wb-line" key={sentence}>
                <motion.span
                  className="wb-line-inner"
                  initial={reduceMotion ? false : { y: '100%' }}
                  animate={inView ? { y: '0%' } : {}}
                  transition={{
                    duration: reduceMotion ? 0 : 0.7,
                    delay: reduceMotion ? 0 : 0.5 + index * 0.11,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {sentence}
                </motion.span>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="wb-divider"
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.6 }}
        />

        <dl className="wb-intel">
          {meta.map(([label, value], index) => (
            <IntelRow
              key={label}
              label={label}
              value={value}
              delay={inView ? 900 + index * 180 : 0}
              reduceMotion={reduceMotion}
            />
          ))}
        </dl>
      </div>

      <motion.div
        className="wb-bottom-bar"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 1.7 }}
      >
        <motion.div
          className="wb-bottom-line"
          initial={reduceMotion ? false : { scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{
            duration: reduceMotion ? 0 : 1,
            delay: reduceMotion ? 0 : 1.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
        <span className="wb-bottom-text">End of brief</span>
      </motion.div>
    </section>
  )
}
