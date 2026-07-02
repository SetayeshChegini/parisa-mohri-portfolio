import { useLayoutEffect, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import WarbyBrandFoundation from '../components/WarbyBrandFoundation'
import WarbyOverview from '../components/WarbyOverview'
import WarbyProblemAudience from '../components/WarbyProblemAudience'
import './CaseStudy.css'
import './WarbyParkerCaseStudy.css'

const assetPath = (filename) =>
  `${import.meta.env.BASE_URL}projects/warby-parker/${filename}`

const personaProfiles = [
  {
    id: 'brittany',
    name: 'Brittany Adams',
    initials: 'BA',
    role: 'Elementary school teacher',
    details: '37 years old / Vancouver / $75,000',
    objective: "Find colourful glasses that fit her personal style without losing time going to a store.",
    motivations: 'Saving time, a comfortable all-day fit, personal style, and being a positive role model.',
    dislikes: 'Crowded stores, complicated returns, and shopping experiences that demand too much time.',
    traits: ['Books', 'Colour', 'Community'],
    journey: [
      {
        stage: 'Awareness',
        action: 'Sees a transit campaign and hears a friend mention Warby Parker.',
        feeling: 'Curious, but distracted by a packed teaching schedule.',
        channel: 'Transit, podcasts, and word of mouth',
      },
      {
        stage: 'Research',
        action: 'Reads blog reviews and watches YouTube try-on videos.',
        feeling: 'Relieved that she can buy, compare, and return frames online.',
        channel: 'Google, YouTube, and TikTok',
      },
      {
        stage: 'Decide',
        action: 'Uses virtual try-on and compares a two-pair promotion.',
        feeling: 'Confident she can test colour without committing too early.',
        channel: 'Website and virtual try-on',
      },
      {
        stage: 'Purchase',
        action: 'Applies a newsletter code and orders two frames online.',
        feeling: 'Hopeful that the fit will be as effortless as the purchase.',
        channel: 'Website and email',
      },
      {
        stage: 'Review',
        action: 'Leaves a review and shares photos with friends.',
        feeling: 'Delighted by the fit and already thinking about another colour.',
        channel: 'Website and WhatsApp',
      },
    ],
  },
  {
    id: 'jenna',
    name: 'Jenna Foster',
    initials: 'JF',
    role: 'Fashion PR intern',
    details: '24 years old / Toronto / $40,000',
    objective: 'Purchase a modern, expressive pair of glasses at an attainable price.',
    motivations: 'Building a personal style, staying independent, and avoiding debt.',
    dislikes: 'Corporate language, unrelatable brands, and styles that feel too conservative.',
    traits: ['Fashion', 'Social', 'Mobile'],
    journey: [
      {
        stage: 'Awareness',
        action: 'Sees an influencer wearing Warby Parker and encounters an Instagram ad.',
        feeling: 'Interested because the frames look stylish without feeling unreachable.',
        channel: 'TikTok and Instagram',
      },
      {
        stage: 'Research',
        action: 'Searches TikTok reviews and asks friends about the brand.',
        feeling: 'Questions the price, but likes the design and social mission.',
        channel: 'TikTok and word of mouth',
      },
      {
        stage: 'Decide',
        action: 'Visits the site, checks styles, and reads customer reviews.',
        feeling: 'Reassured by strong reviews and the range of expressive frames.',
        channel: 'Website and reviews',
      },
      {
        stage: 'Purchase',
        action: 'Buys through mobile and uses a first-purchase promotion.',
        feeling: 'Excited, with a little uncertainty about how the frame will look.',
        channel: 'Mobile site and promo code',
      },
      {
        stage: 'Review',
        action: 'Posts an outfit photo and tells friends the glasses feel affordable.',
        feeling: 'Proud that the frame works across her wardrobe.',
        channel: 'Instagram',
      },
    ],
  },
  {
    id: 'mark',
    name: 'Mark Hayes',
    initials: 'MH',
    role: 'Investment manager',
    details: '51 years old / Oakville / $140,000',
    objective: 'Buy progressive lenses for the first time with efficient, expert guidance.',
    motivations: 'Spending as little time shopping as possible and looking polished at work.',
    dislikes: 'Shopping online, unclear choices, and trend-led communication that feels too young.',
    traits: ['Briefcase', 'News', 'In-store'],
    journey: [
      {
        stage: 'Awareness',
        action: 'Reads about Warby Parker and hears a recommendation from his children.',
        feeling: 'Trusts the recommendation, but needs proof of professional quality.',
        channel: 'News and word of mouth',
      },
      {
        stage: 'Research',
        action: 'Checks Google reviews and compares progressive-lens providers.',
        feeling: 'Overwhelmed by the number of options and technical details.',
        channel: 'Google, reviews, and articles',
      },
      {
        stage: 'Decide',
        action: 'Tries frames in store and asks an optician for a recommendation.',
        feeling: 'Reassured by knowledgeable staff and a clear fitting process.',
        channel: 'Store and optician',
      },
      {
        stage: 'Purchase',
        action: 'Has lenses measured, pays, and returns to collect the finished pair.',
        feeling: 'Optimistic that the glasses will feel as polished as a designer pair.',
        channel: 'Physical store',
      },
      {
        stage: 'Review',
        action: 'Shares the experience on Facebook and leaves a Google review.',
        feeling: 'Satisfied that the result matches premium designer quality.',
        channel: 'Facebook and Google Reviews',
      },
    ],
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

function PersonaExplorer() {
  const reduceMotion = useReducedMotion()
  const [activePersona, setActivePersona] = useState(0)
  const [activeJourney, setActiveJourney] = useState(0)
  const profile = personaProfiles[activePersona]
  const journey = profile.journey[activeJourney]

  const selectPersona = (index) => {
    setActivePersona(index)
    setActiveJourney(0)
  }

  return (
    <div className="warby-persona-explorer">
      <div className="warby-persona-tabs" role="tablist" aria-label="Compare personas">
        {personaProfiles.map((persona, index) => (
          <button
            className={activePersona === index ? 'is-active' : ''}
            type="button"
            role="tab"
            aria-selected={activePersona === index}
            aria-controls="warby-persona-panel"
            onClick={() => selectPersona(index)}
            key={persona.id}
          >
            <span>0{index + 1}</span>
            <strong>{persona.name}</strong>
            <small>{persona.role}</small>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.article
          className="warby-persona-panel"
          id="warby-persona-panel"
          role="tabpanel"
          aria-label={`${profile.name} persona`}
          key={profile.id}
          initial={reduceMotion ? false : 'fragmented'}
          animate="assembled"
          exit={reduceMotion ? undefined : { opacity: 0, filter: 'blur(7px)' }}
          variants={{
            fragmented: {},
            assembled: { transition: { staggerChildren: 0.075 } },
          }}
          transition={{ duration: 0.26 }}
        >
          <motion.header
            className="warby-persona-header"
            variants={{
              fragmented: reduceMotion ? {} : { opacity: 0, x: -18, y: -8 },
              assembled: { opacity: 1, x: 0, y: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="warby-persona-portrait" aria-hidden="true">
              <span>{profile.initials}</span>
            </div>
            <div>
              <p>{profile.role}</p>
              <h3>{profile.name}</h3>
              <span>{profile.details}</span>
            </div>
            <ul aria-label="Lifestyle signals">
              {profile.traits.map((trait) => <li key={trait}>{trait}</li>)}
            </ul>
          </motion.header>

          <div className="warby-persona-profile">
            {[
              ['Objective', profile.objective],
              ['Motivations', profile.motivations],
              ['Friction', profile.dislikes],
            ].map(([label, text], index) => (
              <motion.section
                key={label}
                variants={{
                  fragmented: reduceMotion
                    ? {}
                    : { opacity: 0, x: index === 1 ? 12 : -12, y: 6 },
                  assembled: { opacity: 1, x: 0, y: 0 },
                }}
                transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              >
                <span>0{index + 1} / {label}</span>
                <p>{text}</p>
              </motion.section>
            ))}
          </div>

          <motion.div
            className="warby-journey"
            variants={{
              fragmented: reduceMotion ? {} : { opacity: 0, y: 16, scale: 0.99 },
              assembled: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="warby-journey-heading">
              <p>Journey</p>
              <span>Select a stage to inspect the experience</span>
            </div>
            <div className="warby-journey-tabs" role="tablist" aria-label={`${profile.name} journey`}>
              {profile.journey.map((stage, index) => (
                <button
                  className={activeJourney === index ? 'is-active' : ''}
                  type="button"
                  role="tab"
                  aria-selected={activeJourney === index}
                  aria-controls="warby-journey-detail"
                  onClick={() => setActiveJourney(index)}
                  key={stage.stage}
                >
                  <span>0{index + 1}</span>
                  {stage.stage}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                className="warby-journey-detail"
                id="warby-journey-detail"
                role="tabpanel"
                key={`${profile.id}-${journey.stage}`}
                initial={reduceMotion ? false : { opacity: 0, y: 12, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.32 }}
              >
                <div><span>Action</span><p>{journey.action}</p></div>
                <div><span>Feeling</span><p>{journey.feeling}</p></div>
                <div><span>Channel</span><p>{journey.channel}</p></div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.article>
      </AnimatePresence>
    </div>
  )
}

function WarbyParkerCaseStudy() {
  const reduceMotion = useReducedMotion()

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

      <header className="warby-cinematic-hero">
        <motion.div
          className="warby-cinematic-bg"
          initial={
            reduceMotion
              ? false
              : { opacity: 0.72, scale: 1.15, filter: 'blur(28px) brightness(0.65)' }
          }
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px) brightness(0.65)' }}
          transition={{ duration: 1.8, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <img
            src={assetPath('cinematic-hero.webp')}
            alt="Black eyeglasses illuminated by a cinematic cyan edge light"
          />
          <i aria-hidden="true" />
        </motion.div>
        <div className="warby-cinematic-scrim" aria-hidden="true" />
        <div className="warby-cinematic-vignette" aria-hidden="true" />
        <div className="warby-cinematic-grain" aria-hidden="true" />

        <div className="warby-cinematic-content">
          <motion.p
            className="warby-eyebrow"
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.15 }}
          >
            Campaign design / Brand strategy
          </motion.p>
          <motion.h1
            initial={
              reduceMotion ? false : { opacity: 0, scale: 1.03, filter: 'blur(14px)' }
            }
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.6, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
          >
            Warby
            <br />
            Parker
            <br />
            <em>The Pitch</em>
          </motion.h1>
          <motion.p
            className="warby-cinematic-desc"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.45 }}
          >
            A pitch-style brand and campaign concept built around bold eyewear visuals.
          </motion.p>
          <motion.i
            className="warby-cinematic-rule"
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 2.85, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </header>

      <WarbyOverview />

      <section className="warby-section warby-brand-section case-study-section">
        <SectionHeading
          index="02 / Brand foundation"
          title={<>A clear frame<br />for the brand.</>}
          intro="The strategic foundation balances affordable luxury, expressive design, convenience, and social responsibility."
        />
        <WarbyBrandFoundation />
      </section>

      <WarbyProblemAudience />

      <section className="warby-section case-study-section">
        <SectionHeading
          index="04 / Personas"
          title="Three perspectives, one explorable journey."
          intro="Switch between each persona and move through the decision stages to compare motivations, friction, emotions, and channels."
        />
        <PersonaExplorer />
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
