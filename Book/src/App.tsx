import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import IndexPage from './pages/Index/IndexPage'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<IndexPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
