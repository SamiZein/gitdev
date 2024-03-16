import { useState } from 'react'
import Developers from './Developers.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Developers />
    </>
  )
}

export default App
