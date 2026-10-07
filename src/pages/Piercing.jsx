import Gallery from '../components/Gallery'
import './Piercing.css'

export default function Piercing() {
  return (
    <section className="section piercing">
      <p className="eyebrow">Body piercing</p>
      <h1>Pierced with <em>care</em></h1>
      <div className="rule" />
      <p className="piercing-blurb">Sterile single-use needles and implant-grade jewelry, placed with precision.</p>
      <Gallery category="piercing" />
    </section>
  )
}
