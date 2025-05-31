import React from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import './stylesheets/alignments.css';
import './stylesheets/custom-components.css';
import './stylesheets/form-elements.css';
import './stylesheets/text-elements.css';
import './stylesheets/theme.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './Pages/Home'



function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App