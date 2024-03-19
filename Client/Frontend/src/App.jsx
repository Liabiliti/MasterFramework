import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'



function App() {

  return (
    <div className={"grid grid-rows-responsive grid-cols-6 h-screen"}>
      <nav className='grid-rows-1 col-span-6 shrink-0'></nav>
      <aside className='grid-rows-2 row-span-6 grid-cols-1 col-span-1'></aside>
      <main className='grid-rows-2 grid-col-2'></main>

    </div>
  )
}

export default App
