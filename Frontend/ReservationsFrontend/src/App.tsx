import './App.css'

import { BrowserRouter, Routes, Route, Link, redirect} from 'react-router-dom'
import { Menu } from './components/ui/menu'

import { Home } from './pages/home/Home'
import { About } from './pages/about/about'
import { Rooms } from './pages/rooms/rooms'
import { AuthenticationPage } from '@/pages/authentication/authentication'


function App() {

  return (
    <>
      <body>
      <BrowserRouter>
      <Menu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/Rooms' element={<Rooms />} />
        <Route path='/Log In' element={<AuthenticationPage />} />
        
      </Routes>
      </BrowserRouter>
      
      <br></br> <br></br>
      </body>
    </>
  )
}

export default App
