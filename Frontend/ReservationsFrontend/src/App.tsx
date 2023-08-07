import './App.css'

import { BrowserRouter, Routes, Route, Link, redirect} from 'react-router-dom'
import { Home } from './pages/home/Home'
import { About } from './pages/about/about'
import { Rooms } from './pages/rooms/rooms'
import { Menu } from './components/ui/menu'
import { AuthenticationPage } from '@/pages/authentication/authentication'


function App() {

  return (
    <>
    <BrowserRouter>
    <Menu />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/About' element={<About />} />
      <Route path='/Rooms' element={<Rooms />} />
      <Route path='/Log In' element={<AuthenticationPage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
