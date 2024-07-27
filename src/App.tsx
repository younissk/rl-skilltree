import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CollectionPage from './pages/CollectionPage';


function App() {
  return (
    <div className="App">
      <h1>Real Life Skill Tree</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:collection" element={<CollectionPage />} />
      </Routes>
    </div>
  );
}

export default App