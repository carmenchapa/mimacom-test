import React from 'react'
import './App.css'
import Main from './pages/Main'
import { StateProvider } from './store.js'

function App() {
  return (
    <StateProvider>
      <div className="App">
        <Main />
      </div>
    </StateProvider>
  )
}

export default App
