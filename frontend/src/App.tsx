import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SubmitPage from './components/SubmitPage';

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
