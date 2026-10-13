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

/* Every image spot on the public pages.
   `slot` is the key stored in the site_images table.
   Add a new entry here and it appears in the admin automatically. */
const SITE_SLOTS = [
  {
    group: 'Home · The work',
    slots: [
      { slot: 'home-work-1', label: 'Black & Grey (large tile)' },
      { slot: 'home-work-2', label: 'Fine Line' },
      { slot: 'home-work-3', label: 'Black Work' },
      { slot: 'home-work-4', label: 'Sleeve' },
      { slot: 'home-work-5', label: 'Detail' },
    ],
  },
  {
    group: 'Home · Services',
    slots: [{ slot: 'home-service-piercing', label: 'Piercings card' }],
  },
  {
    group: 'Home · Artist',
    slots: [{ slot: 'home-artist', label: 'Artist photo' }],
  },
  {
    group: 'Home · Gallery strip',
    slots: [1, 2, 3, 4, 5, 6].map(n => ({ slot: `home-gallery-${n}`, label: `Gallery tile ${n}` })),
  },
  {
    group: 'Piercing page',
    slots: [
      { slot: 'piercing-hero', label: 'Hero photo' },
      ...[1, 2, 3, 4, 5].map(n => ({ slot: `piercing-gallery-${n}`, label: `Mosaic image ${n}` })),
      { slot: 'piercing-person', label: 'Piercer photo' },
    ],
  },
  {
    group: 'About page',
    slots: [
      { slot: 'about-studio', label: 'Studio interior (wide band)' },
      { slot: 'about-artist', label: 'Artist portrait' },
    ],
  },
]


const SIA_CSS = `
.sia { max-width: 1100px; margin: 0 auto; padding: 24px 16px 64px; }
.sia h2 { margin: 0 0 6px; }
.sia h3 { margin: 28px 0 12px; font-size: 1rem; }
.sia-note { margin: 0 0 12px; opacity: .7; max-width: 60ch; }
.sia-msg { margin: 12px 0; padding: 10px 14px; border: 1px solid currentColor; border-radius: 6px; }

.sia-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 14px;
}
.sia-card { border: 1px solid rgba(128,128,128,.35); border-radius: 8px; padding: 10px; }
.sia-thumb {
  aspect-ratio: 4 / 3;
  border-radius: 6px;
  background: rgba(128,128,128,.15);
  display: grid;
  place-items: center;
  overflow: hidden;
  font-size: .8rem;
  opacity: .9;
}
.sia-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.sia-label { margin: 8px 0; font-size: .85rem; }
.sia-actions { display: flex; gap: 8px; align-items: center; }

.sia-btn,
.sia-remove {
  font: inherit;
  font-size: .8rem;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid currentColor;
  background: transparent;
  color: inherit;
  cursor: pointer;
}
.sia-btn input { display: none; }
.sia-btn:focus-within,
.sia-remove:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
.sia-remove { opacity: .75; }
.sia-remove:disabled { opacity: .4; cursor: default; }
`


const BUCKET = 'site-images'

function SiteImagesAdmin() {
  const [images, setImages] = useState({})
  const [busy, setBusy] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    supabase
      .from('site_images')
      .select('slot, image_url')
      .then(({ data, error }) => {
        if (error) {
          setMessage(`Could not load images: ${error.message}`)
          return
        }
        const map = {}
        data.forEach(r => { map[r.slot] = r.image_url })
        setImages(map)
      })
  }, [])

  async function upload(slot, file) {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setMessage('Choose an image file (JPG, PNG or WebP).')
      return
    }
    setBusy(slot)
    setMessage('')

    const ext = file.name.split('.').pop().toLowerCase()
    const path = `${slot}-${Date.now()}.${ext}`

    const { error: upErr } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { cacheControl: '31536000', upsert: false })

    if (upErr) {
      setBusy('')
      setMessage(`Upload failed: ${upErr.message}`)
      return
    }

    const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path)

    const { error: dbErr } = await supabase
      .from('site_images')
      .upsert({ slot, image_url: pub.publicUrl, updated_at: new Date().toISOString() })

    setBusy('')
    if (dbErr) {
      setMessage(`Saved the file but not the link: ${dbErr.message}`)
      return
    }

    setImages(prev => ({ ...prev, [slot]: pub.publicUrl }))
    setMessage('Image updated.')
  }

  async function remove(slot) {
    setBusy(slot)
    setMessage('')
    const { error } = await supabase.from('site_images').delete().eq('slot', slot)
    setBusy('')
    if (error) {
      setMessage(`Could not remove: ${error.message}`)
      return
    }
    setImages(prev => {
      const next = { ...prev }
      delete next[slot]
      return next
    })
    setMessage('Image removed. The placeholder is showing again.')
  }

  return (
    <section className="sia">
      <style>{SIA_CSS}</style>
      <h2>Site images</h2>
      <p className="sia-note">
        Upload a photo for any spot on the Home, Piercing and About pages.
        Spots without a photo show the placeholder.
      </p>

      {message && <p className="sia-msg" role="status">{message}</p>}

      {SITE_SLOTS.map(g => (
        <div className="sia-group" key={g.group}>
          <h3>{g.group}</h3>
          <div className="sia-grid">
            {g.slots.map(s => (
              <div className="sia-card" key={s.slot}>
                <div className="sia-thumb">
                  {images[s.slot]
                    ? <img src={images[s.slot]} alt={s.label} />
                    : <span>No image</span>}
                </div>
                <p className="sia-label">{s.label}</p>
                <div className="sia-actions">
                  <label className="sia-btn">
                    {busy === s.slot ? 'Working…' : images[s.slot] ? 'Replace' : 'Upload'}
                    <input
                      type="file"
                      accept="image/*"
                      disabled={busy === s.slot}
                      onChange={e => { upload(s.slot, e.target.files[0]); e.target.value = '' }}
                    />
                  </label>
                  {images[s.slot] && (
                    <button
                      type="button"
                      className="sia-remove"
                      disabled={busy === s.slot}
                      onClick={() => remove(s.slot)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
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
        <button className={tab === 'images' ? 'active' : ''} onClick={() => setTab('images')}>Site images</button>
      </div>
      {tab === 'bookings' && <Bookings />}
      {tab === 'gallery' && <GalleryManager />}
      {tab === 'images' && <SiteImagesAdmin />}
    </section>
  )
}
