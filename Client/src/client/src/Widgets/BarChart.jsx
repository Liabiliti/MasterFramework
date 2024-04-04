import * as d3 from "d3";
import React, { useEffect, useRef, useState } from 'react';

function BarChart() {
    const ref = useRef();
    const [data, setData] = useState([10, 5, 6, 10]);

    useEffect(() => {
        const interval = setInterval(() => {
            let val = Math.floor(Math.random() * 13);
            let primes = [7, 11, 5, 9];
            const updateData = data.map((element, index) => {
                console.log((val * primes[index]) % 13);
                return (val * primes[index]) % 13;
            });
            setData(updateData);
        }, 3000);
    
        // Cleanup function to clear the interval when the component unmounts or dependencies change
        return () => clearInterval(interval);
    }, []); 

    return (
        <div className="flex flex-grow p-4 flex-col">
            <h1 className="text-xl font-semibold">Passenger Queues</h1>
            <div className="ld:flex grid grid-cols-2 grid-rows-2 grid-rows-2 gap-x-2 justify-center align-center text-md font-medium py-2 mr-4 max-w-fit truncate">
                <div className="flex justify-center items-center gap-x-2">
                    <p className="grow flex md:text-lg text-sm items-center ">Terminal 1</p>
                    <div className="bg-green-500 w-4 h-4"></div>
                </div>
                <div className="flex justify-center items-center gap-x-2">
                    <p className="grow flex md:text-lg text-sm items-center">Terminal 2</p>
                    <div className="bg-purple-500 w-4 h-4"></div>
                </div>
                <div className="flex justify-center items-center gap-x-2">
                    <p className="grow flex md:text-lg text-sm items-center">Terminal 3</p>
                    <div className="bg-orange-500 w-4 h-4"></div>
                </div>
                <div className="flex justify-center items-center gap-x-2">
                    <p className="grow flex md:text-lg text-sm items-center">Terminal 4</p>
                    <div className="bg-blue-500 w-4 h-4"></div>
                </div>
            </div> 
            
            {data.length > 0 && (
                <>
                <div className="flex-grow grid grid-cols-12 grid-rows-4 md:gap-y-6 gap-y-1 grid-flow-col border-l border-b p-3 mr-3">
                    <div className={`bg-green-500 rounded-2xl`} style={{gridColumnStart: "1", display: "grid", gridColumnEnd: `${data[0]}`}}></div>
                    <div className={`bg-purple-500 rounded-2xl`} style={{gridColumnStart: "1", display: "grid", gridColumnEnd: `${data[1]}`}}></div>
                    <div className={`bg-orange-500 rounded-2xl`} style={{gridColumnStart: "1", display: "grid", gridColumnEnd: `${data[2]}`}}></div>
                    <div className={`bg-blue-500 rounded-2xl`} style={{gridColumnStart: "1", display: "grid", gridColumnEnd: `${data[3]}`}}></div>
                </div>
                <div className="grid grid-cols-4 gap-y-6 grid-flow-row">
                    {Array.from({ length: 4 }).map((element, index) => (
                        <div className="pl-4 text-slate-400">{((index) * 100)/2}</div>
                    ))}
                </div>
                </>
            
            )}
        </div>
    );
}

export default BarChart;