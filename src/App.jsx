import { useState } from 'react'
import './App.css'
import CanvasComponent from './components/canvas'
import Home from './pages/home'
import Contact from './pages/contact'

function App() {
  const [count, setCount] = useState(0)

  return (    
    <div className='w-screen h-screen'>
        <Home/>
    </div> 
   
  )
}

export default App
