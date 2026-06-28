const skillLines = [
  'UI/UX — Mobile & Web Design — Branding',
  'Graphic Design — Art Direction.',
]

function Skills() {
  return (
    <section className="skills-section" aria-labelledby="skills-title">
      <p className="section-label" id="skills-title">
        Skills <span aria-hidden="true">&gt;</span>
      </p>
      <div className="skills-list">
        {skillLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </section>
  )
}

export default Skills
