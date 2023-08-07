import { Button } from '@/components/ui/button'

import { AuthenticationPage } from '@/pages/authentication/authentication'

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter, Routes, Route, Link, redirect} from 'react-router-dom'
import { Home } from './pages/home/Home'
import { About } from './pages/about/about'
import { Rooms } from './pages/rooms/rooms'
import { Menu } from './components/ui/menu'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Menu />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/About' element={<About />} />
      <Route path='/Rooms' element={<Rooms />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
