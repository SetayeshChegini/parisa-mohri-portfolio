import GridDistortion from './components/GridDistortion'
import Preloader from './components/Preloader'
import About from './components/About'
import Skills from './components/Skills'
import Footer from './components/Footer'
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
    image: imagePath('glitch-horizontal.png'),
    aspectRatio: '1122 / 1402',
  },
  {
    title: 'Naturecycle',
    number: '03',
    category: 'Product Design — Sustainable Beauty',
    image: imagePath('naturecycle.png'),
    aspectRatio: '1491 / 1055',
    imageFit: 'cover',
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
      <div className="project-image-wrap">
        <GridDistortion
          mediaType="image"
          image={{ src: project.image, alt: project.title }}
          imageFit={project.imageFit ?? 'contain'}
          grid={16}
          mouse={0.12}
          strength={0.15}
          relaxation={0.9}
          hoverMultiplier={1.5}
          background="transparent"
          dprCap={2}
          className="project-card-media"
        />
      </div>
      <div className="project-info">
        <div className="project-meta">
          <span>Project /{project.number}</span>
          <span>{project.category}</span>
        </div>
        <div className="project-title-row">
          <h3 className="glitch-hover" data-text={project.title}>
            {project.title}
          </h3>
          <span className="project-arrow" aria-hidden="true">
            →
          </span>
        </div>
      </div>
    </article>
  )
}

function App() {
  return (
    <>
      <Preloader />
      <main className="site-shell">
      <nav className="topbar" aria-label="Primary navigation">
        <a
          className="nav-name glitch-hover"
          href="#home"
          aria-label="Parisa Mohri home"
          data-text="— PARISA MOHRI"
        >
          — Parisa Mohri
        </a>
        <a
          className="nav-mark glitch-hover"
          href="#home"
          aria-label="Back to top"
          data-text="PM"
        >
          PM
        </a>
        <div className="nav-links">
          <a className="glitch-hover" href="#work" data-text="Work">
            Work
          </a>
          <a className="glitch-hover" href="#profile" data-text="Profile">
            Profile
          </a>
          <a className="glitch-hover" href="#contact" data-text="Contact">
            Contact
          </a>
          <a
            className="nav-email glitch-hover"
            href="mailto:Parisa@mohri.org"
            data-text="Email me"
          >
            Email me
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
            <a className="glitch-hover" href="#contact" data-text="Behance">
              Behance
            </a>
            <a className="glitch-hover" href="#contact" data-text="LinkedIn">
              LinkedIn
            </a>
            <a
              className="glitch-hover"
              href="https://www.instagram.com/paris_azhdehfar/"
              data-text="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>

      <About image={imagePath('parisa-about.png')} />
      <Skills />

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

      <Footer />
      </main>
    </>
  )
}

export default App
