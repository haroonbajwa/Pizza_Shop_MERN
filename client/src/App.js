import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Homescreen from './components/Homescreen';
import Cartscreen from './components/Cartscreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Homescreen />
      <Cartscreen /> */}

      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homescreen />} />
        <Route exact path="/cart" element={<Cartscreen />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
