import { useState } from 'react'
import Crad from './components/crud/Crad'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Crad />
    </>
  )
}

export default App
