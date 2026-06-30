import { useLayoutEffect, useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import './CaseStudy.css'
import './WarbyParkerCaseStudy.css'

const assetPath = (filename) =>
  `${import.meta.env.BASE_URL}projects/warby-parker/${filename}`

const brandValues = [
  ['Style & quality', 'Designer-minded frames made to feel considered and current.'],
  ['Accessible pricing', 'Premium materials without the traditional luxury markup.'],
  ['Transparency & trust', 'A simple value story customers can understand quickly.'],
  ['Social responsibility', 'A purchase model connected to broader community impact.'],
]

const audienceGroups = [
  {
    title: 'Style-conscious young adults',
    detail: 'Gen Z and younger millennials seeking designer character at an attainable price.',
  },
  {
    title: 'Busy professionals',
    detail: 'Customers who value convenient discovery, virtual try-on, and easy returns.',
  },
  {
    title: 'First-time eyewear buyers',
    detail: 'People who need guidance, reassurance, and a clear reason to believe.',
  },
]

const personas = [
  {
    name: 'Brittany Adams',
    role: 'Elementary school teacher',
    need: 'Colourful glasses and a low-friction way to shop around a busy schedule.',
  },
  {
    name: 'Jenna Foster',
    role: 'Fashion PR intern',
    need: 'Modern frames that express her style without creating financial pressure.',
  },
  {
    name: 'Mark Hayes',
    role: 'Investment manager',
    need: 'Professional progressive lenses with trusted guidance and minimal shopping time.',
  },
]

const approachItems = [
  ['Bold eyewear focus', 'Let the frame silhouette carry the campaign before any supporting copy.'],
  ['Playful typography', 'Stretch the name through the lenses so type becomes part of the product.'],
  ['Minimal campaign layout', 'Use white space and sharp blue accents to keep comparison effortless.'],
  ['Pitch-ready system', 'Build one clear idea that can travel from story posts to out-of-home media.'],
]

const funnelStages = [
  {
    label: 'TOFU / Awareness',
    title: 'Spot the Difference OOH',
    copy: 'A split comparison introduces premium-looking frames at a noticeably more accessible price.',
    image: 'funnel-awareness.webp',
  },
  {
    label: 'MOFU / Engagement',
    title: 'This or That',
    copy: 'Interactive Instagram stories invite the audience to compare frames and question price assumptions.',
    image: 'funnel-engagement.webp',
  },
  {
    label: 'BOFU / Conversion',
    title: 'Trade-in event',
    copy: 'An in-store offer turns the promise into action: bring old frames and receive 40% off a new pair.',
    image: 'funnel-conversion.webp',
  },
]

const roadmap = [
  ['01', 'Chart the vision', 'Research, audience definition, and success metrics.'],
  ['02', 'Set the focus', 'Creative development, partnerships, and production planning.'],
  ['03', 'Frame the story', 'Launch the campaign and establish its comparison language.'],
  ['04', 'Through the lens', 'Expand into social, retail, and seasonal moments.'],
  ['05', 'Final adjustment', 'Review performance and refine the next campaign cycle.'],
]

function SectionHeading({ index, title, intro }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="warby-section-heading case-study-heading"
      initial={reduceMotion ? false : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
      whileInView={reduceMotion ? {} : { opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="case-study-index">{index}</p>
      <div>
        <h2>{title}</h2>
        {intro && <p className="case-study-intro">{intro}</p>}
        <motion.i
          aria-hidden="true"
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={reduceMotion ? {} : { scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  )
}

function FocusImage({ src, alt, caption, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.figure
      className={`warby-focus-image ${className}`}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, scale: 1.035, filter: 'blur(12px) brightness(0.7)' }
      }
      whileInView={
        reduceMotion
          ? {}
          : { opacity: 1, scale: 1, filter: 'blur(0px) brightness(1)' }
      }
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <img src={assetPath(src)} alt={alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </motion.figure>
  )
}

function WarbyParkerCaseStudy() {
  const reduceMotion = useReducedMotion()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 42])

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  return (
    <motion.main
      className="warby-page case-study-page"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <nav className="warby-nav case-study-nav" aria-label="Warby Parker case study navigation">
        <Link to="/">&larr; Back to projects</Link>
        <span>Parisa Mohri / Campaign case study</span>
      </nav>

      <header className="warby-hero case-study-hero" ref={heroRef}>
        <div className="warby-hero-copy">
          <motion.p
            className="warby-eyebrow"
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
          >
            Campaign design / Brand strategy
          </motion.p>
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            Warby Parker
            <span>The Pitch</span>
          </motion.h1>
          <motion.p
            className="warby-hero-summary"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            A pitch-style brand and campaign concept built around bold eyewear visuals.
          </motion.p>
          <motion.i
            className="warby-hero-line"
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <motion.figure
          className="warby-hero-media case-study-hero-media"
          style={reduceMotion ? undefined : { y: heroY }}
          initial={
            reduceMotion
              ? false
              : { opacity: 0, scale: 1.05, filter: 'blur(18px)' }
          }
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={assetPath('pitch-cover.webp')} alt="The Pitch cover with black glasses and blue Warby Parker lettering" />
        </motion.figure>
      </header>

      <section className="warby-section case-study-section">
        <SectionHeading
          index="01 / Overview"
          title="Affordable style, brought back into focus."
          intro="This pitch reframes Warby Parker as the point where designer-minded quality, accessible pricing, and social value meet."
        />
        <div className="warby-overview">
          <motion.div
            className="warby-scan-copy"
            initial={reduceMotion ? false : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            whileInView={reduceMotion ? {} : { opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>
              Warby Parker helped reshape direct-to-consumer eyewear. As the category became more
              crowded and prices increased, the campaign needed to make its value visible again.
            </p>
          </motion.div>
          <motion.dl
            initial={reduceMotion ? false : { opacity: 0, x: 28 }}
            whileInView={reduceMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div><dt>Project</dt><dd>Integrated campaign pitch</dd></div>
            <div><dt>Focus</dt><dd>Brand strategy + art direction</dd></div>
            <div><dt>Channels</dt><dd>OOH, social, retail</dd></div>
            <div><dt>Campaign</dt><dd>Spot the Difference</dd></div>
          </motion.dl>
        </div>
      </section>

      <section className="warby-section case-study-section">
        <SectionHeading
          index="02 / Brand foundation"
          title="A clear frame for the brand."
          intro="The strategic foundation balances affordable luxury, expressive design, convenience, and social responsibility."
        />
        <div className="warby-foundation">
          <FocusImage
            src="brand-key.webp"
            alt="Warby Parker brand key and competitive landscape"
            caption="Brand key / Competitive context"
          />
          <motion.div
            className="warby-frame-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.09 } },
            }}
          >
            {brandValues.map(([title, text]) => (
              <motion.article
                key={title}
                variants={{
                  hidden: reduceMotion ? {} : { opacity: 0, y: 22, scale: 0.98 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <i aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
        <FocusImage
          src="brand-values.webp"
          alt="Warby Parker brand values and personality board"
          caption="Values, personality, and visual audience"
          className="warby-wide-board"
        />
      </section>

      <section className="warby-section case-study-section">
        <SectionHeading
          index="03 / Problem + audience"
          title="Two lenses, one shared tension."
          intro="Customers want distinctive, well-made eyewear, but rising prices can weaken the affordability promise that first made the brand stand out."
        />
        <div className="warby-lens-split">
          <motion.article
            initial={reduceMotion ? false : { opacity: 0, x: -54 }}
            whileInView={reduceMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>Problem</span>
            <h3>Price is changing the perception.</h3>
            <p>
              The pitch must show that the increase supports better materials and modern design
              while Warby Parker remains more attainable than traditional designer eyewear.
            </p>
          </motion.article>
          <motion.article
            initial={reduceMotion ? false : { opacity: 0, x: 54 }}
            whileInView={reduceMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>Insight</span>
            <h3>The difference is not quality. It is price.</h3>
            <p>
              A direct comparison gives the audience a fast, memorable way to understand the
              brand's material value without asking them to read a long explanation.
            </p>
          </motion.article>
        </div>
        <div className="warby-audience-layout">
          <div className="warby-audience-list">
            {audienceGroups.map((group, index) => (
              <motion.article
                key={group.title}
                initial={reduceMotion ? false : { opacity: 0, x: -20 }}
                whileInView={reduceMotion ? {} : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <span>0{index + 1}</span>
                <h3>{group.title}</h3>
                <p>{group.detail}</p>
              </motion.article>
            ))}
          </div>
          <FocusImage
            src="target-audience.webp"
            alt="Warby Parker target audience board"
            caption="Primary audience segments"
          />
        </div>
      </section>

      <section className="warby-section case-study-section">
        <SectionHeading
          index="04 / Personas"
          title="Different lives, the same need for clarity."
          intro="The audience work captures three distinct paths to purchase: self-expression, convenience, and confidence."
        />
        <motion.div
          className="warby-persona-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
          }}
        >
          {personas.map((persona) => (
            <motion.article
              key={persona.name}
              variants={{
                hidden: reduceMotion ? {} : { opacity: 0, filter: 'blur(8px)', y: 24 },
                visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
              }}
              transition={{ duration: 0.65 }}
            >
              <span>{persona.role}</span>
              <h3>{persona.name}</h3>
              <p>{persona.need}</p>
            </motion.article>
          ))}
        </motion.div>
        <div className="warby-persona-boards">
          <FocusImage
            src="personas-brittany-jenna.webp"
            alt="Brittany Adams and Jenna Foster persona and journey boards"
            caption="Brittany + Jenna / Personas and journeys"
          />
          <FocusImage
            src="persona-mark.webp"
            alt="Mark Hayes persona and journey board"
            caption="Mark / Persona and journey"
            delay={0.08}
          />
        </div>
      </section>

      <section className="warby-section case-study-section">
        <SectionHeading
          index="05 / Goal"
          title="Reframe quality and price as allies."
          intro="The creative brief turns research into one focused proposition: designer-level materials can exist without a designer-level price."
        />
        <div className="warby-goal-split">
          <motion.article
            initial={reduceMotion ? false : { opacity: 0, x: -44 }}
            whileInView={reduceMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
          >
            <span>Overall goal</span>
            <p>
              Increase awareness of Warby Parker's material quality and affordability compared
              with higher-priced alternatives.
            </p>
          </motion.article>
          <motion.article
            initial={reduceMotion ? false : { opacity: 0, x: 44 }}
            whileInView={reduceMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
          >
            <span>Single-minded proposition</span>
            <p>The only difference between Warby Parker and designer glasses is the price.</p>
          </motion.article>
        </div>
        <FocusImage
          src="creative-brief.webp"
          alt="Warby Parker Sacred Six creative brief"
          caption="Sacred Six / Creative brief"
          className="warby-wide-board"
        />
      </section>

      <section className="warby-section case-study-section">
        <SectionHeading
          index="06 / Campaign concept"
          title="Spot the Difference."
          intro="A comparison-led campaign makes quality tangible, while a trade-in offer turns attention into participation."
        />
        <FocusImage
          src="lens-detail.webp"
          alt="Black glasses with Warby Parker lettering across the lenses"
          caption="The visual hook / Product and message become one"
          className="warby-lens-detail"
        />
        <motion.div
          className="warby-approach-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.085 } },
          }}
        >
          {approachItems.map(([title, text], index) => (
            <motion.article
              key={title}
              variants={{
                hidden: reduceMotion ? {} : { opacity: 0, scale: 0.96, y: 18 },
                visible: { opacity: 1, scale: 1, y: 0 },
              }}
              whileHover={reduceMotion ? undefined : { y: -5 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </motion.div>
        <div className="warby-concept-boards">
          <FocusImage
            src="campaign-concept.webp"
            alt="Spot the Difference campaign concept"
            caption="Campaign mechanism"
          />
          <FocusImage
            src="campaign-details.webp"
            alt="Spot the Difference campaign details"
            caption="Participation + social amplification"
            delay={0.08}
          />
        </div>
      </section>

      <section className="warby-section case-study-section">
        <SectionHeading
          index="07 / Full-funnel system"
          title="From first glance to final fit."
          intro="The same comparison idea changes form across awareness, engagement, and conversion without losing its central message."
        />
        <motion.div
          className="warby-funnel"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
          }}
        >
          {funnelStages.map((stage) => (
            <motion.article
              key={stage.title}
              variants={{
                hidden: reduceMotion ? {} : { opacity: 0, y: 32, filter: 'blur(8px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={assetPath(stage.image)} alt={`${stage.title} campaign board`} />
              <div>
                <span>{stage.label}</span>
                <h3>{stage.title}</h3>
                <p>{stage.copy}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="warby-section case-study-section">
        <SectionHeading
          index="08 / Roadmap"
          title="A campaign with a clear line of sight."
          intro="Five phases move from research to launch, seasonal activation, and performance review."
        />
        <div className="warby-roadmap">
          <motion.i
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleY: 0 }}
            whileInView={reduceMotion ? {} : { scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
          {roadmap.map(([number, title, detail], index) => (
            <motion.article
              key={number}
              initial={reduceMotion ? false : { opacity: 0, x: index % 2 ? 22 : -22 }}
              whileInView={reduceMotion ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: index * 0.04 }}
            >
              <span>{number}</span>
              <div><h3>{title}</h3><p>{detail}</p></div>
            </motion.article>
          ))}
        </div>
        <div className="warby-roadmap-boards">
          <FocusImage
            src="seasonality.webp"
            alt="Warby Parker campaign seasonality plan"
            caption="January through May / Seasonal activation"
          />
          <FocusImage
            src="roadmap.webp"
            alt="Warby Parker campaign roadmap"
            caption="Five-phase implementation roadmap"
            delay={0.08}
          />
        </div>
      </section>

      <section className="warby-final case-study-section">
        <SectionHeading
          index="09 / Final outcome"
          title="A simple idea with room to travel."
          intro="The finished direction gives Warby Parker a memorable visual comparison, a participatory social idea, and a practical retail conversion moment."
        />
        <FocusImage
          src="campaign.webp"
          alt="Warby Parker Spot the Difference campaign presentation"
          caption="Final campaign direction"
          className="warby-final-image"
        />
        <motion.i
          className="warby-final-line"
          aria-hidden="true"
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={reduceMotion ? {} : { scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.p
          className="warby-closing"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.18 }}
        >
          The Pitch turns a pricing challenge into a confident campaign truth: strong design,
          responsible values, and quality eyewear can remain accessible.
        </motion.p>
      </section>

      <div className="warby-cta case-study-cta">
        <p>Next view</p>
        <Link to="/">Back to projects &rarr;</Link>
      </div>

      <footer className="case-study-footer">
        <span>Warby Parker / The Pitch</span>
        <span>&copy; 2026 Parisa Mohri</span>
      </footer>
    </motion.main>
  )
}

export default WarbyParkerCaseStudy
