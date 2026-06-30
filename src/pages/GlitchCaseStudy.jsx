import { useLayoutEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import './GlitchCaseStudy.css'
import './CaseStudy.css'

const assetPath = (filename) => `${import.meta.env.BASE_URL}projects/glitch/${filename}`

const colors = [
  ['Dopamine', '#df4f9c'],
  ['All-Nighter', '#051b2b'],
  ['Wired', '#7ad0e4'],
  ['Adrenaline', '#644a9e'],
  ['Focus', '#e1f3f7'],
  ['Surge', '#2061ae'],
]

const markRules = [
  ['Clear space', 'Give the symbol enough room to remain immediate and recognizable.'],
  ['Original colours', 'Use only approved palette combinations for the mark.'],
  ['No stretching', 'Scale proportionally without skewing either axis.'],
  ['No rotation', 'Keep the logo anchored to its intended orientation.'],
  ['Quiet backgrounds', 'Avoid imagery that competes with the mark.'],
  ['Keep proportions', 'Never rebuild or rearrange the symbol and wordmark.'],
]

function Reveal({ children, className = '', delay = 0, amount = 0.16 }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 30, filter: 'blur(8px)' }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ index, title, intro }) {
  return (
    <Reveal className="glitch-section-heading case-study-heading">
      <p className="case-study-index">{index}</p>
      <div>
        <h2 className="glitch-label" data-text={title}>{title}</h2>
        {intro && <p className="case-study-intro">{intro}</p>}
      </div>
    </Reveal>
  )
}

function CaseImage({ src, alt, label, className = '' }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.figure
      className={`glitch-case-image ${className}`}
      initial={reduceMotion ? false : { opacity: 0, clipPath: 'inset(0 0 14% 0)', scale: 1.025 }}
      whileInView={reduceMotion ? {} : { opacity: 1, clipPath: 'inset(0 0 0% 0)', scale: 1 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.88, ease: [0.22, 1, 0.36, 1] }}
    >
      <img src={assetPath(src)} alt={alt} />
      {label && <figcaption>{label}</figcaption>}
    </motion.figure>
  )
}

function GlitchCaseStudy() {
  const reduceMotion = useReducedMotion()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 48])

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  return (
    <main className="glitch-page case-study-page">
      <nav className="glitch-nav case-study-nav" aria-label="Glitch case study navigation">
        <Link to="/">&larr; Back to projects</Link>
        <span>Parisa Mohri / Brand case study</span>
      </nav>

      <header className="glitch-hero case-study-hero" ref={heroRef}>
        <motion.div
          className="glitch-hero-copy case-study-hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 24, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="glitch-eyebrow">Energy drink identity / Visual system</p>
          <h1 className="glitch-title" data-text="GLITCH">GLITCH</h1>
          <p className="glitch-summary">
            A high-energy brand system built for nightlife, motion, and digital culture.
          </p>
        </motion.div>

        <motion.figure
          className="glitch-hero-media case-study-hero-media"
          style={reduceMotion ? undefined : { y: heroY }}
          initial={reduceMotion ? false : { opacity: 0, scale: 1.035 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={assetPath('cover.webp')} alt="Glitch energy drink brand cover" />
          <i aria-hidden="true" />
        </motion.figure>
      </header>

      <section className="glitch-section case-study-section">
        <SectionHeading
          index="01 / Overview"
          title="Consistency creates impact."
          intro="The guideline system gives partners a clear way to represent Glitch across product, merchandising, advertising, and everyday communication."
        />
        <div className="glitch-overview">
          <Reveal>
            <p>
              Glitch is an energy drink redesign with a futuristic visual identity that turns
              speed, stimulation, and digital culture into one recognizable system.
            </p>
          </Reveal>
          <Reveal className="glitch-facts" delay={0.08}>
            <div><span>Project</span><strong>Brand redesign</strong></div>
            <div><span>Focus</span><strong>Identity guidelines</strong></div>
            <div><span>Deliverables</span><strong>Packaging + campaign</strong></div>
          </Reveal>
        </div>
      </section>

      <section className="glitch-section case-study-section">
        <SectionHeading
          index="02 / Strategy"
          title="Strategic brand guidelines."
          intro="The system balances a bold cyber aesthetic with enough structure to stay consistent wherever the brand appears."
        />
        <div className="glitch-strategy-layout">
          <CaseImage
            src="nightlife.webp"
            alt="Neon cyber imagery defining the Glitch visual mood"
            label="Visual world / Nightlife energy"
            className="glitch-nightlife"
          />
          <Reveal className="glitch-strategy-copy" delay={0.08}>
            <p>
              The visual direction is energetic, immersive, and unmistakably digital. Saturated
              colour interrupts deep navy space while fractured type and luminous imagery create
              a feeling of controlled overload.
            </p>
            <ul>
              <li>Bold enough to lead in crowded environments</li>
              <li>Flexible across physical and digital applications</li>
              <li>Consistent without becoming repetitive</li>
              <li>Cyber-inspired, youthful, and kinetic</li>
            </ul>
          </Reveal>
        </div>
        <CaseImage
          src="strategy.webp"
          alt="Glitch strategic brand guidelines"
          label="Source strategy spread / Supporting reference"
          className="glitch-wide-board"
        />
      </section>

      <section className="glitch-section case-study-section">
        <SectionHeading
          index="03 / Logo system"
          title="One mark, several controlled expressions."
          intro="Approved logo versions preserve contrast and recognition across dark, light, and colour environments."
        />
        <div className="glitch-logo-layout">
          <Reveal className="glitch-logo-copy">
            <p>
              The symbol and wordmark act as a single signature. Their relationship stays fixed so
              the brand remains recognizable from can packaging to large-format advertising.
            </p>
            <blockquote>
              Keep the mark intact. Change the environment, not the identity.
            </blockquote>
          </Reveal>
          <CaseImage
            src="logo-system.webp"
            alt="Approved Glitch logo variations"
            label="Primary logo system"
          />
        </div>
      </section>

      <section className="glitch-section case-study-section">
        <SectionHeading
          index="04 / Mark integrity"
          title="Protect the signal."
          intro="Clear space, proportion, contrast, and orientation keep the logo legible and distinct."
        />
        <CaseImage
          src="mark-rules.webp"
          alt="Glitch clear-space and mark-integrity guidelines"
          label="Clear space + Integrity of the mark"
          className="glitch-wide-board"
        />
        <div className="glitch-rule-grid">
          {markRules.map(([title, text], index) => (
            <Reveal className="glitch-rule" delay={index * 0.045} key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="glitch-section case-study-section">
        <SectionHeading
          index="05 / Colour system"
          title="Six colours. One electric spectrum."
          intro="The palette moves between deep night tones and high-voltage highlights, giving every application both contrast and energy."
        />
        <div className="glitch-swatches">
          {colors.map(([name, value], index) => (
            <motion.article
              key={name}
              style={{ '--glitch-swatch': value }}
              initial={reduceMotion ? false : { opacity: 0, x: -18, y: 16 }}
              whileInView={reduceMotion ? {} : { opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.56, delay: index * 0.065, ease: [0.22, 1, 0.36, 1] }}
            >
              <i />
              <h3>{name}</h3>
              <p>{value}</p>
            </motion.article>
          ))}
        </div>
        <CaseImage
          src="colour-system.webp"
          alt="Glitch colour system board"
          label="Approved brand palette"
          className="glitch-colour-board"
        />
      </section>

      <section className="glitch-section case-study-section">
        <SectionHeading
          index="06 / Typography"
          title="A technical display voice with a clear reading layer."
          intro="The display style takes cues from Cyberspace; a restrained geometric sans-serif supports longer copy and practical communication."
        />
        <div className="glitch-type-layout">
          <Reveal className="glitch-type-specimen">
            <p>Display alternative</p>
            <strong>ENERGIZE<br />YOUR<br />IMAGINATION</strong>
          </Reveal>
          <Reveal className="glitch-type-body" delay={0.08}>
            <p>Body alternative</p>
            <h3>Arial / Geometric sans-serif</h3>
            <span>
              Clean shapes, open spacing, and moderate weight keep supporting information readable
              beside the expressive display system.
            </span>
          </Reveal>
        </div>
        <CaseImage
          src="typography.webp"
          alt="Glitch typography system"
          label="Typography guidelines"
          className="glitch-wide-board"
        />
      </section>

      <section className="glitch-section case-study-section">
        <SectionHeading
          index="07 / Brand applications"
          title="Built to move from product to culture."
          intro="The identity holds together across cans, posters, apparel, merchandise, and high-impact outdoor advertising."
        />
        <div className="glitch-application-grid">
          <CaseImage
            src="cans.webp"
            alt="Glitch energy drink can applications"
            label="Product packaging"
            className="glitch-cans"
          />
          <CaseImage
            src="applications.webp"
            alt="Glitch poster, mug, shirt, tote, and billboard applications"
            label="Campaign + Merchandise"
            className="glitch-merch"
          />
        </div>
      </section>

      <section className="glitch-section glitch-closing case-study-section">
        <Reveal>
          <p className="case-study-index">08 / Outcome</p>
          <h2>
            Glitch creates a bold, futuristic energy drink identity built for motion, nightlife,
            and high-impact digital culture.
          </h2>
        </Reveal>
      </section>

      <section className="glitch-cta case-study-cta">
        <p>Return to the selected work.</p>
        <Link to="/">Back to projects</Link>
      </section>

      <footer className="glitch-footer case-study-footer">
        <span>Glitch / Brand identity case study</span>
        <span>&copy; 2026 Parisa Mohri</span>
      </footer>
    </main>
  )
}

export default GlitchCaseStudy
