import heroImg from './assets/hero.png'
import ImageSmearCanvas from './ImageSmearCanvas'
import './App.css'

const imagePath = (filename) => `${import.meta.env.BASE_URL}images/${filename}`

const projects = [
  {
    title: 'Signal Studio',
    category: 'Brand Identity',
    year: '2026',
    image: imagePath('signal-studio.png'),
    description:
      'A sharp, cinematic identity system with focused layouts, quiet motion, and editorial rhythm.',
  },
  {
    title: 'Glitch',
    category: 'Packaging Design',
    year: '2026',
    image: imagePath('glitch-energy.png'),
    description:
      'A high-voltage energy drink identity built from electric color, tactile condensation, and digital noise.',
  },
  {
    title: 'Nocturne Archive',
    category: 'Visual Research',
    year: '2025',
    image: imagePath('nocturne-archive.png'),
    description:
      'A dark, minimal gallery for selected work, designed around atmosphere, pacing, and restraint.',
  },
  {
    title: 'Glass Index',
    category: 'Digital Art Direction',
    year: '2025',
    image: imagePath('glass-index.png'),
    description:
      'A structured digital surface with layered navigation, luminous states, and tactile interactions.',
  },
]

const projectPositions = ['card-left-high', 'card-right-low', 'card-center-offset', 'card-left-low', 'card-right-high']

function ProjectCard({ project, index }) {
  return (
    <article className={`project-card ${projectPositions[index % projectPositions.length]}`}>
      <div className="project-image">
        <ImageSmearCanvas sourceImage={project.image} />
        <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="project-copy">
        <div className="project-meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </article>
  )
}

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

        <div className="projects-layout">
          {projects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.title} />
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
