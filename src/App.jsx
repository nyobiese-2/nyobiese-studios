import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import StylePage from './pages/StylePage'
import Piercing from './pages/Piercing'
import About from './pages/About'
import Faq from './pages/Faq'
import Book from './pages/Book'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tattoos/:style" element={<StylePage />} />
          <Route path="/piercing" element={<Piercing />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/book" element={<Book />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
