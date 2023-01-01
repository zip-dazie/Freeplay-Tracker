import './App.css';
import FreePlay from './components/FreePlay/FreePlay';
import Reserve from './components/Reserve/Reserve';
import SignUp from './components/SignUp/SignUp';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<FreePlay />} />
          <Route path="/reserve/:courtId" element={<Reserve />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
