import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { STYLES } from '../styles'
import './Header.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { setOpen(false); setDrop(false) }, [pathname])

  return (
    <header className="header">
      <Link to="/" className="logo">Nyobiese <i>Studios</i></Link>
      <nav className={`nav ${open ? 'open' : ''}`}>
        <NavLink to="/" end>home</NavLink>
        <div className={`dropdown ${drop ? 'open' : ''}`}>
          <button className="drop-btn" onClick={() => setDrop(!drop)}>
            tattoos
            <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M1 1l4 4 4-4" /></svg>
          </button>
          <div className="menu">
            {STYLES.map(s => <NavLink key={s.slug} to={`/tattoos/${s.slug}`}>{s.name.toLowerCase()}</NavLink>)}
          </div>
        </div>
        <NavLink to="/piercing">piercing</NavLink>
        <NavLink to="/about">about</NavLink>
        <NavLink to="/faq">faq</NavLink>
      </nav>
      <Link to="/book" className="btn book-btn">book now</Link>
      <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
    </header>
  )
}
