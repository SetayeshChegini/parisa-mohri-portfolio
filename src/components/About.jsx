import GridDistortion from './GridDistortion'

function About({ image }) {
  return (
    <section className="about-section" id="profile" aria-labelledby="about-title">
      <p className="section-label" id="about-title">
        About <span aria-hidden="true">&gt;</span>
      </p>

      <div className="about-image-wrap">
        <GridDistortion
          mediaType="image"
          image={{ src: image, alt: 'Parisa Mohri' }}
          grid={16}
          mouse={0.12}
          strength={0.15}
          relaxation={0.9}
          hoverMultiplier={1.5}
          background="transparent"
          dprCap={2}
          className="about-image-media"
        />
      </div>

      <div className="about-copy">
        <p>
          Parisa Mohri is a creative storyteller working across design, motion, voice, and sound.
          She builds experiences with emotion and intention, turning ideas into visual identities,
          animated moments, and immersive digital systems.
        </p>
        <div className="about-contact">
          <a
            className="glitch-hover"
            href="mailto:Parisa@mohri.org"
            data-text="Email: Parisa@mohri.org"
          >
            Email: Parisa@mohri.org
          </a>
          <span aria-hidden="true">|</span>
          <span className="glitch-hover" data-text="Toronto, ON">
            Toronto, ON
          </span>
        </div>
      </div>
    </section>
  )
}

export default About
