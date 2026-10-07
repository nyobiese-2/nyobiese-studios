import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { STYLES } from '../styles'
import './Book.css'

export default function Book() {
  const [f, setF] = useState({ name: '', email: '', phone: '', service: STYLES[0].name, placement: '', description: '', preferred_date: '' })
  const [msg, setMsg] = useState('')
  const set = k => e => setF({ ...f, [k]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    setMsg('Sending…')
    const { error } = await supabase.from('bookings').insert({ ...f, preferred_date: f.preferred_date || null })
    setMsg(error ? 'Something went wrong. Please try again.' : 'Request received. We will be in touch soon.')
    if (!error) setF({ ...f, name: '', email: '', phone: '', placement: '', description: '', preferred_date: '' })
  }

  return (
    <section className="section book">
      <p className="eyebrow">Book your session</p>
      <h1>Let's make <em>something</em></h1>
      <form className="book-form" onSubmit={submit}>
        <input required placeholder="Full name" value={f.name} onChange={set('name')} />
        <input required type="email" placeholder="Email" value={f.email} onChange={set('email')} />
        <input placeholder="Phone" value={f.phone} onChange={set('phone')} />
        <select value={f.service} onChange={set('service')}>
          {[...STYLES.map(s => s.name), 'Piercing'].map(n => <option key={n}>{n}</option>)}
        </select>
        <input placeholder="Placement (e.g. forearm)" value={f.placement} onChange={set('placement')} />
        <input type="date" value={f.preferred_date} onChange={set('preferred_date')} />
        <textarea required rows="5" placeholder="Describe your idea" value={f.description} onChange={set('description')} />
        <button className="btn solid" type="submit">Send request</button>
      </form>
      {msg && <p className="book-notice">{msg}</p>}
    </section>
  )
}
