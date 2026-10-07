import "./About.css";

/* ---------- Content (swap for your real copy) ---------- */
const STUDIO = {
  est: "Est. 2012 · Your area · Nairobi",
  origin: {
    year: "2012",
    meta: ["Founded", "Nairobi", "Kenya"],
    title: ["It started in a rented room", "with one machine."],
    paragraphs: [
      "Placeholder: how the studio began, who started it, and what the early days looked like.",
      "Placeholder: the growth story — waiting list, first studio, permanent home.",
      "Placeholder: the one principle that has never changed.",
    ],
    timeline: [
      { year: "2012", label: "First machine" },
      { year: "2016", label: "Waiting list" },
      { year: "2020", label: "First studio" },
      { year: "2024", label: "Permanent home" },
    ],
  },
  philosophy: {
    title: ["Three words.", "One practice."],
    intro: "Placeholder: a short line on why these words guide how the studio works.",
    items: [
      { word: "Patience", text: "Placeholder: what patience means in your consultations and process." },
      { word: "Precision", text: "Placeholder: what precision means in your craft and training." },
      { word: "Presence", text: "Placeholder: what presence means in how you work with clients." },
    ],
  },
  quote: { text: "Placeholder quote about how the space was designed.", by: "Founder name · On designing the space" },
  name: {
    big: ["INK", "zen"],
    defs: [
      { term: "Ink", text: "Placeholder: first part of the name and its meaning." },
      { term: "Zen", text: "Placeholder: second part of the name and its meaning." },
      { term: "Studio name", text: "Placeholder: what the two mean together." },
    ],
  },
  artist: {
    title: ["One artist.", "One client at a time."],
    paragraphs: [
      "Placeholder: who does the work and why there is no second chair.",
      "Placeholder: the deliberate choice behind keeping it this way.",
    ],
    caption: ["Artist name", "Founder & artist"],
  },
};

/* Placeholder-aware image: pass `src` when you have a real photo */
function Img({ src, alt, label, className = "" }) {
  return src ? (
    <img className={`ab-img ${className}`} src={src} alt={alt} />
  ) : (
    <div className={`ab-img ab-ph ${className}`} role="img" aria-label={alt}>
      <span>{label}</span>
    </div>
  );
}

const Eyebrow = ({ children }) => (
  <p className="ab-eyebrow"><i className="ab-dash" />{children}</p>
);

export default function About() {
  const { origin, philosophy, quote, name, artist } = STUDIO;

  return (
    <main className="ab">
      {/* 1. Hero */}
      <section className="ab-hero ab-wrap">
        <Eyebrow>About the studio</Eyebrow>
        <h1 className="ab-h1">
          A studio born<br /><em>of stillness.</em>
        </h1>
        <p className="ab-eyebrow ab-hero-meta"><i className="ab-dash" />{STUDIO.est}</p>
      </section>

      {/* 2. Origin + timeline */}
      <section className="ab-origin">
        <div className="ab-wrap">
          <div className="ab-origin-grid">
            <div className="ab-origin-year">
              <span className="ab-year">{origin.year}</span>
              <ul className="ab-meta">
                {origin.meta.map((m) => <li key={m}>{m}</li>)}
              </ul>
            </div>
            <div className="ab-origin-copy">
              <h2 className="ab-h2">{origin.title[0]}<br /><em>{origin.title[1]}</em></h2>
              {origin.paragraphs.map((p, i) => <p className="ab-p" key={i}>{p}</p>)}
            </div>
          </div>
          <ol className="ab-timeline">
            {origin.timeline.map((t, i) => (
              <li key={t.year} className={i === 0 ? "is-first" : ""}>
                <strong>{t.year}</strong>
                <span>{t.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. Philosophy */}
      <section className="ab-phil ab-wrap">
        <div className="ab-phil-head">
          <div>
            <Eyebrow>The philosophy</Eyebrow>
            <h2 className="ab-h2">{philosophy.title[0]}<br /><em>{philosophy.title[1]}</em></h2>
          </div>
          <p className="ab-p ab-phil-intro">{philosophy.intro}</p>
        </div>
        <ul className="ab-rows">
          {philosophy.items.map((it, i) => (
            <li key={it.word}>
              <span className="ab-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="ab-word">{it.word}</h3>
              <p className="ab-p">{it.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Full-bleed image band with quote */}
      <section className="ab-band">
        <Img className="ab-band-img" alt="The studio space" label="Placeholder · studio interior (wide)" />
        <div className="ab-band-shade" />
        <figure className="ab-wrap ab-quote">
          <blockquote>{quote.text}</blockquote>
          <figcaption><i className="ab-dash" />{quote.by}</figcaption>
        </figure>
      </section>

      {/* 5. The name */}
      <section className="ab-name">
        <div className="ab-wrap ab-name-grid">
          <div>
            <i className="ab-dash" />
            <p className="ab-bigword">{name.big[0]}<em>{name.big[1]}</em></p>
          </div>
          <div className="ab-defs">
            <p className="ab-eyebrow"><i className="ab-dash" />The name</p>
            {name.defs.map((d) => (
              <dl key={d.term}>
                <dt>{d.term}</dt>
                <dd>{d.text}</dd>
              </dl>
            ))}
          </div>
        </div>
      </section>

      {/* 6. The artist */}
      <section className="ab-artist ab-wrap">
        <figure className="ab-portrait">
          <Img alt="The artist at work" label="Placeholder · artist portrait" />
          <figcaption>
            <i className="ab-dash" />
            <span>{artist.caption[0]}</span>
            <span>{artist.caption[1]}</span>
          </figcaption>
        </figure>
        <div className="ab-artist-copy">
          <Eyebrow>The artist</Eyebrow>
          <h2 className="ab-h2">{artist.title[0]}<br /><em>{artist.title[1]}</em></h2>
          {artist.paragraphs.map((p, i) => <p className="ab-p" key={i}>{p}</p>)}
          <div className="ab-actions">
            <a className="ab-btn" href="/book">Book with us</a>
            <a className="ab-link" href="/work">See the work</a>
          </div>
        </div>
      </section>
    </main>
  );
}
