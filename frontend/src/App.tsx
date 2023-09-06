import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SubmitPage from './components/SubmitPage';
import MoviePage from './components/MoviePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubmitPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
    </Router>
  )
}

export default App
