import PolaroidFlipCard from './PolaroidFlipCard'

const aboutText =
  'Parisa Mohri is a creative storyteller working across design, motion, voice, and sound. She builds experiences with emotion and intention, turning ideas into visual identities, animated moments, and immersive digital systems.'

function About({ image }) {
  return (
    <section className="about-section" id="profile" aria-labelledby="about-title">
      <p className="section-label" id="about-title">
        About <span aria-hidden="true">&gt;</span>
      </p>

      <div className="about-image-wrap">
        <PolaroidFlipCard
          image={image}
          caption="Parisa Mohri"
          backNote={aboutText}
          frameColor="#f2f2f0"
          captionColor="#151515"
          noteColor="#151515"
          framePadding={12}
          bottomPadding={58}
          radius={3}
          shadowStrength={0.28}
          tiltStrength={12}
        />
      </div>

      <div className="about-copy">
        <p>{aboutText}</p>
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
