import ImageSmearCanvas from './ImageSmearCanvas'
import './App.css'

const imagePath = (filename) => `${import.meta.env.BASE_URL}images/${filename}`

const projects = [
  {
    title: 'Bloom',
    number: '01',
    category: 'Product Design — UX/UI',
    image: imagePath('bloom.png'),
    aspectRatio: '1122 / 1402',
  },
  {
    title: 'Glitch',
    number: '02',
    category: 'Packaging Design — Visual System',
    image: imagePath('glitch-energy.png'),
    aspectRatio: '1122 / 1402',
  },
  {
    title: 'Naturecycle',
    number: '03',
    category: 'Product Design — Sustainable Beauty',
    image: imagePath('naturecycle.png'),
    aspectRatio: '1491 / 1055',
  },
  {
    title: 'Warby Parker',
    number: '04',
    category: 'Campaign Design — Art Direction',
    image: imagePath('warby-parker.png'),
    aspectRatio: '1672 / 941',
  },
]

function ProjectCard({ project, index }) {
  return (
    <article className={`project-card project-card-${index + 1}`}>
      <div className="project-image-wrap" style={{ aspectRatio: project.aspectRatio }}>
        <ImageSmearCanvas
          sourceImage={project.image}
          imageFit="contain"
          gridDensity={12}
          smearStrength={1.15}
          returnSpeed={0.045}
          trailLength={0.92}
          interactionRadius={220}
          colorMode="original"
        />
      </div>
      <div className="project-info">
        <div className="project-meta">
          <span>Project /{project.number}</span>
          <span>{project.category}</span>
        </div>
        <div className="project-title-row">
          <h3>{project.title}</h3>
          <span className="project-arrow" aria-hidden="true">
            →
          </span>
        </div>
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
        <div className="hero-meta" aria-label="Designer details">
          <span>Independent designer</span>
          <span>Based in Canada</span>
          <p>
            Digital designer crafting identities, interfaces, and visual systems with clarity,
            atmosphere, and a cinematic edge.
          </p>
        </div>

        <h1 className="hero-title">
          <span>Parisa Mohri</span>
          <strong>Digital Designer</strong>
        </h1>

        <div className="hero-baseline">
          <span>Selected work / 2026</span>
          <div className="hero-socials" aria-label="Social profiles">
            <a href="#contact">Behance</a>
            <a href="#contact">LinkedIn</a>
            <a href="#contact">Instagram</a>
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

      <footer className="contact-section" id="contact" aria-label="Contact">
        <div className="contact-main">
          <div className="contact-message">
            <h2>Let’s create something great together.</h2>
            <p>Based in Canada — working worldwide</p>
          </div>
          <div className="contact-cta">
            <a className="email-link" href="mailto:hello@parisamohri.com">
              <span aria-hidden="true">→</span> Send me an email
            </a>
            <p>Open for selected collaborations</p>
          </div>
        </div>

        <div className="footer-bottom">
          <a className="footer-mark" href="#home" aria-label="Back to top">
            PM
          </a>
          <nav className="footer-socials" aria-label="Footer links">
            <a href="#work">Work</a>
            <a href="#profile">Profile</a>
            <a href="mailto:hello@parisamohri.com">Email</a>
          </nav>
          <p>© 2026 Parisa Mohri</p>
        </div>
      </footer>
    </main>
  )
}

export default App
