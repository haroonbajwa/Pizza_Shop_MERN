import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Homescreen from "./components/Homescreen";
import Cartscreen from "./components/Cartscreen";
import ChatScreen from './components/ChatScreen';
import Registerscreen from "./components/Registerscreen";
import Loginscreen from "./components/Loginscreen";

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
          <Route exact path="/chat" element={<ChatScreen />} />
          <Route exact path="/register" element={<Registerscreen />} />
          <Route exact path="/login" element={<Loginscreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
