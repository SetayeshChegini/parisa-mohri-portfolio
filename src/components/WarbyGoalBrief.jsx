import { motion, useReducedMotion } from 'framer-motion'
import './WarbyGoalBrief.css'

const assetPath = (filename) =>
  `${import.meta.env.BASE_URL}projects/warby-parker/${filename}`

const goals = [
  {
    label: 'Overall Goal',
    text: "Increase awareness of Warby Parker's material quality and affordability compared with higher-priced alternatives.",
  },
  {
    label: 'Single-Minded Proposition',
    text: 'The only difference between Warby Parker and designer glasses is the price.',
  },
]

const briefFields = [
  ['Goal', 'Reframe Warby Parker as the best of both worlds on quality and price.'],
  ['Target Audience', 'Style-conscious young adults looking for affordable eyewear.'],
  ['Problem', 'Higher priced glasses are perceived as better quality glasses.'],
  ['Insight', 'Warby Parker materials match designer glasses at a fraction of the cost.'],
  ['Single Minded Proposition', 'The only difference between Warby Parker and designer glasses is the price.'],
  ['Action', 'Stylish young adults feel they are getting designer glasses for a steal.'],
]

const viewport = { once: true, amount: 0.25 }
const ease = [0.22, 1, 0.36, 1]

function wordOrigin(cardIndex, wordIndex) {
  const seed = (cardIndex + 3) * (wordIndex + 5) * 37
  return {
    x: (seed % 181) - 90,
    y: ((seed * 7) % 121) - 60,
    rotate: ((seed * 13) % 25) - 12,
    scale: 0.62 + ((seed * 11) % 34) / 100,
  }
}

function ScatterText({ text, cardIndex, reduceMotion }) {
  return (
    <p className="wgb-scatter" aria-label={text}>
      {text.split(' ').map((word, wordIndex) => {
        const origin = wordOrigin(cardIndex, wordIndex)

        return (
          <motion.span
            aria-hidden="true"
            key={`${word}-${wordIndex}`}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    x: origin.x,
                    y: origin.y,
                    rotate: origin.rotate,
                    scale: origin.scale,
                  }
            }
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
            viewport={viewport}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              delay: reduceMotion ? 0 : wordIndex * 0.04,
              ease,
            }}
          >
            {word}
          </motion.span>
        )
      })}
    </p>
  )
}

export default function WarbyGoalBrief() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="wgb-section" aria-labelledby="wgb-title">
      <motion.header
        className="wgb-heading"
        initial={reduceMotion ? false : { opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewport}
        transition={{ duration: reduceMotion ? 0 : 0.65, ease }}
      >
        <span>05 / Goal</span>
        <h2 id="wgb-title">Reframe quality and price as allies.</h2>
        <motion.i
          aria-hidden="true"
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewport}
          transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.12, ease }}
        />
      </motion.header>

      <div className="wgb-goal-grid">
        {goals.map((goal, cardIndex) => (
          <motion.article
            className="wgb-goal-card"
            key={goal.label}
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport}
            transition={{ duration: reduceMotion ? 0 : 0.35, delay: cardIndex * 0.08 }}
          >
            <span>{goal.label}</span>
            <ScatterText text={goal.text} cardIndex={cardIndex} reduceMotion={reduceMotion} />
          </motion.article>
        ))}
      </div>

      <div className="wgb-brief">
        <motion.figure
          className="wgb-brief-visual"
          initial={reduceMotion ? false : { opacity: 0, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={viewport}
          transition={{ duration: reduceMotion ? 0 : 0.85, ease }}
        >
          <motion.img
            src={assetPath('goal-brief-photo.webp')}
            alt="A curated collection of dark Warby Parker eyewear"
            initial={reduceMotion ? false : { scale: 1.18 }}
            whileInView={{ scale: 1.06 }}
            whileHover={reduceMotion ? undefined : { scale: 1.1 }}
            viewport={viewport}
            transition={{ duration: reduceMotion ? 0 : 1.8, ease }}
          />
          <div className="wgb-brief-scrim" aria-hidden="true" />
          <div className="wgb-brief-vignette" aria-hidden="true" />
          <figcaption>
            <span>Sacred Six</span>
            <strong>Creative <em>Brief</em></strong>
          </figcaption>
        </motion.figure>

        <motion.div
          className="wgb-brief-fields"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: reduceMotion ? 0 : 0.4 }}
        >
          {briefFields.map(([key, value], index) => (
            <motion.article
              className="wgb-brief-row"
              key={key}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                delay: reduceMotion ? 0 : 0.2 + index * 0.06,
                ease,
              }}
            >
              <div>
                <span>0{index + 1}</span>
                <h3>{key}</h3>
              </div>
              <p>{value}</p>
            </motion.article>
          ))}
          <motion.i
            className="wgb-fields-mask"
            aria-hidden="true"
            initial={reduceMotion ? false : { clipPath: 'circle(100% at 50% 50%)' }}
            whileInView={{ clipPath: 'circle(0% at 50% 50%)' }}
            viewport={viewport}
            transition={{ duration: reduceMotion ? 0 : 1.1, delay: reduceMotion ? 0 : 0.1, ease }}
          />
        </motion.div>
      </div>
    </section>
  )
}
