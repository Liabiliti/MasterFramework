import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'



function App() {

  return (
    <div className={"flex flex-col h-screen"}>
      <nav className="flex-none h-16 bg-black "></nav>
      <main className='flex-grow flex md:flex-row flex-col bg-gradient-to-r from-purple-500 to-orange-500'>
        <aside className='lg:w-64 md:w-40 md:h-full md:pr-0 sm:w-full h-20 flex px-4 py-4'>
          <div className='bg-white flex-grow rounded-md'>

          </div>
        </aside>
        <div className='md:grid md:grid-cols-2 md:grid-rows-2 flex overflow-hidden w-full flex-grow gap-4 p-4'>
          <div className='col-auto row-auto flex'>
            <iframe src="https://tailwindcss.com/docs/background-color" 
                    frameborder="0"
                    className='flex-grow rounded-md'></iframe>
          </div>
          <div className='col-auto row-auto flex w-full'>
            <iframe src="https://tailwindcss.com/docs/background-color" 
                    frameborder="0"
                    className='flex-grow rounded-md'></iframe>
          </div>
          <div className='col-auto row-auto flex '>
            <iframe src="https://tailwindcss.com/docs/background-color" 
                    frameborder="0"
                    className='flex-grow rounded-md'></iframe>
          </div>
          <div className='col-auto row-auto flex '>
            <iframe src="https://tailwindcss.com/docs/background-color" 
                    frameborder="0"
                    className='flex-grow rounded-md'></iframe>
          </div>
        </div>

      </main>

    </div>
  )
}

export default App
