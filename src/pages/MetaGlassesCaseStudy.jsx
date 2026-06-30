import { useLayoutEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './MetaGlassesCaseStudy.css'
import './CaseStudy.css'

const imagePath = (filename) => `${import.meta.env.BASE_URL}images/${filename}`
const studyAsset = (filename) => imagePath(`metaglasses-case-study/${filename}`)
const videoPath = `${import.meta.env.BASE_URL}videos/metaglasses.mp4`

const projectFacts = [
  ['Role', 'Motion designer', 'Brand designer'],
  ['Tools', 'After Effects', 'Figma + Photoshop'],
  ['Project type', 'Brand campaign', 'Motion direction'],
  ['Timeline', 'Concept to final film', '2026'],
  ['Goal', 'Make wearable AR feel', 'human and desirable'],
]

const brandPrinciples = [
  {
    label: 'Mission',
    title: 'Enhance the world already in front of you.',
    text: 'Position smart glasses as a useful layer over real life, not an escape from it.',
  },
  {
    label: 'Audience',
    title: 'Curious, connected, visually fluent.',
    text: 'Creators, early adopters, and young professionals who expect technology to feel effortless.',
  },
  {
    label: 'Tone',
    title: 'Intelligent without feeling clinical.',
    text: 'Futuristic, precise, empowering, and calm enough to remain approachable.',
  },
  {
    label: 'Personality',
    title: 'Visionary, human-centered, quietly bold.',
    text: 'A confident system that lets light, depth, and product behavior carry the story.',
  },
]

const eventFeatures = [
  ['01', 'Navigate', 'Contextual directions stay in view while the user remains present.'],
  ['02', 'Command', 'Voice interaction keeps everyday tasks natural and hands-free.'],
  ['03', 'Capture', 'First-person content turns a passing moment into a shareable memory.'],
  ['04', 'Create', 'Information and creative tools appear exactly when they are useful.'],
]

const motionPrinciples = [
  {
    className: 'mg-demo-blur',
    label: 'Blur to clear',
    text: 'A soft reveal turns uncertainty into focus.',
  },
  {
    className: 'mg-demo-zoom',
    label: 'Soft zoom',
    text: 'Slow camera pressure gives the product presence.',
  },
  {
    className: 'mg-demo-sweep',
    label: 'Light sweep',
    text: 'A narrow highlight traces form and material.',
  },
  {
    className: 'mg-demo-panel',
    label: 'Panel swipe',
    text: 'Layered surfaces make information feel spatial.',
  },
]

function Reveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 32, filter: 'blur(8px)' }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ index, title, intro }) {
  return (
    <Reveal className="mg-section-heading case-study-heading">
      <p className="case-study-index">{index}</p>
      <div>
        <h2>{title}</h2>
        {intro && <p className="mg-section-intro case-study-intro">{intro}</p>}
      </div>
    </Reveal>
  )
}

function SupportingVisual({ asset, alt, label, className = '' }) {
  return (
    <Reveal className={`mg-supporting-visual ${className}`}>
      <div>
        <img src={studyAsset(asset)} alt={alt} loading="lazy" />
      </div>
      <p>{label}</p>
    </Reveal>
  )
}

function MetaGlassesCaseStudy() {
  const reduceMotion = useReducedMotion()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  return (
    <main className="mg-page case-study-page">
      <nav className="mg-nav case-study-nav" aria-label="Meta Glasses case study navigation">
        <Link to="/">&larr; Back to projects</Link>
        <span>Parisa Mohri / Motion case study</span>
      </nav>

      <header className="mg-hero case-study-hero">
        <motion.div
          className="mg-hero-copy case-study-hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 24, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mg-eyebrow">Branding + Motion Design</p>
          <h1>Meta Glasses</h1>
          <p className="mg-summary">
            A cinematic launch campaign that makes augmented reality feel sleek, useful, and
            ready for everyday life.
          </p>
        </motion.div>

        <motion.figure
          className="mg-hero-film case-study-hero-media"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <video
            src={videoPath}
            poster={imagePath('metaglasses-card.png')}
            controls
            playsInline
            preload="metadata"
          >
            Your browser does not support embedded video.
          </video>
          <figcaption>
            <span>Final campaign film</span>
            <span>Motion preview / Final cut</span>
          </figcaption>
        </motion.figure>
      </header>

      <section className="mg-section mg-overview case-study-section">
        <SectionHeading
          index="01 / Project overview"
          title="A launch story for technology that disappears into life."
          intro="The project combines campaign strategy, visual identity, and motion direction to move smart glasses from speculative object to believable everyday product."
        />
        <div className="mg-facts-grid">
          {projectFacts.map(([label, lineOne, lineTwo], index) => (
            <Reveal className="mg-fact" delay={index * 0.04} key={label}>
              <p>{label}</p>
              <strong>{lineOne}</strong>
              <span>{lineTwo}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mg-section case-study-section">
        <SectionHeading
          index="02 / Brand direction"
          title="The future should feel personal, not distant."
          intro="Every brand decision supports one idea: technology is most powerful when it helps people stay connected to the moment."
        />
        <div className="mg-brand-layout">
          <div className="mg-principles">
            {brandPrinciples.map((principle, index) => (
              <Reveal className="mg-principle" delay={index * 0.05} key={principle.label}>
                <p>{principle.label}</p>
                <h3>{principle.title}</h3>
                <span>{principle.text}</span>
              </Reveal>
            ))}
          </div>
          <SupportingVisual
            asset="branding.webp"
            alt="Meta Glasses brand direction"
            label="Brand direction / supporting study"
            className="mg-visual-brand"
          />
        </div>
      </section>

      <section className="mg-section mg-event case-study-section">
        <SectionHeading
          index="03 / Event concept"
          title="See the Future."
          intro="The launch event is imagined as a guided step into hybrid reality: visitors discover the product through useful, human scenarios rather than technical spectacle."
        />
        <div className="mg-event-layout">
          <SupportingVisual
            asset="event.webp"
            alt="See the Future event concept"
            label="Launch environment / event concept"
            className="mg-visual-event"
          />
          <div className="mg-event-copy">
            <p>
              The experience introduces one capability at a time, building from orientation to
              expression. Each moment answers a simple question: what becomes easier when
              information can move with you?
            </p>
            <div className="mg-event-features">
              {eventFeatures.map(([number, title, text], index) => (
                <Reveal className="mg-event-feature" delay={index * 0.05} key={title}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mg-section case-study-section">
        <SectionHeading index="04 / Problem and goal" title="Close the gap between possibility and desire." />
        <div className="mg-problem-grid">
          <Reveal className="mg-problem-card">
            <p>The problem</p>
            <h3>Wearable AR can feel awkward, experimental, and disconnected from real routines.</h3>
            <span>
              Technical features alone do not help people imagine why the product belongs in
              their day.
            </span>
          </Reveal>
          <Reveal className="mg-goal-card" delay={0.08}>
            <p>The goal</p>
            <h3>Make advanced technology feel elegant, useful, and emotionally relevant.</h3>
            <span>
              The campaign translates capability into clear moments of freedom, creativity, and
              connection.
            </span>
          </Reveal>
        </div>
      </section>

      <section className="mg-section mg-visual-system case-study-section">
        <SectionHeading
          index="05 / Visual design system"
          title="Dark space, precise light, controlled energy."
          intro="A restrained system gives the product room to feel premium while red signals, cool highlights, and translucent layers suggest an interface in motion."
        />

        <div className="mg-system-grid">
          <Reveal className="mg-palette">
            <p>Color system</p>
            <div className="mg-swatches">
              <div style={{ '--swatch': '#050505' }}><i /><span>Obsidian</span><small>#050505</small></div>
              <div style={{ '--swatch': '#d10b18' }}><i /><span>Signal red</span><small>#D10B18</small></div>
              <div style={{ '--swatch': '#4f070d' }}><i /><span>Deep pulse</span><small>#4F070D</small></div>
              <div style={{ '--swatch': '#e7e9ed' }}><i /><span>Lens white</span><small>#E7E9ED</small></div>
            </div>
          </Reveal>

          <Reveal className="mg-type-system" delay={0.06}>
            <p>Typography + form</p>
            <strong>Wide. Precise.<br />Future-facing.</strong>
            <span>
              Editorial scale creates confidence; compact labels, thin rules, and modular panels
              keep information technical but readable.
            </span>
          </Reveal>
        </div>

        <div className="mg-asset-grid">
          <SupportingVisual
            asset="assets.webp"
            alt="Meta Glasses identity assets"
            label="Identity assets"
            className="mg-visual-assets"
          />
          <SupportingVisual
            asset="design.webp"
            alt="Meta Glasses interface and visual design"
            label="Interface language"
            className="mg-visual-design"
          />
        </div>
      </section>

      <section className="mg-section mg-motion-system case-study-section">
        <div className="mg-ripple-field" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <SectionHeading
          index="06 / Motion design"
          title="Let the campaign behave like light."
          intro="Motion moves from quiet discovery to focused acceleration. The page demonstrates the same rhythm through soft focus, scale, light, and layered transitions."
        />
        <div className="mg-motion-grid">
          {motionPrinciples.map((principle, index) => (
            <Reveal className="mg-motion-item" delay={index * 0.06} key={principle.label}>
              <div className={`mg-motion-demo ${principle.className}`}>
                <img src={imagePath('metaglasses-card.png')} alt="" />
                <i aria-hidden="true" />
              </div>
              <p>0{index + 1}</p>
              <h3>{principle.label}</h3>
              <span>{principle.text}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mg-section mg-outcome case-study-section">
        <SectionHeading
          index="07 / Final outcome"
          title="A launch world with one clear promise: see more, carry less."
          intro="The final direction connects brand, product, and motion into a coherent reveal that feels cinematic without losing the human use case."
        />
        <Reveal className="mg-outcome-hero">
          <img src={imagePath('metaglasses-card.png')} alt="Final Meta Glasses campaign artwork" />
          <div>
            <p>Campaign reveal</p>
            <span>Meta Glasses / See the Future</span>
          </div>
        </Reveal>
        <div className="mg-outcome-details">
          <SupportingVisual
            asset="motion.webp"
            alt="Meta Glasses motion direction"
            label="Motion sequence"
            className="mg-visual-motion"
          />
          <Reveal className="mg-outcome-statement">
            <p>Final statement</p>
            <blockquote>
              It is not about replacing reality. It is about making the world in front of you more
              useful, expressive, and connected.
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="mg-section mg-reflection case-study-section">
        <SectionHeading index="08 / Reflection" title="Motion gave the product a reason to feel real." />
        <div className="mg-reflection-copy">
          <p>
            This project taught me to treat movement as part of the brand system, not decoration.
            Timing, blur, scale, and light each help explain how the product should feel before a
            feature is ever described.
          </p>
          <p>
            The strongest result came from balancing futuristic energy with restraint: enough
            atmosphere to create desire, and enough clarity to keep the idea believable.
          </p>
        </div>
      </section>

      <section className="mg-cta case-study-cta">
        <p>Return to the selected work.</p>
        <Link to="/">Back to projects</Link>
      </section>

      <footer className="mg-footer case-study-footer">
        <span>Meta Glasses / Motion case study</span>
        <span>&copy; 2026 Parisa Mohri</span>
      </footer>
    </main>
  )
}

export default MetaGlassesCaseStudy
