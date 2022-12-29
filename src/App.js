import './App.css';
import FreePlay from './components/FreePlay/FreePlay';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<FreePlay />} />
          <Route exact path="/how-it-works" />
          <Route exact path="/signup" />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
