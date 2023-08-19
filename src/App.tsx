import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './views/pages/Home';
import Page0 from './views/pages/Page0';
import Page1 from './views/pages/Page1';
import Page2 from './views/pages/Page2';
import Page3 from './views/pages/Page3';
import Page4 from './views/pages/Page4';
import Page5 from './views/pages/Page5';

const App: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    const returnTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
    returnTop();
  }, [location.pathname]);

  return (
    <React.Fragment>
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Home />} />
          <Route path='/practice0' element={<Page0 />} />
          <Route path='/practice1' element={<Page1 />} />
          <Route path='/practice2' element={<Page2 />} />
          <Route path='/practice3' element={<Page3 />} />
          <Route path='/practice4' element={<Page4 />} />
          <Route path='/practice5' element={<Page5 />} />
          <Route path='*' element={<>not found</>} />
        </Routes>
      </AnimatePresence>
    </React.Fragment>
  );
};

export default App;
