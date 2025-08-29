// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
// import Login from './pages/Login';
import SecureRAGHome from './pages/Enhanced-Rag';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/secure-rag-home" element={<SecureRAGHome />} />
      </Routes>
    </Router>
  );
}

export default App;
