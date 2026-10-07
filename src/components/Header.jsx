import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { STYLES } from '../styles'
import './Header.css'

const clockFmt = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Africa/Nairobi',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
})
const nairobiTime = () => `nbi · ${clockFmt.format(new Date()).toLowerCase()}`

function useClock() {
  const [time, setTime] = useState(nairobiTime)
  useEffect(() => {
    const id = setInterval(() => setTime(nairobiTime()), 15000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState(false)
  const { pathname } = useLocation()
  const time = useClock()

  // close everything after navigating
  useEffect(() => { setOpen(false); setDrop(false) }, [pathname])

  // lock page scroll while the phone menu is open
  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  // Escape closes the menu; growing to desktop width closes it too
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setOpen(false) }
    const mq = window.matchMedia('(min-width: 901px)')
    const onChange = e => { if (e.matches) setOpen(false) }
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onChange)
    return () => {
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onChange)
    }
  }, [])

  return (
    <header className={`header ${open ? 'menu-open' : ''}`}>
      <Link to="/" className="logo">Nyobiese <i>Studios</i></Link>

      <nav id="site-nav" className={`nav ${open ? 'open' : ''}`} aria-label="Main">
        <NavLink to="/" end>home</NavLink>

        <div className={`dropdown ${drop ? 'open' : ''}`}>
          <button className="drop-btn" type="button" aria-expanded={drop} onClick={() => setDrop(!drop)}>
            tattoos
            <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M1 1l4 4 4-4" /></svg>
          </button>
          <div className="menu">
            {STYLES.map(s => <NavLink key={s.slug} to={`/tattoos/${s.slug}`}>{s.name.toLowerCase()}</NavLink>)}
          </div>
        </div>

        <NavLink to="/piercing">piercing</NavLink>
        <NavLink to="/about">about</NavLink>
        <NavLink to="/faq">faq</NavLink>

        {/* phone-only: booking button at the bottom of the menu */}
        <div className="nav-extra">
          <Link to="/book" className="book-m">book now →</Link>
        </div>
      </nav>

      <span className="clock">{time}</span>
      <Link to="/book" className="btn book-btn">book now</Link>

      <button
        className="burger"
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="site-nav"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true"><path d="M4 8h16M4 12h16M4 16h16" /></svg>
        )}
      </button>
    </header>
  )
}
