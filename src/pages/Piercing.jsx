import { useState } from "react";
import "./Piercing.css";

/* ---------- Content (edit freely) ---------- */
const PAGE = {
  hero: {
    label: "The piercing suite",
    title: ["Calm hands.", "Careful work.", "Lasting adornment."],
    sub: "A quiet, sterile room and an unhurried approach to every single piercing.",
    primary: { label: "Book a session", href: "#" },
    secondary: { label: "Follow on Instagram", href: "#" },
    facts: [
      { big: "5.0", small: "Client rating" },
      { big: "100%", small: "Sterile setup" },
      { big: "Appt.", small: "Bookings only" },
    ],
  },
  steps: {
    label: "How it works",
    title: ["Four steps,", "from enquiry to healed."],
    items: [
      { tag: "Step one", head: "The enquiry", text: "Tell us where you are thinking of, send any reference photos and ask your questions by form or WhatsApp. Nothing is too small to ask." },
      { tag: "Step two", head: "The consultation", text: "We look at your anatomy, choose the jewellery together and mark the spot before anything begins. No rushing." },
      { tag: "Step three", head: "The piercing", text: "The room is ready, the tools are sterile and single-use, and one steady movement places your jewellery." },
      { tag: "Step four", head: "The healing", text: "You leave with written aftercare, can message us while you heal, and get follow-up checks at no extra charge." },
    ],
  },
  gallery: { label: "Recent pieces", title: "Our latest work.", link: { label: "See the full gallery", href: "#" }, count: 5 },
  materials: {
    label: "Jewellery",
    title: ["Only the safest", "metals touch your skin."],
    intro: "Everything we fit is chosen to heal well and stay comfortable for years to come.",
    tabs: [
      { tab: "Titanium", symbol: "Ti", tag: "Implant grade", head: "Implant titanium", text: "Light, hypoallergenic and available in a range of finishes. It is our first choice for every fresh piercing." },
      { tab: "Steel", symbol: "Fe", tag: "Durable and body-safe", head: "Surgical steel 316L", text: "A strong, affordable steel that suits healed piercings and everyday wear without fuss." },
      { tab: "Nickel-free", symbol: "Ni", tag: "Gentle on sensitive skin", head: "Our nickel-free promise", text: "We test every piece for nickel before it is stocked. If your skin reacts to metals, we will help you choose before we begin." },
    ],
  },
  person: {
    label: "Your piercer",
    name: "Piercer name",
    role: "Resident body piercer",
    quote: "Choosing jewellery is a small ritual of looking after yourself.",
    primary: { label: "Book an appointment", href: "#" },
  },
  standards: {
    label: "Our promise",
    title: ["Clear standards,", "no guesswork."],
    items: [
      { head: "Quality jewellery", text: "Only implant-grade pieces, checked before they ever reach you." },
      { head: "A clean room", text: "Sterile tools opened in front of you, with every surface cleaned between clients." },
      { head: "Talk before we start", text: "A proper conversation first, so you know exactly what will happen." },
      { head: "Support afterwards", text: "Clear written guidance, and we stay reachable for as long as you heal." },
    ],
  },
  cta: { title: ["Ready when you are.", "Book your session."], note: "By appointment only. Send us a message to find a time that suits you.", button: { label: "Book a session", href: "#" } },
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
