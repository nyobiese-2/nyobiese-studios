import { useParams } from 'react-router-dom'
import { STYLES } from '../styles'
import Gallery from '../components/Gallery'
import './StylePage.css'

export default function StylePage() {
  const { style } = useParams()
  const s = STYLES.find(x => x.slug === style)
  if (!s) return <section className="section style-page"><h2>Style not found</h2></section>
  return (
    <section className="section style-page">
      <p className="eyebrow">Tattoos</p>
      <h1>{s.name}</h1>
      <div className="rule" />
      <p className="style-blurb">{s.blurb}</p>
      <Gallery category={s.slug} />
    </section>
  )
}
