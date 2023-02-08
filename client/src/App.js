import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import HomePage from './home/pages/Home';
import ButtonAppBar from './shared/components/Navbar';

import Admin from './user/pages/Admin';


function App() {
  return (
    <div className='body_section' >
      <ButtonAppBar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/admin' element={<Admin />} />
          
          <Route path='*' element={<Navigate to='/' />} />
          </Routes>
      </BrowserRouter>
      </div>
  );
};

export default App;