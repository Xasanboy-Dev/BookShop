import './App.css'
import { Route, Routes } from 'react-router-dom'
import indexPage from './pages/indexPage'
import Login from './pages/indexPage'


function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
