import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import './WarbyBrandFoundation.css'

const assetPath = (filename) =>
  `${import.meta.env.BASE_URL}projects/warby-parker/${filename}`

const brandValues = [
  {
    num: '01',
    title: 'Style & quality',
    text: 'Designer-minded frames made to feel considered and current.',
    img: 'portrait-1.webp',
    alt: 'Person wearing tortoise round frames',
    parallax: -18,
  },
  {
    num: '02',
    title: 'Accessible pricing',
    text: 'Premium materials without the traditional luxury markup.',
    img: 'portrait-2.webp',
    alt: 'Person wearing green rectangular frames',
    parallax: -8,
  },
  {
    num: '03',
    title: 'Transparency & trust',
    text: 'A simple value story customers can understand quickly.',
    img: 'portrait-3.webp',
    alt: 'Person wearing bold black frames',
    parallax: -26,
  },
  {
    num: '04',
    title: 'Social responsibility',
    text: 'A purchase model connected to broader community impact.',
    img: 'portrait-4.webp',
    alt: 'Person wearing amber frames',
    parallax: -12,
  },
]

const competitors = [
  {
    tier: 'Luxury',
    names: 'Ray-Ban, Oakley',
    detail: 'High prices, strong brand recognition, premium craftsmanship.',
  },
  {
    tier: 'Direct',
    names: 'Maui Jim, Oliver Peoples',
    detail: 'Stylish, niche designs with a focus on design elements, but at higher costs.',
  },
  {
    tier: 'Traditional retail',
    names: 'Sunglass Hut, Specsavers',
    detail: 'Higher prices, limited convenience, primarily in-store with some online availability.',
  },
]

const personality = [
  {
    title: 'Accessible Designer Quality',
    text: 'Stylish, high-quality eyewear crafted with care and offered at a fair price.',
  },
  {
    title: 'Empowering Social Impact',
    text: 'The "Buy a Pair, Give a Pair" program fosters community and global well-being.',
  },
  {
    title: 'Innovative Convenience',
    text: 'Seamless experiences through Home Try-On, online, and in-store services.',
  },
]

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-'

function useScramble(text, trigger, duration = 1400) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (!trigger) return undefined

    let frame = 0
    const totalFrames = Math.round(duration / 16)
    const interval = window.setInterval(() => {
      frame += 1
      const progress = frame / totalFrames
      setDisplay(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index / text.length < progress) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join(''),
      )

      if (frame >= totalFrames) {
        window.clearInterval(interval)
        setDisplay(text)
      }
    }, 16)

    return () => window.clearInterval(interval)
  }, [duration, text, trigger])

  return display
}

function useCounter(target, trigger, duration = 700) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!trigger) return undefined

    let frameId
    let start = null
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      setCount(Math.round(progress * target))
      if (progress < 1) frameId = window.requestAnimationFrame(step)
    }

    frameId = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(frameId)
  }, [duration, target, trigger])

  return String(count).padStart(2, '0')
}

function PhotoCell({ value, index, reduceMotion }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const animatedCount = useCounter(
    Number.parseInt(value.num, 10),
    inView && !reduceMotion,
    600 + index * 120,
  )
  const count = reduceMotion ? value.num : animatedCount
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, value.parallax])

  return (
    <motion.div
      ref={ref}
      className="wbf-photo-cell"
      initial={reduceMotion ? false : { opacity: 0, scale: 1.06, filter: 'blur(12px)' }}
      animate={inView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
      transition={{
        duration: reduceMotion ? 0 : 0.85,
        delay: reduceMotion ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div className="wbf-photo-media" style={{ y: reduceMotion ? 0 : y }}>
        <img src={assetPath(value.img)} alt={value.alt} />
      </motion.div>

      <div className="wbf-photo-overlay" aria-hidden="true">
        <span className="wbf-ov-num">{count}</span>
        <strong className="wbf-ov-title">{value.title}</strong>
        <p className="wbf-ov-text">{value.text}</p>
      </div>
    </motion.div>
  )
}

export default function WarbyBrandFoundation() {
  const sectionRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const rootInView = useInView(sectionRef, { once: true, amount: 0.15 })
  const rootText =
    'Affordable luxury eyewear with a commitment to style, quality, and social responsibility.'
  const scrambled = useScramble(rootText, rootInView && !reduceMotion)

  return (
    <div className="wbf-wrap" ref={sectionRef}>
      <motion.div
        className="wbf-root"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={rootInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.1 }}
      >
        <span className="wbf-root-label">Root strength</span>
        <p className="wbf-root-text" aria-label={rootText}>{scrambled}</p>
      </motion.div>

      <div className="wbf-photo-strip">
        {brandValues.map((value, index) => (
          <PhotoCell
            key={value.num}
            value={value}
            index={index}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>

      <div className="wbf-bottom">
        <motion.div
          className="wbf-competition"
          initial={reduceMotion ? false : { opacity: 0, x: -20 }}
          animate={rootInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.55 }}
        >
          <span className="wbf-col-label">Competition</span>
          <dl className="wbf-comp-list">
            {competitors.map((competitor, index) => (
              <motion.div
                className="wbf-comp-row"
                key={competitor.tier}
                initial={reduceMotion ? false : { opacity: 0, x: -14 }}
                animate={rootInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: reduceMotion ? 0 : 0.5,
                  delay: reduceMotion ? 0 : 0.65 + index * 0.1,
                }}
              >
                <dt className="wbf-comp-tier">{competitor.tier}</dt>
                <dd className="wbf-comp-names">
                  <strong>{competitor.names}</strong>
                  {competitor.detail}
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          className="wbf-personality"
          initial={reduceMotion ? false : { opacity: 0, x: 20 }}
          animate={rootInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.6 }}
        >
          <span className="wbf-col-label">Brand personality</span>
          <ul className="wbf-pers-list">
            {personality.map((item, index) => (
              <motion.li
                className="wbf-pers-item"
                key={item.title}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={rootInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: reduceMotion ? 0 : 0.5,
                  delay: reduceMotion ? 0 : 0.7 + index * 0.1,
                }}
              >
                <div className="wbf-pers-title">{item.title}</div>
                <p className="wbf-pers-text">{item.text}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
