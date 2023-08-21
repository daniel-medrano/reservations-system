import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Home } from './pages/home/Home'
import { About } from './pages/about/about'
import { Rooms } from './pages/rooms/rooms'
import { Payment } from './pages/payment/payment'
import { SignIn } from '@/pages/signin/sign-in'
import { SignUp } from '@/pages/signup/sign-up'

import Layout from './pages/layout'
import LayoutWithoutNavbar from './pages/layout-without-navbar'
import Reservations from './pages/reservations/reservations'
import Chatbot from './pages/chatbot/chatbot'

import { AuthProvider } from './context/AuthProvider'
import RequireAuth from './pages/require-auth'
import { Unauthorized } from './pages/unauthorized/unauthorized'
import { DataTableProvider } from './context/DataTableProvider'

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <DataTableProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/payments" element={<Payment />} />
                <Route path="/chatbot" element={<Chatbot />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route element={<RequireAuth allowedRoles={["Employee", "Admin"]} />}>
                  <Route path='/reservations' element={<Reservations />} />
                </Route>
              </Route>
              <Route element={<LayoutWithoutNavbar />}>
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/sign-up' element={<SignUp />} />
              </Route>
            </Routes>
          </DataTableProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
