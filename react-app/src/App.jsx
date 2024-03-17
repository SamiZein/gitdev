import { useState } from 'react'
import Developers from './Developers.jsx'
import NavBar from './NavBar.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Developers />
    </>
  )
}

export default App
