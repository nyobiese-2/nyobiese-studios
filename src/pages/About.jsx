import "./About.css";

/* ---------- Content: every string below is a fill-in placeholder ---------- */
const STUDIO = {
  labels: {
    hero: "Section label",
    philosophy: "Section label",
    name: "Section label",
    artist: "Section label",
  },
  hero: {
    title: ["Page heading line one", "line two in italic."],
    meta: "Short meta line",
  },
  origin: {
    year: "Year",
    meta: ["Label", "Label", "Label"],
    title: ["Section heading line one", "line two in italic."],
    paragraphs: ["Paragraph text goes here.", "Paragraph text goes here.", "Paragraph text goes here."],
    timeline: [
      { year: "Year", label: "Milestone" },
      { year: "Year", label: "Milestone" },
      { year: "Year", label: "Milestone" },
      { year: "Year", label: "Milestone" },
    ],
  },
  philosophy: {
    title: ["Heading line one", "line two in italic."],
    intro: "Short intro text goes here.",
    items: [
      { word: "Title", text: "Description text goes here." },
      { word: "Title", text: "Description text goes here." },
      { word: "Title", text: "Description text goes here." },
    ],
  },
  quote: { text: "Quote text goes here.", by: "Attribution goes here" },
  name: {
    big: ["Big", "word"],
    defs: [
      { term: "Term", text: "Definition text goes here." },
      { term: "Term", text: "Definition text goes here." },
      { term: "Term", text: "Definition text goes here." },
    ],
  },
  artist: {
    title: ["Heading line one", "line two in italic."],
    paragraphs: ["Paragraph text goes here.", "Paragraph text goes here."],
    caption: ["Name", "Role"],
    primary: { label: "Button label", href: "#" },
    secondary: { label: "Link label", href: "#" },
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
  const { labels, hero, origin, philosophy, quote, name, artist } = STUDIO;

  return (
    <main className="ab">
      {/* 1. Hero */}
      <secimport "./About.css";

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
tion className="ab-hero ab-wrap">
        <Eyebrow>{labels.hero}</Eyebrow>
        <h1 className="ab-h1">
          {hero.title[0]}<br /><em>{hero.title[1]}</em>
        </h1>
        <p className="ab-eyebrow ab-hero-meta"><i className="ab-dash" />{hero.meta}</p>
      </section>

      {/* 2. Origin + timeline */}
      <section className="ab-origin">
        <div className="ab-wrap">
          <div className="ab-origin-grid">
            <div className="ab-origin-year">
              <span className="ab-year">{origin.year}</span>
              <ul className="ab-meta">
                {origin.meta.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>
            <div className="ab-origin-copy">
              <h2 className="ab-h2">{origin.title[0]}<br /><em>{origin.title[1]}</em></h2>
              {origin.paragraphs.map((p, i) => <p className="ab-p" key={i}>{p}</p>)}
            </div>
          </div>
          <ol className="ab-timeline">
            {origin.timeline.map((t, i) => (
              <li key={i} className={i === 0 ? "is-first" : ""}>
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
            <Eyebrow>{labels.philosophy}</Eyebrow>
            <h2 className="ab-h2">{philosophy.title[0]}<br /><em>{philosophy.title[1]}</em></h2>
          </div>
          <p className="ab-p ab-phil-intro">{philosophy.intro}</p>
        </div>
        <ul className="ab-rows">
          {philosophy.items.map((it, i) => (
            <li key={i}>
              <span className="ab-num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="ab-word">{it.word}</h3>
              <p className="ab-p">{it.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Full-bleed image band with quote */}
      <section className="ab-band">
        <Img className="ab-band-img" alt="Wide image" label="Placeholder · wide image" />
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
            <p className="ab-eyebrow"><i className="ab-dash" />{labels.name}</p>
            {name.defs.map((d, i) => (
              <dl key={i}>
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
          <Img alt="Portrait" label="Placeholder · portrait image" />
          <figcaption>
            <i className="ab-dash" />
            <span>{artist.caption[0]}</span>
            <span>{artist.caption[1]}</span>
          </figcaption>
        </figure>
        <div className="ab-artist-copy">
          <Eyebrow>{labels.artist}</Eyebrow>
          <h2 className="ab-h2">{artist.title[0]}<br /><em>{artist.title[1]}</em></h2>
          {artist.paragraphs.map((p, i) => <p className="ab-p" key={i}>{p}</p>)}
          <div className="ab-actions">
            <a className="ab-btn" href={artist.primary.href}>{artist.primary.label}</a>
            <a className="ab-link" href={artist.secondary.href}>{artist.secondary.label}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
