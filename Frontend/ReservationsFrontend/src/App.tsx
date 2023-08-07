import { Button } from '@/components/ui/button'
import { TableDemo } from '@/test/table-demo'

import { AuthenticationPage } from '@/authentication/page'

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route, redirect, } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h2>  Tests  </h2>
      </div>
      
      <div>
        <Route path="/" Component={AuthenticationPage} />
      </div>
        

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <Button onClick={() => setCount((count) => count + 1)}>Aumentar contadores {count}</Button>
        <TableDemo />
        <AuthenticationPage />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
