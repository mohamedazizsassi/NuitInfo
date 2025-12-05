import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GameProvider } from './context/GameContext'
import Home from './pages/Home'
import Game from './pages/Game'
import EndScreen from './pages/EndScreen'
import Community from './pages/Community'
import './styles/App.css'

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/end" element={<EndScreen />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </div>
      </Router>
    </GameProvider>
  )
}

export default App
