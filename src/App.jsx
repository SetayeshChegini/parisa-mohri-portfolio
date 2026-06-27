import { useEffect, useRef, useState } from 'react'
import heroImg from './assets/hero.png'
import ImageSmearCanvas from './ImageSmearCanvas'
import './App.css'

const imagePath = (filename) => `${import.meta.env.BASE_URL}images/${filename}`

const projects = [
  {
    title: 'Bloom',
    number: '01',
    category: 'Product Design — UX/UI',
    image: imagePath('bloom.png'),
  },
  {
    title: 'Glitch',
    number: '02',
    category: 'Packaging Design — Visual System',
    image: imagePath('glitch-energy.png'),
  },
  {
    title: 'Naturecycle',
    number: '03',
    category: 'Product Design — Sustainable Beauty',
    image: imagePath('naturecycle.png'),
  },
  {
    title: 'Glass Index',
    number: '04',
    category: 'Web Design — Art Direction',
    image: imagePath('glass-index.png'),
  },
  {
    title: 'Afterimage',
    number: '05',
    category: 'Design System — Creative Direction',
    image: imagePath('afterimage.png'),
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [scrollAssembly, setScrollAssembly] = useState(0)

  useEffect(() => {
    let frameId = 0

    const updateAssembly = () => {
      frameId = 0
      const card = cardRef.current
      if (!card) return

      const bounds = card.getBoundingClientRect()
      const start = window.innerHeight * 1.02
      const finish = window.innerHeight * 0.58
      const progress = Math.min(1, Math.max(0, (start - bounds.top) / (start - finish)))
      setScrollAssembly((current) => (Math.abs(current - progress) > 0.005 ? progress : current))
    }

    const requestUpdate = () => {
      if (!frameId) frameId = requestAnimationFrame(updateAssembly)
    }

    updateAssembly()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  return (
    <article ref={cardRef} className={`project-card project-card-${index + 1}`}>
      <div className="project-image-wrap">
        <ImageSmearCanvas
          sourceImage={project.image}
          imageFit="contain"
          scrollAssembly={scrollAssembly}
          gridDensity={30}
          smearStrength={1.5}
          returnSpeed={0.07}
          trailLength={0.8}
          interactionRadius={120}
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
