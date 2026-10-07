import { Link } from "react-router-dom";
import "./About.css";

/* ---------- Edit these first ---------- */
const ARTIST = "Artist Name";          // founder / tattoo artist
const CITY = "Nairobi";
const STUDIO_IMG = "/studio.jpg";      // put the file in /public, or set to "" for a placeholder
const ARTIST_IMG = "";                 // e.g. "/artist.jpg" once the photo is in /public

/* ---------- Page content ---------- */
const STUDIO = {
  labels: {
    hero: "Our story",
    philosophy: "The philosophy",
    name: "The name",
    artist: "The artist",
  },
  hero: {
    title: ["A studio shaped", "by stillness."],
    meta: `Est. 2015 · ${CITY} · Kenya`,
  },
  origin: {
    year: "2015",
    meta: ["Founded", CITY, "Kenya"],
    title: ["It began in a borrowed room", "with a single machine."],
    paragraphs: [
      `${ARTIST} started tattooing in ${CITY} in 2015, working from a tiny borrowed room with one coil machine and a sketchbook crowded with botanical drawings. There was no logo, no website and no social media, only recommendations passed between friends and a name for being patient to a fault.`,
      "A waiting list formed by 2018, and a small studio of our own followed in 2021. In 2024 Nyobiese Studios settled into its permanent home, a space built to feel more like a quiet reading room than a clinic.",
      "From the very first day we have booked one client at a time, and that rule still stands.",
    ],
    timeline: [
      { year: "2015", label: "The first machine" },
      { year: "2018", label: "A growing waitlist" },
      { year: "2021", label: "A studio of our own" },
      { year: "2024", label: "The permanent home" },
    ],
  },
  philosophy: {
    title: ["Three words,", "one way of working."],
    intro:
      "These are not slogans. They are the questions we ask before agreeing to any piece, and before deciding whether someone is ready to wear it.",
    items: [
      {
        word: "Patience",
        text: "Consultations are never hurried. A design that takes two sittings to get right beats one rushed into a single afternoon. Every first meeting begins with listening, long before a pencil moves.",
      },
      {
        word: "Precision",
        text: "Fine, single-needle linework asks for a calm hand that few people cultivate. Years of apprenticeship came before the first paying client. The machine is the final step of the process, never the first.",
      },
      {
        word: "Presence",
        text: "Some clients arrive with no references at all, and that is welcome. The strongest work grows out of a conversation about light, memory and texture, not from a folder of saved screenshots.",
      },
    ],
  },
  quote: {
    text: "We built this room so that the second you take a seat, your shoulders drop.",
    by: `${ARTIST} · On shaping the space`,
  },
  name: {
    big: ["NYO", "biese"],
    defs: [
      {
        term: "Ink",
        text: "The medium itself: pigment held in liquid and placed beneath the skin through thousands of tiny punctures every minute. Permanent by nature.",
      },
      {
        term: "Nyobiese",
        text: "Placeholder: what the name means, where it comes from, and why it was chosen for the studio.",
      },
      {
        term: "The studio",
        text: "A place where craft and meaning meet, and every tattoo is handled with the seriousness of something that will last a lifetime.",
      },
    ],
  },
  artist: {
    title: ["One artist,", "one client at a time."],
    paragraphs: [
      "Nyobiese has never run guest residencies, added a second chair or hired junior tattooists. Every piece that leaves the studio was made by the same pair of hands.",
      `It is a limit ${ARTIST} chose on purpose, and has protected each time growth was on the table.`,
    ],
    caption: [ARTIST, "Founder & artist"],
    primary: { label: "Book your session →", to: "/book" },
    secondary: { label: "View the work →", to: "/tattoos/fine-line" },
  },
};

/* Placeholder-aware image: shows a block when no src is given */
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
      <section className="ab-hero ab-wrap">
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
        <Img src={STUDIO_IMG} className="ab-band-img" alt="Inside the studio" label="Placeholder · studio interior (wide)" />
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
          <Img src={ARTIST_IMG} alt="The artist at work" label="Placeholder · artist portrait" />
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
            <Link className="ab-btn" to={artist.primary.to}>{artist.primary.label}</Link>
            <Link className="ab-link" to={artist.secondary.to}>{artist.secondary.label}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
