import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Portfolio from "./pages/Portfolio";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import "./index.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotras" element={<Team />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portafolio" element={<Portfolio />} />
          <Route path="/habilidades" element={<Skills />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;





