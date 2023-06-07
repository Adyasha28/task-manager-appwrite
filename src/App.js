import React from 'react'
import { BrowserRouter, Route , Routes} from 'react-router-dom'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Profile from './components/Profile/Profile'

const app = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default app