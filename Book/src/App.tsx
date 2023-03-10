import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/Login'
import IndexPage from './pages/Auth/IndexPage'
import Register from './pages/Auth/Register'
import { initializeApp } from "firebase/app";
import { config } from './TypescriptFiles/fireBase'
import AddBook from './pages/books/book'
import Authors from './pages/author/author'
import Layot from './pages/Header/Layout'
import { useState } from 'react'
import AdddAuthor from "./pages/author/addAuthor"
import Profile from "./pages/user/profile"

initializeApp(config.firebaseConfig)

function App() {
  const [darkMode, setDarkMode] = useState(Boolean)
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layot darkMode={darkMode} setDarkMode={setDarkMode} />}>
          <Route index element={<IndexPage darkMode={darkMode} />} />
          <Route path='/author' element={<Authors  darkMode={darkMode} />} />
          <Route path='/addBook' element={<AddBook darkMode={darkMode} />} />
          <Route path='/addAuthor' element={<AdddAuthor />} />
          <Route path='/profile' element={<Profile darkMode={darkMode} />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
