import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './MetaGlassesCaseStudy.css'

const imagePath = (filename) => `${import.meta.env.BASE_URL}images/${filename}`
const deckAsset = (filename) =>
  imagePath(`metaglasses-case-study/${filename}`)
const videoPath = `${import.meta.env.BASE_URL}videos/metaglasses.mp4`

const features = [
  ['Navigation', 'Move through the world with contextual directions in view.'],
  ['Voice commands', 'Stay hands-free while controlling everyday tasks.'],
  ['Content capture', 'Record moments from a natural first-person perspective.'],
  ['Daily creativity', 'Translate ideas into media while remaining present.'],
  ['Productivity', 'Access useful information without reaching for a phone.'],
  ['Exploration', 'Layer digital discovery over physical places.'],
]

const motionScenes = [
  ['01', 'Curiosity', 'Fade from black and move through a frosted glass layer.'],
  ['02', 'Product immersion', 'Introduce the logo and product with soft zoom and bloom.'],
  ['03', 'Core features', 'Build modular scenes with slick panel transitions.'],
  ['04', 'Vision statement', 'Accelerate into high-energy lines and bolder scale.'],
]

function Reveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 42, filter: 'blur(10px)' }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function RippleDivider() {
  return (
    <div className="mg-ripple-divider" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <i />
    </div>
  )
}

function MetaGlassesCaseStudy() {
  const reduceMotion = useReducedMotion()

  return (
    <main className="mg-page">
      <nav className="mg-nav" aria-label="Meta Glasses case study navigation">
        <Link to="/">← Back to projects</Link>
        <span>Parisa Mohri / Motion case study 05</span>
      </nav>

      <header className="mg-hero">
        <motion.div
          className="mg-hero-copy"
          initial={reduceMotion ? false : { opacity: 0, filter: 'blur(14px)', scale: 0.97 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>Motion Design / Branding Campaign</p>
          <h1>Meta Glasses:<br />See the Future</h1>
          <span>
            A motion-led launch concept for smart glasses, designed to make augmented reality feel
            sleek, human, and ready for everyday life.
          </span>
        </motion.div>
        <motion.figure
          className="mg-hero-image"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={imagePath('metaglasses-card.png')} alt="Meta Glasses campaign visual" />
        </motion.figure>
        <div className="mg-hero-meta">
          <span>Brand / Meta</span>
          <span>Product / Smart Glasses</span>
          <span>Direction / Motion + Campaign</span>
        </div>
      </header>

      <RippleDivider />

      <section className="mg-section mg-motion-preview">
        <Reveal className="mg-section-heading">
          <p>01 / Campaign video</p>
          <div>
            <h2>Motion Preview</h2>
            <span>
              The final motion piece brings the campaign direction to life through blur, soft zoom,
              light bloom, panel swipes, and high-energy product transitions.
            </span>
          </div>
        </Reveal>
        <Reveal className="mg-video-frame">
          <video
            className="metaglasses-video"
            src={videoPath}
            poster={imagePath('metaglasses-card.png')}
            controls
            playsInline
            preload="metadata"
          >
            Your browser does not support embedded video.
          </video>
        </Reveal>
      </section>

      <section className="mg-section">
        <Reveal className="mg-section-heading">
          <p>02 / Branding information</p>
          <div>
            <h2>Technology framed as personal freedom.</h2>
            <span>See the world, enhanced.</span>
          </div>
        </Reveal>
        <div className="mg-brand-grid">
          <Reveal className="mg-brand-facts">
            <dl>
              <div><dt>Brand</dt><dd>Meta</dd></div>
              <div><dt>Product</dt><dd>Meta Glasses / Smart Glasses</dd></div>
              <div><dt>Audience</dt><dd>Gen Z, millennials, creators, futurists, and early adopters</dd></div>
              <div><dt>Tone</dt><dd>Futuristic, intelligent, sleek, empowering</dd></div>
            </dl>
          </Reveal>
          <Reveal className="mg-deck-image" delay={0.08}>
            <img src={deckAsset('branding.webp')} alt="Meta Glasses branding information" loading="lazy" />
          </Reveal>
        </div>
      </section>

      <section className="mg-section">
        <Reveal className="mg-section-heading">
          <p>03 / Branding assets</p>
          <div>
            <h2>Built to enhance, not replace.</h2>
            <span>
              The identity blends the digital and physical worlds while keeping connection,
              creativity, and accessibility at the center.
            </span>
          </div>
        </Reveal>
        <div className="mg-personality">
          {[
            ['Visionary', 'Always looking ahead through technology, connection, and design.'],
            ['Empowering', 'Giving users control, freedom, and confidence.'],
            ['Human-centered', 'Designed around real life, people, and accessibility.'],
          ].map(([title, text], index) => (
            <Reveal className="mg-glass-panel" delay={index * 0.08} key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <RippleDivider />

      <section className="mg-section mg-event">
        <Reveal className="mg-section-heading">
          <p>04 / Event Overview</p>
          <div>
            <h2>See the Future</h2>
            <span>
              More than a product launch, the event is an early look at a hybrid reality where
              digital tools feel seamless, useful, and present in everyday life.
            </span>
          </div>
        </Reveal>
        <div className="mg-feature-grid">
          {features.map(([title, text], index) => (
            <motion.article
              key={title}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
              whileInView={reduceMotion ? {} : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: index * 0.06 }}
            >
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
        <Reveal className="mg-event-statement">
          Meta Glasses are not just eyewear - they are a portal to the augmented world.
          <strong>Hands-free. Seamless. Connected.</strong>
        </Reveal>
      </section>

      <section className="mg-section mg-problem-goal">
        <Reveal className="mg-problem-card">
          <p>05 / The problem</p>
          <h2>AR still feels experimental, inaccessible, or awkward.</h2>
          <span>
            There is a gap between what wearable technology can do and how people imagine using
            it in everyday life.
          </span>
        </Reveal>
        <Reveal className="mg-goal-card" delay={0.1}>
          <p>The goal</p>
          <h2>Make the future feel useful, elegant, and natural.</h2>
          <span>
            Spark curiosity, create emotional connection, and position Meta Glasses as technology
            that belongs in real life.
          </span>
        </Reveal>
      </section>

      <section className="mg-section mg-design">
        <div className="mg-light-streak" aria-hidden="true" />
        <RippleDivider />
        <Reveal className="mg-section-heading">
          <p>06 / Design approach</p>
          <div>
            <h2>An interface language that behaves like light.</h2>
            <span>
              Frosted transparency, layered UI, negative space, and precise red lines create an AR
              environment that feels immersive without becoming noisy.
            </span>
          </div>
        </Reveal>
        <div className="mg-design-grid">
          {['Elegant', 'Intuitive', 'Modern', 'Immersive', 'Soft blur', 'Layered UI', 'High contrast', 'Wide typography'].map(
            (label, index) => (
              <Reveal className="mg-design-chip" delay={index * 0.04} key={label}>
                {label}
              </Reveal>
            ),
          )}
        </div>
        <Reveal className="mg-deck-image mg-design-visual">
          <img src={deckAsset('design.webp')} alt="Meta Glasses design approach" loading="lazy" />
        </Reveal>
      </section>

      <section className="mg-section mg-motion-approach">
        <div className="mg-light-streak" aria-hidden="true" />
        <Reveal className="mg-section-heading">
          <p>07 / Motion approach</p>
          <div>
            <h2>Build curiosity, reveal the product, accelerate the vision.</h2>
            <span>
              The motion system moves from slow atmospheric discovery to sharper, modular,
              high-energy statements.
            </span>
          </div>
        </Reveal>
        <div className="mg-motion-scenes">
          {motionScenes.map(([number, title, text], index) => (
            <motion.article
              key={title}
              initial={reduceMotion ? false : { opacity: 0, x: index % 2 ? 60 : -60, filter: 'blur(10px)' }}
              whileInView={reduceMotion ? {} : { opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.78, delay: index * 0.08 }}
            >
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
        <motion.p
          className="mg-final-statement"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.88, filter: 'blur(14px)' }}
          whileInView={reduceMotion ? {} : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9 }}
        >
          It’s not the future.<strong>It’s now.</strong>
        </motion.p>
      </section>

      <section className="mg-closing">
        <Reveal>
          <p>Meta Glasses / See the Future</p>
          <h2>Thank you.</h2>
          <Link to="/">Back to projects →</Link>
        </Reveal>
      </section>
    </main>
  )
}

export default MetaGlassesCaseStudy
