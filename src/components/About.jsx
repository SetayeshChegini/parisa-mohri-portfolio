import PolaroidFlipCard from './PolaroidFlipCard'

const aboutText = `I’m a creative storyteller working across design, motion, voice, and sound. I create visual identities, animated moments, and digital experiences that feel intentional, emotional, and immersive.

My work is driven by feeling, detail, and the way design can turn simple ideas into memorable experiences.`

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
    </section>
  )
}

export default About
