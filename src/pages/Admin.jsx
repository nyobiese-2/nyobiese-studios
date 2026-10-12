import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { STYLES } from '../styles'
import './Admin.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setBusy(false)
  }

  return (
    <section className="section admin-login">
      <p className="eyebrow">Admin</p>
      <h1>Sign in</h1>
      <div className="rule" />
      <form onSubmit={submit} className="admin-form">
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="admin-btn" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
        {error && <p className="admin-error">{error}</p>}
      </form>
    </section>
  )
}

function Bookings() {
  const [rows, setRows] = useState(null)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')

  const load = useCallback(async () => {
    const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false })
    if (error) setError(error.message)
    else setRows(data)
  }, [])

  useEffect(() => { load() }, [load])

  async function setStatus(id, status) {
    const { error } = await supabase.from('bookings').update({ status }).eq('id', id)
    if (error) return alert(error.message)
    setRows(r => r.map(b => (b.id === id ? { ...b, status } : b)))
  }

  async function remove(id) {
    if (!window.confirm('Delete this booking?')) return
    const { error } = await supabase.from('bookings').delete().eq('id', id)
    if (error) return alert(error.message)
    setRows(r => r.filter(b => b.id !== id))
  }

  if (error) return <p className="admin-error">{error}</p>
  if (!rows) return <p className="admin-muted">Loading…</p>

  const shown = filter === 'all' ? rows : rows.filter(b => (b.status || 'new') === filter)

  return (
    <div>
      <div className="admin-filters">
        {['all', 'new', 'confirmed', 'done'].map(f => (
          <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}</button>
        ))}
        <span className="admin-muted">{shown.length} booking{shown.length === 1 ? '' : 's'}</span>
      </div>
      {!shown.length && <p className="admin-muted">No bookings here yet.</p>}
      <div className="booking-list">
        {shown.map(b => (
          <article key={b.id} className="booking-card">
            <header>
              <h3>{b.name || 'Unnamed'}</h3>
              <span className={`badge ${b.status || 'new'}`}>{b.status || 'new'}</span>
            </header>
            <dl>
              {b.service && <><dt>Service</dt><dd>{b.service}</dd></>}
              {b.placement && <><dt>Placement</dt><dd>{b.placement}</dd></>}
              {b.preferred_date && <><dt>Preferred date</dt><dd>{b.preferred_date}</dd></>}
              {b.email && <><dt>Email</dt><dd><a href={`mailto:${b.email}`}>{b.email}</a></dd></>}
              {b.phone && <><dt>Phone</dt><dd><a href={`tel:${b.phone}`}>{b.phone}</a></dd></>}
              {b.description && <><dt>Idea</dt><dd>{b.description}</dd></>}
              <dt>Received</dt><dd>{new Date(b.created_at).toLocaleString()}</dd>
            </dl>
            <footer>
              <button onClick={() => setStatus(b.id, 'confirmed')}>Confirm</button>
              <button onClick={() => setStatus(b.id, 'done')}>Mark done</button>
              <button onClick={() => setStatus(b.id, 'new')}>Reset</button>
              <button className="danger" onClick={() => remove(b.id)}>Delete</button>
            </footer>
          </article>
        ))}
      </div>
    </div>
  )
}

function GalleryManager() {
  const [category, setCategory] = useState(STYLES[0].slug)
  const [items, setItems] = useState(null)
  const [files, setFiles] = useState([])
  const [title, setTitle] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setItems(null)
    const { data, error } = await supabase
      .from('gallery').select('*').eq('category', category).order('created_at', { ascending: false })
    if (error) setError(error.message)
    else setItems(data)
  }, [category])

  useEffect(() => { load() }, [load])

  async function upload(e) {
    e.preventDefault()
    if (!files.length) return
    setUploading(true)
    setError('')
    for (const file of files) {
      const ext = file.name.split('.').pop()
      const path = `${category}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
      const { error: upErr } = await supabase.storage.from('gallery').upload(path, file, { contentType: file.type })
      if (upErr) { setError(upErr.message); break }
      const { data } = supabase.storage.from('gallery').getPublicUrl(path)
      const { error: dbErr } = await supabase.from('gallery').insert({
        category, title: title || null, image_url: data.publicUrl, storage_path: path,
      })
      if (dbErr) { setError(dbErr.message); break }
    }
    setFiles([])
    setTitle('')
    e.target.reset()
    setUploading(false)
    load()
  }

  async function remove(item) {
    if (!window.confirm('Delete this image?')) return
    if (item.storage_path) await supabase.storage.from('gallery').remove([item.storage_path])
    const { error } = await supabase.from('gallery').delete().eq('id', item.id)
    if (error) return alert(error.message)
    setItems(list => list.filter(i => i.id !== item.id))
  }

  return (
    <div>
      <div className="admin-filters">
        {STYLES.map(s => (
          <button key={s.slug} className={category === s.slug ? 'active' : ''} onClick={() => setCategory(s.slug)}>
            {s.name}
          </button>
        ))}
      </div>

      <form onSubmit={upload} className="admin-form upload-form">
        <input type="file" accept="image/*" multiple onChange={e => setFiles([...e.target.files])} required />
        <input type="text" placeholder="Title / alt text (optional)" value={title} onChange={e => setTitle(e.target.value)} />
        <button className="admin-btn" disabled={uploading || !files.length}>
          {uploading ? 'Uploading…' : `Upload ${files.length || ''} to ${STYLES.find(s => s.slug === category).name}`}
        </button>
      </form>
      {error && <p className="admin-error">{error}</p>}

      {!items ? <p className="admin-muted">Loading…</p> : !items.length ? (
        <p className="admin-muted">No images in this style yet.</p>
      ) : (
        <div className="admin-grid">
          {items.map(i => (
            <figure key={i.id}>
              <img src={i.image_url} alt={i.title || category} loading="lazy" />
              <button className="danger" onClick={() => remove(i)}>Delete</button>
            </figure>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Admin() {
  const [session, setSession] = useState(undefined)
  const [tab, setTab] = useState('bookings')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  if (session === undefined) return <section className="section"><p className="admin-muted">Loading…</p></section>
  if (!session) return <Login />

  return (
    <section className="section admin">
      <div className="admin-top">
        <div>
          <p className="eyebrow">Admin</p>
          <h1>Dashboard</h1>
        </div>
        <button className="admin-btn ghost" onClick={() => supabase.auth.signOut()}>Sign out</button>
      </div>
      <div className="rule" />
      <div className="admin-tabs">
        <button className={tab === 'bookings' ? 'active' : ''} onClick={() => setTab('bookings')}>Bookings</button>
        <button className={tab === 'gallery' ? 'active' : ''} onClick={() => setTab('gallery')}>Gallery uploads</button>
      </div>
      {tab === 'bookings' ? <Bookings /> : <GalleryManager />}
    </section>
  )
}
