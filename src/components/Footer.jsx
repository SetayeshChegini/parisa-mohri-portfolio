import { useEffect, useState } from 'react'

const formatTorontoTime = () =>
  new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Toronto',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date())

const footerLinks = ['Dribbble', 'Behance', 'LinkedIn', 'X']

function Footer() {
  const [localTime, setLocalTime] = useState(formatTorontoTime)

  useEffect(() => {
    const interval = window.setInterval(() => setLocalTime(formatTorontoTime()), 60_000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <footer className="contact-section" id="contact" aria-label="Contact">
      <div className="footer-main">
        <div className="footer-message">
          <h2>
            Let’s create
            <br />
            something great
            <br />
            together.
          </h2>
        </div>

        <div className="footer-cta">
          <a className="email-link" href="mailto:Parisa@mohri.org">
            <span aria-hidden="true">→</span>
            <span className="glitch-hover" data-text="SEND ME AN EMAIL">
              Send me an email
            </span>
          </a>
          <p className="local-time">
            Local time <span aria-hidden="true">▸</span> <strong>{localTime}</strong>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <a
          className="footer-mark glitch-hover"
          href="#home"
          aria-label="Back to top"
          data-text="PM"
        >
          PM
        </a>

        <nav className="footer-socials" aria-label="Footer social links">
          {footerLinks.map((link) => (
            <a className="glitch-hover" href="#home" data-text={link} key={link}>
              {link}
            </a>
          ))}
        </nav>

        <div className="footer-credit">
          <p>© 2026 Parisa Mohri</p>
          <p>Made with ♥ by Parisa Mohri.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
