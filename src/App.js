import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import NavBar from './Navbar';
import Footer from './components/layout/Footer/Footer';
import Updates from './Updates';
import Contact from './Contact';
import Services from './Services';
import Home from './Home';
import Loading from './Loading';
import NotFound from './NotFound';
import AIPage from './pages/AIPage';
import BlockchainPage from './pages/BlockchainPage';
import CloudPage from './pages/CloudPage';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ErrorBoundary from './components/ErrorBoundary';


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <div className="App">
        <Router>
          <ScrollToTop />
          {loading ? (
            <Loading />
          ) : (
            <>
              <NavBar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/updates" element={<Updates />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/blockchain" element={<BlockchainPage />} />
                  <Route path="/aipage" element={<AIPage />} />
                  <Route path="/services/cloud" element={<CloudPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </>
          )}
        </Router>
      </div>
    </ErrorBoundary>
  );
}

export default App;
