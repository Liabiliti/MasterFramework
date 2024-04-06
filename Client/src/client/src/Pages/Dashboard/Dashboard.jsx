import { useEffect, useState } from 'react';
import { IconMenu2 } from "@tabler/icons-react";
import BarChart from '../../Widgets/BarChart';
import MenuBar from '../../Components/Menu/MenuBar';
import Popup from '../../Components/Popup/Popup';
import { useFetchData } from '../../Hooks/useFetchData';
import { fetchUserInfo } from '../../Services/authenticationAPI';
import wsuLogo from "./wsu.png"


function App() {
    const [widgets, setWidgets] = useState([]);
    const [menuBar, setMenuBar] = useState(false);
    const [popup, setPopup] = useState(false);
    const [popupData, setPopupData] = useState();
    const [option, setOption] = useState();


    useEffect(() => {
        //"Save Dashboard", "Load Dashboard", "Share Dashboard", "Delete Dashboard"], ["Password Management"
        switch (option) {
            case "Save Dashboard":
                setPopupData(<div className="h-screen flex flex-col justify-center items-center pb-20 px-5">
                    <h1 className="text-3xl font-bold mb-3">Dashboard Saved</h1>
                    <p className="text-slate-400 font-normal text-center">Your dashboard has been saved successfully, these can be found in the Load Dashboard option in the menu.</p>
                </div>)
                break;
            case "Share Dashboard":
                setPopupData(<div className="h-screen flex flex-col justify-center items-center pb-10 px-5">
                    <h1 className="text-3xl font-bold mb-3">Share Dashboard</h1>
                    <p className="text-slate-400 font-normal text-center">Add the email you wish to send your dashboard set up to.</p>
                    <input type="text"
                        placeholder="Email Address"
                        className={`border border-black focus:outline-blue-600 border-2 rounded-2xl max-w-96 w-full h-9 mt-8 px-3 py-1`}
                    ></input>
                    <button
                        className="border border-blue-500 bg-blue-500 font-semibold text-white border-2 rounded-xl max-w-96 w-full h-9 mt-4 px-3 hover:bg-blue-600 hover:border-blue-600"
                    >Login</button>
                </div>)
                break;
            case "Delete Dashboard":
                setPopupData(<div className="h-screen flex flex-col justify-center items-center pb-20 px-5">
                    <h1 className="text-3xl font-bold mb-3">Dashboard Deleted</h1>
                    <p className="text-slate-400 font-normal text-center">Your dashboard has been removed from your saved dashboards and has cleared your current selection of widgets.</p>
                </div>)
                break;
        }
    }, [option])

    const handleMenuBar = () => {
        setMenuBar(!menuBar)
    }

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
        while (quadrant.childNodes.length > 0) {
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
            <nav className="flex drop-shadow h-16 bg-gradient-to-r from-slate-50 from-20% via-purple-600 to-blue-600 justify-between items-center px-6">
                <img className='w-32' src={wsuLogo}></img>
                <IconMenu2 className='text-white flex w-8 h-8 cursor-pointer' onClick={handleMenuBar} />
            </nav>
            <main className='flex-grow flex md:flex-row flex-col bg-gradient-to-r bg-slate-50 p-4'
                onDragOver={handleDragOver}>

                <aside className='lg:w-64 md:w-40 bg-white md:h-full md:py-4 md:p-0 sm:w-full h-20 flex px-4 border-2 border-black sm:mb-4 mb-4 rounded-md border-dashed'
                    onDragOver={handleDragOver}>
                    <div className='bg-white flex-grow rounded-md md:flex-col md:pt-8 md:pl-0 sm:flex-row pl-2 flex gap-2 items-center'>
                        <div className='m-2 border border-blue-600 border-2 p-4 rounded-2xl md:w-14 md:h-14 w-10 h-10 flex items-center justify-center hover:cursor-pointer'
                            data-src="https://www.flyingdoctor.org.au/map/"
                            draggable="true" onDragStart={handleDragStart} onDragOver={handleDragOver}>A</div>
                        <div className='m-2 border border-blue-600 border-2 p-4 rounded-2xl md:w-14 md:h-14 w-10 h-10 flex items-center justify-center hover:cursor-pointer'
                            data-src="https://tailwindcss.com/docs/word-break"
                            draggable="true" onDragStart={handleDragStart} onDragOver={handleDragOver}>B</div>
                        <div className='m-2 border border-blue-600 border-2 p-4 rounded-2xl md:w-14 md:h-14 w-10 h-10 flex items-center justify-center hover:cursor-pointer'
                            data-src="https://tailwindcss.com/docs/content"
                            draggable="true" onDragStart={handleDragStart} onDragOver={handleDragOver}>C</div>
                        <div className='m-2 border border-blue-600 border-2 p-4 rounded-2xl md:w-14 md:h-14 w-10 h-10 flex items-center justify-center hover:cursor-pointer'
                            data-src="https://tailwindcss.com/docs/whitespace"
                            draggable="true" onDragStart={handleDragStart} onDragOver={handleDragOver}>D</div>
                    </div>
                </aside>
                <div className='md:grid md:grid-cols-2 md:grid-rows-2 flex flex-col overflow-hidden w-full flex-grow gap-4 md:ml-4 sm:m-0' onDragOver={handleDragOver}>
                    <div className='col-auto bg-white row-auto flex w-full border-dashed border-2 border-blue-600 rounded-md flex-grow' id="topLeft" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'topLeft')}><BarChart /></div>
                    <div className='col-auto bg-white row-auto flex w-full border-dashed border-2 border-purple-600 rounded-md flex-grow' id="topRight" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'topRight')}><BarChart /></div>
                    <div className='col-auto bg-white row-auto flex w-full border-dashed border-2 border-purple-600 rounded-md md:visible invisible' id="bottomLeft" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'bottomLeft')}></div>
                    <div className='col-auto bg-white row-auto flex w-full border-dashed border-2 border-blue-600 rounded-md md:visible invisible' id="bottomRight" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'bottomRight')}></div>
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

                {/* {menuBar ? <MenuBar handleMenuBar={handleMenuBar} setPopup={setPopup} open={menuBar} menuHeaders={["Management", "Profile"]} itemsPerMenuHeader={[["Save Dashboard", "Load Dashboard", "Share Dashboard", "Delete Dashboard"], ["Password Management"]]}/> : null}  */}
                <div>
                    <MenuBar handleMenuBar={handleMenuBar} setPopup={setPopup} open={menuBar} menuHeaders={["Management", "Profile"]} setOption={setOption} itemsPerMenuHeader={[["Save Dashboard", "Load Dashboard", "Share Dashboard", "Delete Dashboard"], ["Password Management"]]} />
                    <Popup popup={popup} setPopup={setPopup} popUpMessage={popupData} />
                </div>


            </main>
        </div>



    )
}

export default App
