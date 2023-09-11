import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [names, setNames] = useState(['Huan', 'Cameron', 'Alicia', 'Jay'])

  function namesAsList() {
    const allLists = names.map (n => <li key={n}>{n}</li>)
    return allLists
  }

  function handleClick() {
    fetch('http://localhost:5000/users')
    .then(res =>  {
      return res.json()
    }).then(val => {
      setNames(val)
    })
  }

  return(
    <div className="App">
      <h1>List of names</h1>
      <ul>
        {namesAsList()}
      </ul>
      <button onClick={handleClick}>Update Names</button>
    </div>
  )
}

export default App
