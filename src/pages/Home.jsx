import { Link } from 'react-router-dom'
import './Home.css'
import useSiteImages from '../lib/useSiteImages'

/* Images are now managed from the admin page (Site images).
   `slot` ties each spot to its upload; `src` is an optional fallback
   used only when nothing has been uploaded for that slot. */
const WORK = [
  { label: 'Black & Grey', slot: 'home-work-1', src: '', className: 'tile-large' },
  { label: 'Fine Line',    slot: 'home-work-2', src: '' },
  { label: 'Black Work',   slot: 'home-work-3', src: '' },
  { label: 'Sleeve',       slot: 'home-work-4', src: '' },
  { label: 'Detail',       slot: 'home-work-5', src: '' },
]

const SERVICES = [
  { n: '01', title: 'Fine Line & Lettering', desc: 'Delicate linework, botanical detail and hand-drawn lettering', meta: 'From 2 hrs', to: '/tattoos/fine-line' },
  { n: '02', title: 'Realism', desc: 'Lifelike depth, rendered in ink', meta: 'Half-day sessions', to: '/tattoos/realism' },
  { n: '03', title: 'Blackwork & Geometric', desc: 'Bold, graphic, with an unmistakable presence', meta: 'Custom scale', to: '/tattoos/blackwork' },
  { n: '04', title: 'Colour Tattoos', desc: 'Rich, long-lasting colour applied with care and intention', meta: 'Multi-session', to: '/tattoos/colour', wide: true },
  { n: '05', title: 'Piercings', image: true, slot: 'home-service-piercing', src: '', to: '/piercing' },
]

const ARTIST = { slot: 'home-artist', src: '' }

/* Edit the reviews here. */
const REVIEWS = [
  { text: 'My first ever tattoo was done here and I loved every minute. Perez was calm and professional throughout, and the studio is spotless, which gave me real confidence as a first-timer.' },
  { text: 'The atmosphere is peaceful and focused. It feels less like a tattoo shop and more like a private studio. The fine line work is outstanding, and every detail was placed with care.', offset: true },
  { text: 'I booked a piercing and the whole visit was flawless. The jewellery is truly premium, the placement is spot on, and the aftercare advice made healing effortless.' },
]

/* Gallery: `href` is optional (e.g. an Instagram post link).
   `multi: true` shows the small "multiple photos" icon. */
const GALLERY = [
  { slot: 'home-gallery-1', src: '', alt: 'Tattoo 1', href: '', multi: true },
  { slot: 'home-gallery-2', src: '', alt: 'Tattoo 2', href: '' },
  { slot: 'home-gallery-3', src: '', alt: 'Tattoo 3', href: '' },
  { slot: 'home-gallery-4', src: '', alt: 'Tattoo 4', href: '' },
  { slot: 'home-gallery-5', src: '', alt: 'Tattoo 5', href: '' },
  { slot: 'home-gallery-6', src: '', alt: 'Tattoo 6', href: '' },
]

/* Page 7: the four steps in the "How it works" panel. */
const STEPS = [
  { n: '01', title: 'Share your idea', text: 'Send reference images, placement and size through the booking form or WhatsApp' },
  { n: '02', title: 'Design chat', text: 'Perez sketches a custom design and refines it with you before any ink is used' },
  { n: '03', title: 'Your session', text: 'Arrive at the studio, settle in, and the piece comes to life' },
  { n: '04', title: 'Yours to keep', text: 'Full aftercare guidance, with touch-ups available whenever you need them' },
]

export default function Home() {
  const images = useSiteImages()
  const pick = item => images[item.slot] || item.src

  return (
    <>
      {/* ===== Page 1: Hero ===== */}
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

        <div className="home-side">Faded-Ink Studios Studios · Sanctuary 01 · Nairobi</div>

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

      {/* ===== Page 2: The work ===== */}
      <section className="work">
        <div className="work-head">
          <h2>The work.</h2>
          <Link to="/gallery" className="work-link">Full gallery →</Link>
        </div>

        <div className="work-grid">
          {WORK.map(w => (
            <figure key={w.label} className={`work-tile ${w.className || ''}`}>
              {pick(w) ? (
                <img src={pick(w)} alt={`${w.label} tattoo`} />
              ) : (
                <div className="work-placeholder">Image placeholder</div>
              )}
              <figcaption>{w.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ===== Page 3: Services ===== */}
      <section className="services">
        <div className="services-head">
          <div>
            <p className="services-eyebrow"><span /> What we offer</p>
            <h2>Services.</h2>
          </div>
          <p className="services-intro">
            Five disciplines. One steady hand. Every piece is custom,
            and nothing leaves the studio that wasn't drawn for you.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map(s => (
            <Link
              key={s.n}
              to={s.to}
              className={`svc ${s.wide ? 'svc-wide' : ''} ${s.image ? 'svc-image' : ''}`}
            >
              {s.image && (
                pick(s)
                  ? <img className="svc-img" src={pick(s)} alt={s.title} />
                  : <div className="svc-img svc-placeholder">Image placeholder</div>
              )}
              <span className="svc-num">{s.n}</span>
              <h3>{s.title}</h3>
              {!s.image && <p className="svc-desc">{s.desc}</p>}
              {!s.image && (
                <div className="svc-foot">
                  <span>{s.meta}</span>
                  <span aria-hidden="true">↗</span>
                </div>
              )}
              {s.image && <span className="svc-arrow" aria-hidden="true">↗</span>}
            </Link>
          ))}
        </div>
      </section>

      {/* ===== Page 4: The artist ===== */}
      <section className="artist">
        <figure className="artist-photo">
          {pick(ARTIST) ? (
            <img src={pick(ARTIST)} alt="Perez K Jordan at work in the studio" />
          ) : (
            <div className="artist-placeholder">Image placeholder</div>
          )}
        </figure>

        <div className="artist-body">
          <p className="artist-eyebrow"><span /> Meet the artist</p>

          <h2>
            Perez Kay
            <em>Jordan</em>
          </h2>

          <p className="artist-role">Founder · Tattoo artist · Nyobiese Studios</p>
          <span className="artist-rule" aria-hidden="true" />

          <blockquote className="artist-quote">
            Every tattoo is drawn to grow with you, not fade against you.
          </blockquote>

          <p className="artist-text">
            Fine line, botanical lettering, quiet symbolism. Custom work sketched
            by hand and shaped in conversation before the machine ever starts.
          </p>

          <div className="artist-cta">
            <Link to="/book" className="artist-btn">Book with perez→</Link>
            <Link to="/gallery" className="artist-link">View portfolio</Link>
          </div>
        </div>
      </section>

      {/* ===== Page 5: Reviews ===== */}
      <section className="voices">
        <p className="voices-eyebrow">— Words from our guests —</p>

        <div className="voices-head">
          <h2>
            Stories, shared <em>in their own words.</em>
          </h2>

          <div className="voices-badge">
            <span className="voices-stars" aria-hidden="true">★★★★★</span>
            <span>5.0 Perfect score · Google reviews</span>
          </div>
        </div>

        <div className="voices-grid">
          {REVIEWS.map((r, i) => (
            <article key={i} className={`voice ${r.offset ? 'voice-offset' : ''}`}>
              <div className="voice-top">
                <span className="voices-stars" aria-label="5 out of 5 stars">★★★★★</span>
                <span className="voice-arrow" aria-hidden="true">↗</span>
              </div>

              <blockquote>“{r.text}”</blockquote>

              <span className="voice-tag">
                <i aria-hidden="true">✓</i> Verified client
              </span>

              <div className="voice-foot">
                <span>Google review</span>
                <span>Read on</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== Page 6: Gallery ===== */}
      <section className="gallery">
        <div className="gallery-grid">
          {GALLERY.map((g, i) => (
            <a
              key={i}
              href={g.href || undefined}
              target="_blank"
              rel="noreferrer"
              className="gallery-tile"
              aria-label={g.alt}
            >
              {pick(g) ? (
                <img src={pick(g)} alt={g.alt} />
              ) : (
                <div className="gallery-placeholder">Image placeholder</div>
              )}
              {g.multi && <span className="gallery-multi" aria-hidden="true" />}
            </a>
          ))}
        </div>
      </section>

      {/* ===== Page 7: Ready when you are ===== */}
      <section className="ready">
        <div className="ready-inner">
          <div className="ready-left">
            <p className="ready-eyebrow"><span /> Whenever you're ready</p>

            <h2>
              13 years.<br />
              One hand.<br />
              <em>Your story.</em>
            </h2>

            <p className="ready-text">
              Fine line, botanical lettering, quiet symbolism. Every piece is
              drawn by hand and shaped in conversation, long before the
              machine starts.
            </p>

            <div className="ready-cta">
              <Link to="/book" className="ready-btn">Book your session →</Link>
              <a
                href="https://wa.me/254700000000"
                target="_blank"
                rel="noreferrer"
                className="ready-link"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="ready-right">
            <div className="ready-steps">
              <p className="ready-steps-title">The process</p>

              <ol>
                {STEPS.map(s => (
                  <li key={s.n}>
                    <span className="ready-step-num">{s.n}</span>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <figure className="ready-quote">
              <span className="ready-quote-rule" aria-hidden="true" />
              <blockquote>
                “The most thoughtful tattoo experience I've ever had. Perez
                understood exactly what I wanted from the first message.”
              </blockquote>
              <figcaption>
                <span>Verified client · Nairobi</span>
                <i aria-hidden="true" />
                <b aria-label="5 out of 5 stars">★★★★★</b>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </>
  )
}
