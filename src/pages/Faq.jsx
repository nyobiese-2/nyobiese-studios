import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import './Faq.css'

const FALLBACK = {
  logistics: [
    { id: 'l1', question: 'How does the consultation fee work?', answer: 'A fixed fee, paid at the front desk, covers the time we spend planning and sketching your idea. It is non-refundable, but the whole amount is deducted from the final price of your tattoo.' },
    { id: 'l2', question: 'How far ahead should I book?', answer: 'Large or custom pieces usually need a few weeks of lead time. Send a request through the booking page and we will confirm a date with you.' },
    { id: 'l3', question: 'Is a deposit required?', answer: 'Yes. A deposit holds your session and is credited toward the final cost of your piece.' },
    { id: 'l4', question: 'How should I prepare for my session?', answer: 'Eat a proper meal, drink plenty of water, and skip alcohol for a day beforehand. Wear something that gives easy access to the area being worked on.' },
  ],
  philosophy: [
    { id: 'p1', question: 'Do you prefer open creative freedom or a clear brief?', answer: 'Both work. Some of our best pieces come from a loose idea and trust, others from a precise reference. What matters is that we talk it through before the needle comes out.' },
    { id: 'p2', question: 'What makes a tattoo great rather than just good?', answer: 'Placement that suits the body, clean linework, healed results that hold up for years, and a design that still feels like yours long after the day you got it.' },
    { id: 'p3', question: 'Will you copy another artist’s tattoo?', answer: 'No. We are happy to take inspiration from references, but every design is drawn fresh so it fits you and does not duplicate someone else’s work.' },
    { id: 'p4', question: 'What happens in the first conversation?', answer: 'We listen. You tell us the story, the size and where it will go, and we shape an approach together before any design is finalised.' },
  ],
}

const COLUMNS = [
  { key: 'logistics', num: 'I.', title: 'The Logistics' },
  { key: 'philosophy', num: 'II.', title: 'The Philosophy' },
]

function Chevron() {
  return (
    <svg viewBox="0 0 10 6" width="12" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path d="M1 1l4 4 4-4" />
    </svg>
  )
}

export default function Faq() {
  const [data, setData] = useState(FALLBACK)
  const [open, setOpen] = useState({ logistics: null, philosophy: null })

  useEffect(() => {
    supabase.from('faqs').select('*').order('sort_order').then(({ data: rows }) => {
      if (!rows || !rows.length) return
      const pick = key => rows.filter(r => (r.category || 'logistics') === key)
      setData({
        logistics: pick('logistics').length ? pick('logistics') : FALLBACK.logistics,
        philosophy: pick('philosophy').length ? pick('philosophy') : FALLBACK.philosophy,
      })
    })
  }, [])

  const toggle = (col, id) => setOpen(o => ({ ...o, [col]: o[col] === id ? null : id }))

  return (
    <section className="faq">
      <div className="faq-head">
        <div>
          <p className="faq-tag">Straight answers</p>
          <h1>On the process, the studio, <br />and the <em>thinking.</em></h1>
        </div>
        <div className="faq-intro">
          <p>The questions we hear most, split between the practical side and the thinking behind the work. Take your time.</p>
          <span className="faq-stamp">Nyobiese Studios · {new Date().getFullYear()}</span>
        </div>
      </div>

      <div className="faq-cols">
        {COLUMNS.map(col => (
          <div key={col.key} className={`faq-col ${open[col.key] ? 'has-open' : ''}`}>
            <span className="faq-num">{col.num}</span>
            <h2>{col.title}</h2>
            <div className="faq-line" />
            <div className="faq-list">
              {data[col.key].map(f => {
                const isOpen = open[col.key] === f.id
                return (
                  <div key={f.id} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button className="faq-q" onClick={() => toggle(col.key, f.id)} aria-expanded={isOpen}>
                      <span>{f.question}</span>
                      <Chevron />
                    </button>
                    <div className="faq-a"><div><p>{f.answer}</p></div></div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
