import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import Article from './pages/Article'
import Investigations from './pages/Investigations'
import ThreatActors from './pages/ThreatActors'
import Intelligence from './pages/Intelligence'
import Evidence from './pages/Evidence'
import Archive from './pages/Archive'
import Search from './pages/Search'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/investigations" element={<Investigations />} />
          <Route path="/threat-actors" element={<ThreatActors />} />
          <Route path="/intelligence" element={<Intelligence />} />
          <Route path="/evidence" element={<Evidence />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <Layout>
      <AnimatedRoutes />
    </Layout>
  )
}
