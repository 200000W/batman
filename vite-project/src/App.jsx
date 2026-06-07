import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Trilogy from './components/Trilogy'
import Quotes from './components/Quotes'
import Gallery from './components/Gallery'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Trilogy />
      <Quotes />
      <Gallery />
      <Footer />
    </>
  )
}

export default App