import { Link } from 'react-router-dom'
import './Home.css'

/* Put your image paths in `src` (e.g. '/work/lion.jpg').
   Leave it as '' to show the placeholder. */
const WORK = [
  { label: 'Black & Grey', src: '', className: 'tile-large' },
  { label: 'Fine Line',    src: '' },
  { label: 'Black Work',   src: '' },
  { label: 'Sleeve',       src: '' },
  { label: 'Detail',       src: '' },
]

export default function Home() {
  return (
    <>
      <section className="home">
        <div className="home-bg" aria-hidden="true" />

        <div className="home-content">
          <h1>
            Stillness.<br />
            Precision.<br />
            <em>Expression.</em>
          </h1>

          <div className="home-stats">
            <span><b>5.0</b> Google rating</span>
            <span><b>13+</b> Years tattooing</span>
            <span><b>100%</b> Custom work</span>
          </div>

          <div className="home-cta">
            <Link to="/book" className="btn solid">Book a session →</Link>
            <Link to="/tattoos" className="btn">View the work</Link>
          </div>

          <div className="home-scroll"><span /> Scroll</div>
        </div>

        <div className="home-side">Nyobiese Studios · Sanctuary 01 · Nairobi</div>

        <a
          className="home-whatsapp"
          href="https://wa.me/254700000000"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.300c.2-.3.5-.3.700-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.600.2.3.8 1.300 1.700 2.100 1.100 1 2.100 1.300 2.400 1.400.3.1.5.1.6-.1l.9-1.100c.2-.2.4-.2.600-.1l1.900.9c.2.1.4.2.5.3.1.3.1.8-.1 1.400z"/>
          </svg>
        </a>
      </section>

      <section className="work">
        <div className="work-head">
          <h2>The work.</h2>
          <Link to="/gallery" className="work-link">Full gallery →</Link>
        </div>

        <div className="work-grid">
          {WORK.map(w => (
            <figure key={w.label} className={`work-tile ${w.className || ''}`}>
              {w.src ? (
                <img src={w.src} alt={`${w.label} tattoo`} />
              ) : (
                <div className="work-placeholder">Image placeholder</div>
              )}
              <figcaption>{w.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  )
}
