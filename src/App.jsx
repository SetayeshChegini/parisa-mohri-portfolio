import heroImg from './assets/hero.png'
import './App.css'

const projects = [
  {
    title: 'Signal studio',
    meta: 'Brand system / Web direction',
    description:
      'A sharp, cinematic identity system with focused layouts, quiet motion, and editorial rhythm.',
  },
  {
    title: 'Nocturne archive',
    meta: 'Portfolio / Visual research',
    description:
      'A dark, minimal gallery for selected work, designed around atmosphere, pacing, and restraint.',
  },
  {
    title: 'Glass index',
    meta: 'Interface / Art direction',
    description:
      'A structured digital surface with layered navigation, luminous states, and tactile interactions.',
  },
]

const skills = ['Art direction', 'Visual identity', 'Digital design', 'Interaction', 'Layout systems']

function App() {
  const handlePointerMove = (event) => {
    const x = `${Math.round((event.clientX / window.innerWidth) * 100)}%`
    const y = `${Math.round((event.clientY / window.innerHeight) * 100)}%`

    event.currentTarget.style.setProperty('--pointer-x', x)
    event.currentTarget.style.setProperty('--pointer-y', y)
  }

  return (
    <main className="site-shell" onPointerMove={handlePointerMove}>
      <div className="smoke smoke-a" aria-hidden="true"></div>
      <div className="smoke smoke-b" aria-hidden="true"></div>

      <nav className="topbar" aria-label="Primary navigation">
        <a className="brand halo-link" href="#home" aria-label="Parisa Mohri home">
          PM
        </a>
        <div className="nav-links">
          <a className="halo-link" href="#work">
            Work
          </a>
          <a className="halo-link" href="#profile">
            Profile
          </a>
          <a className="halo-link" href="#contact">
            Contact
          </a>
        </div>
      </nav>

      <section className="hero-section" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Portfolio / Visual designer</p>
          <h1>Parisa Mohri</h1>
          <p className="lead">
            Minimal digital worlds for brands, portfolios, and visual systems that need mood,
            clarity, and a little voltage in the dark.
          </p>
          <div className="hero-actions" aria-label="Portfolio actions">
            <a className="primary-action halo-link" href="#work">
              View work
            </a>
            <a className="secondary-action halo-link" href="#contact">
              Start a project
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Abstract smoky portfolio mark">
          <div className="orbital orbital-one"></div>
          <div className="orbital orbital-two"></div>
          <img src={heroImg} alt="" />
          <div className="visual-caption">
            <span>Selected direction</span>
            <strong>2026</strong>
          </div>
        </div>
      </section>

      <section className="profile-strip" id="profile" aria-label="Design approach">
        <p>
          Immersive does not need to be loud. The work here is built with tension, negative
          space, precise typography, and interactions that feel like light passing through smoke.
        </p>
        <div className="skill-cloud" aria-label="Capabilities">
          {skills.map((skill) => (
            <span className="skill-pill" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2>Quiet interfaces with a cinematic edge.</h2>
        </div>

        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project-card halo-card" key={project.title}>
              <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <p className="project-meta">{project.meta}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact" aria-label="Contact">
        <div>
          <p className="eyebrow">Open for selected work</p>
          <h2>Let the next piece feel sharper, darker, and more alive.</h2>
        </div>
        <a className="contact-action halo-link" href="#home">
          Begin
        </a>
      </section>
    </main>
  )
}

export default App
