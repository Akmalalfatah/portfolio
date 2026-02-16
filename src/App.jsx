import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react"; 
import ScrollToTop from "./ScrollToTop"
import Intro from "./sectionHome/Intro"
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/Home";
import Work from "./pages/Work";
import WorkDetail from "./pages/WorkDetail";
import About from "./pages/About"
import Contact from "./pages/Contact";

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    const introShown = sessionStorage.getItem("introShown");
    if (introShown) {
      setIntroComplete(true);
    }
  }, []);
  
  return (
    <BrowserRouter>
      <Intro onComplete={() => setIntroComplete(true)} />
      <ScrollToTop />
      <div className="overflow-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<WorkDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;