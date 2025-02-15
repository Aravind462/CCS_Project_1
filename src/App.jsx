import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Add from './pages/Add'
import Edit from './pages/Edit'
import Profile from './pages/Profile'

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/add' element={<Add/>} />
        <Route path='/edit/:id' element={<Edit/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
    </>
  )
}

export default App
