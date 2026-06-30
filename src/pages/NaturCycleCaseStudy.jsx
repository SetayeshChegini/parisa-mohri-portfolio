import { Link } from 'react-router-dom'
import './NaturCycleCaseStudy.css'

const asset = (filename) =>
  `${import.meta.env.BASE_URL}images/naturcycle-case-study/${filename}`

const prototypeUrl =
  'https://www.figma.com/proto/FXbIEnnFnmz5SqeC9OPvQY/Skin-care-app-(Community)?page-id=2%3A534'

function StudyImage({ file, alt, className = '' }) {
  return (
    <figure className={`nc-visual ${className}`}>
      <img src={asset(file)} alt={alt} loading="lazy" />
    </figure>
  )
}

function NaturCycleCaseStudy() {
  return (
    <main className="nc-page">
      <nav className="nc-nav" aria-label="Case study navigation">
        <Link to="/" className="nc-back">
          ← Back to work
        </Link>
        <span>Parisa Mohri / Case study 03</span>
      </nav>

      <header className="nc-hero">
        <div className="nc-hero-copy">
          <p className="nc-kicker">Sustainable beauty mobile app / 2026</p>
          <h1>NaturCycle</h1>
          <p className="nc-intro">
            A mobile app concept that helps people make eco-conscious beauty choices through
            product transparency, sustainability education, recycling programs, community,
            skin analysis, and sample ordering.
          </p>
        </div>
        <StudyImage file="cover.webp" alt="NaturCycle brand and sustainable product system" />
        <div className="nc-facts">
          <div>
            <span>Role</span>
            <p>UX/UI Designer<br />UX/UI Researcher</p>
          </div>
          <div>
            <span>Methods</span>
            <p>User interviews<br />Wireframing<br />Usability testing<br />Prototyping</p>
          </div>
          <div>
            <span>Focus</span>
            <p>Sustainable commerce<br />Community<br />Product transparency</p>
          </div>
        </div>
      </header>

      <section className="nc-section nc-overview">
        <p className="nc-label">01 / Overview</p>
        <div className="nc-section-copy">
          <h2>Beauty, convenience, and environmental responsibility in one system.</h2>
          <p>
            NaturCycle combines sustainable beauty with everyday convenience. The app gives
            users practical ways to learn, shop, recycle, and participate in a community without
            turning sustainability into extra work.
          </p>
        </div>
        <ul className="nc-feature-list">
          <li>Sustainability Hub</li>
          <li>DIY tips from users</li>
          <li>Sample ordering</li>
          <li>Skin analysis</li>
          <li>Recycling programs</li>
          <li>Product transparency</li>
          <li>Community features</li>
        </ul>
      </section>

      <section className="nc-section nc-problem">
        <p className="nc-label">02 / Problem</p>
        <blockquote>
          “How might we adopt sustainable practices in the cosmetic industry through a mobile
          app?”
        </blockquote>
        <div className="nc-columns">
          <p>
            Sustainable beauty information is often fragmented, difficult to compare, and
            disconnected from the moment a person chooses a product.
          </p>
          <ul>
            <li>Make sustainability easier to understand</li>
            <li>Surface transparent eco-friendly products</li>
            <li>Create accessible recycling programs</li>
            <li>Raise awareness through useful education</li>
            <li>Build an active, credible community</li>
          </ul>
        </div>
      </section>

      <section className="nc-section nc-goals">
        <p className="nc-label">03 / Goals</p>
        <div className="nc-goal-grid">
          <article>
            <span>Client goal</span>
            <h3>Bridge sustainable beauty and customer convenience.</h3>
          </article>
          <article>
            <span>Design goal</span>
            <h3>Create a stylish, minimal app that makes responsible choices feel effortless.</h3>
          </article>
        </div>
      </section>

      <section className="nc-section">
        <p className="nc-label">04 / Brand direction</p>
        <div className="nc-section-copy">
          <h2>A soft, earthy identity built around continuity and care.</h2>
          <p>
            Clean typography and restrained organic tones give NaturCycle an elegant beauty
            presence while keeping the environmental mission visible.
          </p>
        </div>
        <div className="nc-palette" aria-label="NaturCycle color palette">
          <span style={{ '--swatch': '#D2B9C8' }}>#D2B9C8</span>
          <span style={{ '--swatch': '#54BF97' }}>#54BF97</span>
          <span style={{ '--swatch': '#7D918A' }}>#7D918A</span>
          <span style={{ '--swatch': '#E3DAD4' }}>#E3DAD4</span>
        </div>
        <StudyImage file="brand.webp" alt="NaturCycle logo system and visual identity" />
      </section>

      <section className="nc-section">
        <p className="nc-label">05 / Research</p>
        <div className="nc-section-copy">
          <h2>Comparative research revealed where transparency could become a service.</h2>
          <p>
            ELATE, The Body Shop, The Ordinary, and LUSH were reviewed across product variety,
            packaging, loyalty, support, personalization, and sustainability. The opportunity was
            to combine eco-friendly products with skin analysis, recyclable packaging, clear
            impact information, and personalized services.
          </p>
        </div>
        <div className="nc-visual-grid">
          <StudyImage file="research.webp" alt="NaturCycle comparative research board" />
          <StudyImage file="comparison.webp" alt="Competitor comparison matrix" />
        </div>
      </section>

      <section className="nc-section">
        <p className="nc-label">06 / Personas</p>
        <div className="nc-persona-intro">
          <h2>Two perspectives, one shared desire to make healthier choices.</h2>
        </div>
        <div className="nc-personas">
          <article>
            <StudyImage file="persona-lilith.webp" alt="Lilith Norma user persona" />
            <div>
              <span>Primary persona / 24 / North York</span>
              <h3>Lilith Norma</h3>
              <p>
                A design consultant who prioritizes cruelty-free, sustainable products and wants
                beauty choices that genuinely match her values.
              </p>
            </div>
          </article>
          <article>
            <StudyImage file="persona-alex.webp" alt="Alex Turner user persona" />
            <div>
              <span>Secondary persona / 28 / Fitness trainer</span>
              <h3>Alex Turner</h3>
              <p>
                Health and wellness focused, Alex wants products that support both personal care
                and the planet without adding friction to his routine.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="nc-section">
        <p className="nc-label">07 / Journey and flow</p>
        <div className="nc-section-copy">
          <h2>From discovery to delivery, with sustainability present at every step.</h2>
          <p>
            The journey covers onboarding, browsing, product details, the Sustainability Hub,
            community, cart, checkout, confirmation, and order tracking. Testing helped simplify
            decision points and refine the validated flow.
          </p>
        </div>
        <StudyImage file="validated-flow.webp" alt="Validated NaturCycle user flow" />
        <StudyImage file="journey-map.webp" alt="NaturCycle user journey map" />
      </section>

      <section className="nc-section">
        <p className="nc-label">08 / Information architecture</p>
        <div className="nc-split">
          <div>
            <h2>A clear structure for shopping, learning, and participating.</h2>
            <p>
              The architecture connects Products, Favorites, Account, Cart, Community, and
              Sustainability with deeper paths for recycling, impact reports, green beauty guides,
              DIY tips, customer stories, and discussion.
            </p>
          </div>
          <StudyImage file="sitemap.webp" alt="NaturCycle information architecture sitemap" />
        </div>
      </section>

      <section className="nc-section">
        <p className="nc-label">09 / Sketches and testing</p>
        <div className="nc-section-copy">
          <h2>Fast exploration before committing to interface detail.</h2>
          <p>
            Eight-minute speed sketches explored landing-page structures. A/B testing identified
            the stronger direction, and the selected approach was refined around simplicity,
            usability, and sustainable storytelling.
          </p>
        </div>
        <div className="nc-visual-grid">
          <StudyImage file="sketches.webp" alt="NaturCycle speed sketches" />
          <StudyImage file="ab-testing.webp" alt="NaturCycle A/B testing results" />
        </div>
        <StudyImage file="wireframes.webp" alt="NaturCycle wireframe sketches" />
      </section>

      <section className="nc-section nc-midfi">
        <p className="nc-label">10 / Mid-fidelity wireframes</p>
        <div className="nc-section-copy">
          <h2>The core experience, mapped screen by screen.</h2>
          <p>
            Login, signup, home, products, product details, checkout, sustainability, and account
            screens established the app’s hierarchy before visual polish.
          </p>
        </div>
        <StudyImage file="midfi-one.webp" alt="NaturCycle mid-fidelity wireframes, set one" />
        <StudyImage file="midfi-two.webp" alt="NaturCycle mid-fidelity wireframes, set two" />
      </section>

      <section className="nc-section nc-reflection">
        <p className="nc-label">11 / Reflection</p>
        <div>
          <h2>Sustainability becomes useful when it is designed into the experience.</h2>
          <p>
            NaturCycle shows how innovation and environmental responsibility can work together in
            beauty. Skin analysis, virtual try-ons, recycling programs, product transparency, and
            education turn sustainability from a claim into practical value.
          </p>
          <a href={prototypeUrl} target="_blank" rel="noreferrer" className="nc-prototype">
            View prototype ↗
          </a>
        </div>
        <StudyImage file="reflection.webp" alt="NaturCycle final app screen and reflection" />
      </section>

      <footer className="nc-footer">
        <Link to="/">← Back to selected work</Link>
        <span>© 2026 Parisa Mohri</span>
      </footer>
    </main>
  )
}

export default NaturCycleCaseStudy
