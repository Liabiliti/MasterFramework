import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'



function App() {
  const [widgets, setWidgets] = useState([]);

  function handleMouseDown(e) {
    e.target.classList.add("cursor-grab")
    console.log(e.target.classList)
  }

  function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.getAttribute('data-src'));
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e, quadrantId) {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain')
    let quadrant = document.getElementById(quadrantId);
    console.log(quadrant.childNodes.length)
    while(quadrant.childNodes.length > 0)
    {
      console.log(1)
      quadrant.removeChild(quadrant.firstChild);
    }
    let iframe = document.createElement('iframe');
    iframe.src = data;
    iframe.frameBorder = "0"
    iframe.className = "w-full flex-grow rounded-md";
    quadrant.appendChild(iframe);
  }

  return (
    <div className={"flex flex-col h-screen"}>
      <nav className="flex-none h-16 bg-black "></nav>
      <main className='flex-grow flex md:flex-row flex-col bg-gradient-to-r from-purple-500 to-orange-500'
      onDragOver={handleDragOver}>
        <aside className='lg:w-64 md:w-40 md:h-full md:py-4 md:pr-0 sm:w-full h-20 flex px-4 pt-4 pb-0'
        onDragOver={handleDragOver}>
          <div className='bg-white flex-grow rounded-md md:flex-col md:pt-8 md:pl-0 sm:flex-row pl-2 flex gap-2 items-center'>
            <div className='m-2 border p-4 rounded-md md:w-14 md:h-14 w-10 h-10 flex items-center justify-center hover:cursor-pointer'
                  data-src="https://www.flyingdoctor.org.au/map/"
                  draggable="true" onDragStart={handleDragStart} onDragOver={handleDragOver}>A</div>
            <div className='m-2 border p-4 rounded-md md:w-14 md:h-14 w-10 h-10 flex items-center justify-center hover:cursor-pointer'
                  data-src="https://tailwindcss.com/docs/word-break"
                  draggable="true" onDragStart={handleDragStart} onDragOver={handleDragOver}>B</div>
            <div className='m-2 border p-4 rounded-md md:w-14 md:h-14 w-10 h-10 flex items-center justify-center hover:cursor-pointer'
                  data-src="https://tailwindcss.com/docs/content"
                  draggable="true" onDragStart={handleDragStart} onDragOver={handleDragOver}>C</div>
            <div className='m-2 border p-4 rounded-md md:w-14 md:h-14 w-10 h-10 flex items-center justify-center hover:cursor-pointer'
                  data-src="https://tailwindcss.com/docs/whitespace"
                  draggable="true" onDragStart={handleDragStart} onDragOver={handleDragOver}>D</div>
          </div>
        </aside>
        <div className='md:grid md:grid-cols-2 md:grid-rows-2 flex flex-col overflow-hidden w-full flex-grow gap-4 p-4' onDragOver={handleDragOver}>
          <div className='col-auto row-auto flex w-full border-dashed border-2 border-white rounded-md flex-grow' id="topLeft" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'topLeft')}></div>
          <div className='col-auto row-auto flex w-full border-dashed border-2 border-white rounded-md flex-grow' id="topRight" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'topRight')}></div>
          <div className='col-auto row-auto flex w-full border-dashed border-2 border-white rounded-md md:visible invisible' id="bottomLeft" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'bottomLeft')}></div>
          <div className='col-auto row-auto flex w-full border-dashed border-2 border-white rounded-md md:visible invisible' id="bottomRight" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'bottomRight')}></div>
        {/* {widgets.map((element, index) => {
          
                return (
                  <div className='col-auto row-auto flex w-full'>
                    <iframe src={element} 
                    frameborder="0"
                    className='flex-grow rounded-md'></iframe>
                    </div>);
              })} */}
          {/* <div className='col-auto row-auto flex w-full'>
            <iframe src="https://tailwindcss.com/docs/background-color" 
                    frameborder="0"
                    className='flex-grow rounded-md'></iframe>
          </div>
          <div className='col-auto row-auto flex'>
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
          </div> */}
        </div>

      </main>

    </div>
  )
}

export default App
