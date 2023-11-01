import { useState } from 'react'
import './styles/normalize.scss';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Frontend seguridad</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
