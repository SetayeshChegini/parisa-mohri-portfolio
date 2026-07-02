import { motion, useReducedMotion } from 'framer-motion'
import './WarbyProblemAudience.css'

const tensions = [
  {
    tag: 'Problem',
    title: 'Price is changing the perception.',
    body: 'The pitch must show that the increase supports better materials and modern design while Warby Parker remains more attainable than traditional designer eyewear.',
  },
  {
    tag: 'Insight',
    title: 'The difference is not quality.',
    body: "A direct comparison gives the audience a fast, memorable way to understand the brand's material value without asking them to read a long explanation.",
  },
]

const audiences = [
  {
    number: '01',
    title: 'Style-conscious young adults',
    body: 'Gen Z and younger millennials seeking designer character at an attainable price.',
    tags: ['Gen Z', 'Millennials', 'Trend-driven'],
  },
  {
    number: '02',
    title: 'Busy professionals',
    body: 'Customers who value convenient discovery, virtual try-on, and easy returns.',
    tags: ['Millennials', 'Gen X', 'Convenience-first'],
  },
  {
    number: '03',
    title: 'First-time eyewear buyers',
    body: 'People who need guidance, reassurance, and a clear reason to believe.',
    tags: ['Gen X', 'Guidance-seeking', 'Trust-driven'],
  },
]

const viewport = { once: true, amount: 0.2 }
const ease = [0.22, 1, 0.36, 1]

export default function WarbyProblemAudience() {
  const reduceMotion = useReducedMotion()

  const reveal = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="wpa-wrap">
      <section className="wpa-main" aria-labelledby="wpa-title">
        <motion.header
          className="wpa-heading"
          initial={reduceMotion ? false : { opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease }}
        >
          <span className="wpa-index">03 / Problem + Audience</span>
          <h2 id="wpa-title">Two lenses,<br />one shared tension.</h2>
          <p>
            Customers want distinctive, well-made eyewear, but rising prices can weaken the
            affordability promise that first made the brand stand out.
          </p>
          <motion.i
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewport}
            transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.12, ease }}
          />
        </motion.header>

        <motion.div
          className="wpa-tension-grid"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } },
          }}
        >
          {tensions.map((item) => (
            <motion.article
              className="wpa-tension-card"
              key={item.tag}
              variants={reveal}
              transition={{ duration: reduceMotion ? 0 : 0.7, ease }}
            >
              <span>{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <motion.section
        className="wpa-insight-bar"
        aria-label="Campaign insight"
        initial={reduceMotion ? false : { opacity: 0, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduceMotion ? 0 : 0.8, ease }}
      >
        <div className="wpa-insight-inner">
          <span className="wpa-insight-eyebrow">The single truth</span>
          <p>The difference is not quality.<br /><em>It is price.</em></p>
          <motion.i
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reduceMotion ? 0 : 1.2, delay: reduceMotion ? 0 : 0.16, ease }}
          />
        </div>
      </motion.section>

      <section className="wpa-audience" aria-labelledby="wpa-audience-title">
        <motion.h3
          id="wpa-audience-title"
          initial={reduceMotion ? false : { opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewport}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
        >
          Primary audience segments
        </motion.h3>

        <motion.div
          className="wpa-audience-grid"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.09 } },
          }}
        >
          {audiences.map((audience) => (
            <motion.article
              className="wpa-audience-card"
              key={audience.number}
              variants={reveal}
              transition={{ duration: reduceMotion ? 0 : 0.65, ease }}
            >
              <span className="wpa-audience-number">{audience.number}</span>
              <h4>{audience.title}</h4>
              <p>{audience.body}</p>
              <ul aria-label={`${audience.title} traits`}>
                {audience.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </div>
  )
}
