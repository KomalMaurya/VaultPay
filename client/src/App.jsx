import React from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import './stylesheets/alignments.css';
import './stylesheets/custom-components.css';
import './stylesheets/form-elements.css';
import './stylesheets/text-elements.css';
import './stylesheets/theme.css';
import './stylesheets/layout.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './Pages/Home'
import ProtectedRoute from './components/protectedRoute';
import PublicRoute from './components/PublicRoute';



function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path='/register' element={<PublicRoute><Register/></PublicRoute>}/>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App