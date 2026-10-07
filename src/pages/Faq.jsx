import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import './Faq.css'

export default function Faq() {
  const [faqs, setFaqs] = useState([])
  useEffect(() => { supabase.from('faqs').select('*').order('sort_order').then(({ data }) => setFaqs(data || [])) }, [])
  return (
    <section className="section faq">
      <p className="eyebrow">Questions</p>
      <h1>Good to <em>know</em></h1>
      <div className="rule" />
      {faqs.map(f => <details key={f.id}><summary>{f.question}</summary><p>{f.answer}</p></details>)}
    </section>
  )
}
