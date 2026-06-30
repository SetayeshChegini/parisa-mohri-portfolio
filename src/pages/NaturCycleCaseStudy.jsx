import { Link } from 'react-router-dom'
import './NaturCycleCaseStudy.css'
import './CaseStudy.css'

const imagePath = (filename) => `${import.meta.env.BASE_URL}images/${filename}`
const studyAsset = (filename) =>
  imagePath(`naturcycle-case-study/${filename}`)

const prototypeUrl =
  'https://www.figma.com/proto/FXbIEnnFnmz5SqeC9OPvQY/Skin-care-app-(Community)?page-id=2%3A534'

const flowSteps = [
  'Splash',
  'Login / Signup',
  'Home',
  'Products',
  'Product details',
  'Sustainability Hub',
  'Community',
  'Cart',
  'Checkout',
  'Order tracking',
]

const process = [
  {
    title: 'Speed sketches',
    image: 'sketches.webp',
    text: 'Eight rapid layouts tested hierarchy before any interface detail was added.',
    change: 'Broad exploration reduced attachment to the first idea.',
  },
  {
    title: 'A/B testing',
    image: 'ab-testing.webp',
    text: 'Two directions were compared for clarity, content depth, and navigation.',
    change: 'Feedback led to stronger search, menu, and page structure.',
  },
  {
    title: 'Refined wireframes',
    image: 'wireframes.webp',
    text: 'The selected structure was translated into the core shopping and community flows.',
    change: 'Repeated patterns made the experience easier to learn.',
  },
  {
    title: 'Mid-fidelity',
    image: 'midfi-one.webp',
    text: 'Screen relationships, content density, and task order were validated before polish.',
    change: 'The system became simpler, calmer, and more consistent.',
  },
]

const finalScreens = [
  ['login.webp', 'Login'],
  ['signup.webp', 'Sign up'],
  ['home.webp', 'Home'],
  ['products.webp', 'Products'],
  ['details.webp', 'Product details'],
  ['checkout.webp', 'Checkout'],
  ['sustainability.webp', 'Sustainability'],
  ['account.webp', 'My account'],
]

function SectionHeading({ index, title, intro }) {
  return (
    <div className="nc-section-heading case-study-heading">
      <p className="case-study-index">{index}</p>
      <div>
        <h2>{title}</h2>
        {intro && <p className="nc-section-intro case-study-intro">{intro}</p>}
      </div>
    </div>
  )
}

function NaturCycleCaseStudy() {
  return (
    <main className="nc-page case-study-page">
      <nav className="nc-nav case-study-nav" aria-label="Case study navigation">
        <Link to="/">← Back to projects</Link>
        <span>Parisa Mohri / UX case study</span>
      </nav>

      <header className="nc-hero case-study-hero">
        <div className="nc-hero-copy case-study-hero-copy">
          <p className="nc-eyebrow">Sustainable Beauty Mobile App</p>
          <h1>NaturCycle</h1>
          <p className="nc-summary">
            A mobile experience that makes sustainable beauty choices clearer through product
            transparency, skin analysis, recycling, education, and community.
          </p>
        </div>

        <figure className="nc-hero-media case-study-hero-media">
          <img src={imagePath('naturecycle.png')} alt="NaturCycle mobile app mockup" />
        </figure>

        <dl className="nc-meta">
          <div>
            <dt>Role</dt>
            <dd>UX/UI Designer<br />UX/UI Researcher</dd>
          </div>
          <div>
            <dt>Tools</dt>
            <dd>Figma<br />Research<br />Wireframing<br />Prototyping</dd>
          </div>
          <div>
            <dt>Methods</dt>
            <dd>User interviews<br />Comparative research<br />A/B testing<br />Usability thinking</dd>
          </div>
        </dl>
      </header>

      <section className="nc-section nc-overview case-study-section">
        <SectionHeading
          index="01 / Overview"
          title="Sustainable choices without the extra work."
          intro="NaturCycle brings shopping, education, recycling, and community into one calm mobile experience."
        />
        <div className="nc-overview-grid">
          <p>
            Users can understand what a product contains, see its environmental impact, receive
            personalized skin guidance, and discover practical ways to recycle or reduce waste.
          </p>
          <ul>
            <li>Transparent product information</li>
            <li>Personalized skin analysis</li>
            <li>Recycling programs and impact reports</li>
            <li>Education and community knowledge</li>
          </ul>
        </div>
      </section>

      <section className="nc-section nc-problem case-study-section">
        <p className="nc-index">02 / Problem</p>
        <blockquote>
          “How might we make sustainable beauty easier, clearer, and more engaging through a
          mobile app?”
        </blockquote>
        <div className="nc-problem-points">
          <p>Information is fragmented and difficult to compare.</p>
          <p>Eco-friendly claims often lack useful product detail.</p>
          <p>Recycling programs feel separate from shopping.</p>
          <p>Users need guidance without information overload.</p>
        </div>
      </section>

      <section className="nc-section case-study-section">
        <SectionHeading index="03 / Goals" title="Align customer value with responsible growth." />
        <div className="nc-goal-grid">
          <article>
            <p>Business / Client goal</p>
            <h3>Bridge sustainable beauty and customer convenience.</h3>
            <span>
              Build trust through transparency while supporting discovery, loyalty, and responsible
              purchasing.
            </span>
          </article>
          <article>
            <p>User / Design goal</p>
            <h3>Make responsible decisions feel simple and personal.</h3>
            <span>
              Combine clear product details, skin guidance, recycling, and community in one
              approachable system.
            </span>
          </article>
        </div>
      </section>

      <section className="nc-section case-study-section">
        <SectionHeading
          index="04 / Research"
          title="The opportunity was not another beauty shop."
          intro="Competitor research showed space for a service that connects sustainability, transparent information, recycling, and personalization."
        />
        <div className="nc-research-layout">
          <div className="nc-competitors">
            {['ELATE', 'The Body Shop', 'The Ordinary', 'LUSH'].map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
          <figure className="nc-research-image">
            <img src={studyAsset('comparison.webp')} alt="NaturCycle comparative research matrix" />
          </figure>
        </div>
        <div className="nc-insight">
          <p>Key insight</p>
          <strong>
            Sustainability becomes more useful when it appears inside everyday product decisions,
            not on a separate information page.
          </strong>
        </div>
      </section>

      <section className="nc-section case-study-section">
        <SectionHeading
          index="05 / Personas"
          title="Different routines, shared values."
          intro="Two focused personas kept the experience grounded in practical needs rather than abstract sustainability claims."
        />
        <div className="nc-persona-grid">
          <article>
            <p className="nc-persona-type">Primary persona</p>
            <h3>Lilith Norma</h3>
            <p className="nc-persona-summary">Eco-conscious design consultant, 24, North York.</p>
            <dl>
              <div><dt>Goal</dt><dd>Find cruelty-free products aligned with her values.</dd></div>
              <div><dt>Frustration</dt><dd>Vague claims and time-consuming product research.</dd></div>
              <div><dt>NaturCycle helps</dt><dd>Compare ingredients, impact, and recycling options quickly.</dd></div>
            </dl>
          </article>
          <article>
            <p className="nc-persona-type">Secondary persona</p>
            <h3>Alex Turner</h3>
            <p className="nc-persona-summary">Fitness trainer interested in wellness and responsible choices.</p>
            <dl>
              <div><dt>Goal</dt><dd>Connect personal care with whole-body wellness.</dd></div>
              <div><dt>Frustration</dt><dd>Does not know where to begin with sustainable beauty.</dd></div>
              <div><dt>NaturCycle helps</dt><dd>Receive guidance and build a manageable routine.</dd></div>
            </dl>
          </article>
        </div>
      </section>

      <section className="nc-section case-study-section">
        <SectionHeading
          index="06 / User flow"
          title="A clear path from discovery to delivery."
          intro="The flow keeps education and community close to commerce without interrupting the primary task."
        />
        <div className="nc-flow" aria-label="NaturCycle user flow">
          {flowSteps.map((step, index) => (
            <div key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="nc-section case-study-section">
        <SectionHeading
          index="07 / Wireframes"
          title="Explore quickly, test early, refine with purpose."
          intro="The process moved from broad layout exploration to a consistent screen system."
        />
        <div className="nc-process-grid">
          {process.map((item) => (
            <article key={item.title}>
              <figure>
                <img src={studyAsset(item.image)} alt={`NaturCycle ${item.title}`} loading="lazy" />
              </figure>
              <p className="nc-process-number">{item.title}</p>
              <h3>{item.text}</h3>
              <span>{item.change}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="nc-section nc-final case-study-section">
        <SectionHeading
          index="08 / Final screens"
          title="A calm interface for informed beauty choices."
          intro="The final direction balances editorial beauty imagery with practical information and predictable mobile patterns."
        />
        <div className="nc-screen-grid">
          {finalScreens.map(([file, label]) => (
            <figure key={file}>
              <div>
                <img
                  src={studyAsset(`screens/${file}`)}
                  alt={`NaturCycle ${label} screen`}
                  loading="lazy"
                />
              </div>
              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="nc-section nc-reflection case-study-section">
        <SectionHeading index="09 / Reflection" title="Sustainability works best when it feels actionable." />
        <div className="nc-reflection-copy">
          <p>
            This project reinforced that innovation only matters when people can understand and
            use it. Skin analysis and virtual try-ons add personalization; recycling programs and
            education turn environmental intent into repeatable action.
          </p>
          <p>
            I learned to reduce a broad mission into focused decisions: clearer information,
            shorter flows, consistent patterns, and features that support both the user and the
            planet.
          </p>
        </div>
      </section>

      <section className="nc-cta case-study-cta">
        <p>Explore the interaction or return to the portfolio.</p>
        <div>
          <a href={prototypeUrl} target="_blank" rel="noreferrer">View prototype ↗</a>
          <Link to="/">Back to projects</Link>
        </div>
      </section>

      <footer className="nc-footer case-study-footer">
        <span>NaturCycle / UX case study</span>
        <span>© 2026 Parisa Mohri</span>
      </footer>
    </main>
  )
}

export default NaturCycleCaseStudy
