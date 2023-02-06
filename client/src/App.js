import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import HomePage from './home/pages/Home';
import Admin from './user/pages/Admin';


function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/admin' element={<Admin />} />
          
          <Route path='*' element={<Navigate to='/' />} />
          </Routes>
      </BrowserRouter>
    
  );
};

export default App;