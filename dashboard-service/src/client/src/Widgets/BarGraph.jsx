import * as d3 from "d3";
import React, { useEffect, useRef, useState } from 'react';

function BarChart() {
    const ref = useRef();
    const [data, setData] = useState([2, 5, 6, 10]);

    useEffect(() => {
        const interval = setInterval(() => {
            let val = Math.floor(Math.random() * 13)
            let primes = [7, 11, 5, 9];
            const updateData = data.map((element, index) => {
                console.log((val * primes[index]) % 13)
                return (val * primes[index]) % 13;
            });
            setData(updateData)
        }, 3000);

    }, [])

    // useEffect(() => {
    //     const svg = d3.select(ref.current)
    //     .attr('width', 550)
    //     .attr('height', 400);

    // const xScale = d3.scaleLinear()
    //     .domain([0, d3.max(data)])
    //     .range([0, 600]);

    // const yScale = d3.scaleBand().domain(data.map((d, i) => i))
    //     .range([0, 400])
    //     .padding(0.2);

    // // Update existing bars
    // svg.selectAll('rect')
    //     .data(data)
    //     .attr('x', 0) // Start from the left edge
    //     .attr('y', (d, i) => yScale(i))
    //     .attr('width', (d, i) => xScale(d)) // Width based on data value
    //     .attr('height', yScale.bandwidth())
    //     .attr('fill', '#486BF0')
    //     .classed("rounded-md", true);

    // // Enter new bars
    // svg.selectAll('rect')
    //     .data(data)
    //     .enter()
    //     .append('rect')
    //     .attr('x', 0)
    //     .attr('y', (d, i) => yScale(i))
    //     .attr('width', (d, i) => xScale(d))
    //     .attr('height', yScale.bandwidth())
    //     .attr('fill', '#486BF0')
    //     .classed("rounded-md", true);

    // // Exit old bars
    // svg.selectAll('rect')
    //     .data(data)
    //     .exit()
    //     .remove();

    // // Update axes
    // svg.selectAll('.x-axis')
    //     .call(d3.axisBottom(xScale));

    // svg.selectAll('.y-axis')
    //     .call(d3.axisLeft(yScale));

    

    // }, [data])

    return (
        <div className="flex flex-grow p-4">
            <div className="flex flex-col justify-center align-center text-md font-medium py-2 mr-4 max-w-fit truncate">
                <p className="grow flex items-center">Terminal 1</p>
                <p className="grow flex items-center">Terminal 2</p>
                <p className="grow flex items-center">Terminal 3</p>
                <p className="grow flex items-center">Terminal 4</p>
            </div> 
            {/* <svg className=" border-l-4 border-b-4 border-black" ref={ref}></svg> */}
            <div className="flex-grow grid grid-cols-12 grid-rows-4 gap-y-6 grid-flow-col">
                <div className={`col-span-${data[0]} bg-black`}></div>
                <div className={`col-span-${data[1]} bg-black`}></div>
                <div className={`col-span-${data[2]} bg-black`}></div>
                <div className={`col-span-${data[3]} bg-black`}></div>
            </div>
        </div>
    );
}

export default BarChart;