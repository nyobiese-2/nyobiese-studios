import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import './Gallery.css'

export default function Gallery({ category }) {
  const [items, setItems] = useState(null)
  useEffect(() => {
    setItems(null)
    supabase.from('gallery').select('*').eq('category', category).order('created_at', { ascending: false })
      .then(({ data }) => setItems(data || []))
  }, [category])

  if (!items) return <p className="gallery-empty">Loading…</p>
  if (!items.length) return <p className="gallery-empty">New work is being added soon.</p>
  return (
    <div className="gallery-grid">
      {items.map(i => <figure key={i.id}><img src={i.image_url} alt={i.title || category} loading="lazy" /></figure>)}
    </div>
  )
}
