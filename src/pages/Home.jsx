import { Link } from 'react-router-dom'
import { STYLES } from '../styles'
import './Home.css'

export default function Home() {
  return (
    <section className="home">
      <div className="home-art">Nyobiese</div>
      <div>
        <p className="eyebrow">Ink · Craft · Permanence</p>
        <h1>Skin is our <em>Canvas</em></h1>
        <div className="rule" />
        <p className="home-text">Nyobiese Studios is a custom tattoo and piercing studio. Every piece is designed with you, drawn by hand and made to last.</p>
        <div className="home-tags">
          {STYLES.map(s => <Link key={s.slug} to={`/tattoos/${s.slug}`} className="tag">{s.name}</Link>)}
          <Link to="/piercing" className="tag">Piercing</Link>
        </div>
        <div className="home-cta"><Link to="/book" className="btn solid">Book now</Link></div>
      </div>
    </section>
  )
}
