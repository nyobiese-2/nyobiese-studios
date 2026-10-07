import { useState } from "react";
import "./Piercing.css";

/* ---------- Content: every string is a fill-in placeholder ---------- */
const PAGE = {
  hero: {
    label: "Label",
    title: ["Headline", "second line", "third line italic."],
    sub: "Short supporting sentence goes here.",
    primary: { label: "Button label", href: "#" },
    secondary: { label: "Link label", href: "#" },
    facts: [
      { big: "Value", small: "Label" },
      { big: "Value", small: "Label" },
      { big: "Value", small: "Label" },
    ],
  },
  steps: {
    label: "Label",
    title: ["Section heading", "line two in italic."],
    items: [
      { tag: "Tag", head: "Step title", text: "Step description goes here." },
      { tag: "Tag", head: "Step title", text: "Step description goes here." },
      { tag: "Tag", head: "Step title", text: "Step description goes here." },
      { tag: "Tag", head: "Step title", text: "Step description goes here." },
    ],
  },
  gallery: { label: "Label", title: "Gallery heading", link: { label: "Link label", href: "#" }, count: 5 },
  materials: {
    label: "Label",
    title: ["Section heading", "line two in italic."],
    intro: "Short intro goes here.",
    tabs: [
      { tab: "Tab", symbol: "Xx", tag: "Tag", head: "Item title", text: "Item description goes here." },
      { tab: "Tab", symbol: "Xx", tag: "Tag", head: "Item title", text: "Item description goes here." },
      { tab: "Tab", symbol: "Xx", tag: "Tag", head: "Item title", text: "Item description goes here." },
    ],
  },
  person: {
    label: "Label",
    name: "Name",
    role: "Role line",
    quote: "Quote text goes here.",
    primary: { label: "Button label", href: "#" },
  },
  standards: {
    label: "Label",
    title: ["Section heading", "line two in italic."],
    items: [
      { head: "Standard title", text: "Description goes here." },
      { head: "Standard title", text: "Description goes here." },
      { head: "Standard title", text: "Description goes here." },
      { head: "Standard title", text: "Description goes here." },
    ],
  },
  cta: { title: ["Closing heading", "line two in italic."], note: "Short note goes here.", button: { label: "Button label", href: "#" } },
};

/* Placeholder-aware image: pass `src` for a real photo */
function Img({ src, alt, label, className = "" }) {
  return src ? (
    <img className={`pz-img ${className}`} src={src} alt={alt} />
  ) : (
    <div className={`pz-img pz-ph ${className}`} role="img" aria-label={alt}><span>{label}</span></div>
  );
}
const Label = ({ children }) => <p className="pz-label"><i />{children}</p>;
const Title = ({ lines, tag: T = "h2", className = "" }) => (
  <T className={`pz-title ${className}`}>{lines[0]}<br /><em>{lines[1]}</em></T>
);

export default function Piercings() {
  const [active, setActive] = useState(0);
  const { hero, steps, gallery, materials, person, standards, cta } = PAGE;
  const m = materials.tabs[active];

  return (
    <main className="pz">
      {/* 1. Hero: centred, dark photo */}
      <section className="pz-hero pz-dark-photo">
        <Img className="pz-fill" alt="Studio suite" label="Placeholder · hero photo" />
        <div className="pz-shade" />
        <div className="pz-hero-body">
          <Label>{hero.label}</Label>
          <h1 className="pz-display">
            {hero.title[0]}<br />{hero.title[1]}<br /><em>{hero.title[2]}</em>
          </h1>
          <p className="pz-lead">{hero.sub}</p>
          <div className="pz-actions">
            <a className="pz-btn" href={hero.primary.href}>{hero.primary.label}</a>
            <a className="pz-textlink" href={hero.secondary.href}>{hero.secondary.label}</a>
          </div>
        </div>
        <ul className="pz-facts">
          {hero.facts.map((f, i) => (
            <li key={i}><strong>{f.big}</strong><span>{f.small}</span></li>
          ))}
        </ul>
      </section>

      {/* 2. Steps: horizontal track */}
      <section className="pz-paper pz-section">
        <div className="pz-wrap">
          <header className="pz-head pz-head-center">
            <Label>{steps.label}</Label>
            <Title lines={steps.title} />
          </header>
          <ol className="pz-track">
            {steps.items.map((s, i) => (
              <li key={i}>
                <span className="pz-dot" />
                <p className="pz-tag">{s.tag}</p>
                <h3 className="pz-h3">{s.head}</h3>
                <p className="pz-body">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. Gallery: asymmetric mosaic */}
      <section className="pz-sand pz-section">
        <div className="pz-wrap">
          <header className="pz-head pz-head-row">
            <div><Label>{gallery.label}</Label><h2 className="pz-title">{gallery.title}</h2></div>
            <a className="pz-textlink" href={gallery.link.href}>{gallery.link.label}</a>
          </header>
          <div className="pz-mosaic">
            {Array.from({ length: gallery.count }).map((_, i) => (
              <Img key={i} className={`pz-tile pz-tile-${i + 1}`} alt={`Gallery image ${i + 1}`} label={`Placeholder · image ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Materials: tabs + single panel */}
      <section className="pz-stone pz-section">
        <div className="pz-wrap pz-split">
          <div>
            <Label>{materials.label}</Label>
            <Title lines={materials.title} />
            <p className="pz-body pz-narrow">{materials.intro}</p>
            <div className="pz-tabs" role="tablist">
              {materials.tabs.map((t, i) => (
                <button key={i} role="tab" aria-selected={i === active}
                  className={i === active ? "is-on" : ""} onClick={() => setActive(i)}>{t.tab}</button>
              ))}
            </div>
          </div>
          <article className="pz-panel" role="tabpanel">
            <span className="pz-symbol">{m.symbol}</span>
            <p className="pz-tag">{m.tag}</p>
            <h3 className="pz-h3">{m.head}</h3>
            <p className="pz-body">{m.text}</p>
          </article>
        </div>
      </section>

      {/* 5. Practitioner: centred on dark green */}
      <section className="pz-green pz-section pz-person">
        <Img className="pz-avatar" alt={person.name} label="Photo" />
        <Label>{person.label}</Label>
        <h2 className="pz-title">{person.name}</h2>
        <p className="pz-tag">{person.role}</p>
        <blockquote>{person.quote}</blockquote>
        <a className="pz-btn" href={person.primary.href}>{person.primary.label}</a>
      </section>

      {/* 6. Standards: two-column list with ticks */}
      <section className="pz-mandala pz-section">
        <div className="pz-wrap">
          <header className="pz-head"><Label>{standards.label}</Label><Title lines={standards.title} /></header>
          <ul className="pz-checks">
            {standards.items.map((s, i) => (
              <li key={i}>
                <span className="pz-tick" aria-hidden="true">✓</span>
                <div><h3 className="pz-h3">{s.head}</h3><p className="pz-body">{s.text}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Closing call to action */}
      <section className="pz-gold pz-cta">
        <Title lines={cta.title} className="pz-on-gold" />
        <p>{cta.note}</p>
        <a className="pz-btn pz-btn-dark" href={cta.button.href}>{cta.button.label}</a>
      </section>
    </main>
  );
}
