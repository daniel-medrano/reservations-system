import './App.css'

import { BrowserRouter, Routes, Route, Link, redirect} from 'react-router-dom'
import { Nav } from './pages/nav'


import { Home } from './pages/home/Home'
import { About } from './pages/about/about'
import { Rooms } from './pages/rooms/rooms'
import { Payment } from './pages/payment/payment'
import { AuthenticationPage } from '@/pages/authentication/authentication'

import Layout from './pages/layout'
import LayoutWithoutNavbar from './pages/layout-without-navbar'
import Reservations from './pages/reservations/reservations'


function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/rooms' element={<Rooms />} />
          <Route path='/payments' element={<Payment />} />
          <Route path='/reservations' element={<Reservations />} />
        </Route>
        <Route element={<LayoutWithoutNavbar />}>
          <Route path='/login' element={<AuthenticationPage />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
