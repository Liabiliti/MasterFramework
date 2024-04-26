import React, { useEffect, useState, useCallback } from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import BarChart from '../../Widgets/BarChart';

// Create a ResponsiveGridLayout component using WidthProvider
const ResponsiveGridLayout = WidthProvider(Responsive);

function DashboardCanvas(props) {

    const [oldLayout, setOldLayout] = useState([])
    const { height, width } = props;
    console.log(height, width)

    const layout = [
        { i: 'a', x: 0, y: 0, w: 1, h: 1 },
        { i: 'b', x: 1, y: 0, w: 3, h: 3 },
        { i: 'c', x: 4, y: 0, w: 1, h: 1 }
    ];

    let rowHeight = 0;
    let cells = 0;

    if (height > 1800) {
        cells = 12;
        rowHeight = height / cells;
    } else if (height > 996) {
        cells = 10;
        rowHeight = height / cells;
    } else if (height > 768) {
        cells = 6;
        rowHeight = height / cells;
    } else if (height > 480) {
        cells = 4;
        rowHeight = height / cells;
    } else if (height > 0) {
        cells = 3;
        rowHeight = height / cells;
    }

    console.log(rowHeight, cells)

    const onResizeStartHandle = (layout, oldItem, newItem, placeholder, e, element) => {
        setOldLayout(layout);
        console.log("Resize is happening");
    }

    const onResizeEndHandle = (layout, oldItem, newItem, placeholder, e, element) => {
        
        let isOver = false;
        isOver = layout.some((element) => {
            console.log("y + h: ", (element.y + element.h), ", x + w: ", element.x + element.w, " cells: ", cells)
            return (element.y + element.h) > cells-1 || (element.x + element.w) > cells-1;
        })

        if(isOver) {
            console.log(isOver);
            console.log(oldLayout)
            layout.forEach((element, index) => {
                element.x = oldLayout[index].x;
                element.y = oldLayout[index].y;
                element.h = oldLayout[index].h;
                element.w = oldLayout[index].w;
            })
        }
        console.log("Resize has ended", layout);
    }

    const handleResize = useCallback(
        (layout, oldLayoutItem, layoutItem, placeholder) => {
            const heightDiff = layoutItem.h - oldLayoutItem.h;
            const widthDiff = layoutItem.w - oldLayoutItem.w;
            const changeCoef = oldLayoutItem.w / oldLayoutItem.h;
            if (Math.abs(heightDiff) < Math.abs(widthDiff)) {
                layoutItem.h = layoutItem.w / changeCoef;
                placeholder.h = layoutItem.w / changeCoef;
            } else {
                layoutItem.w = layoutItem.h * changeCoef;
                placeholder.w = layoutItem.h * changeCoef;
            }
        },
        []
    );

    


    return (
        <ResponsiveGridLayout
            className="layout"
            width={width}
            height={height}
            layouts={{ lg: layout }} // Define layouts for different breakpoints
            onResize={handleResize}
            onResizeStart={onResizeStartHandle}
            onResizeStop={onResizeEndHandle}
            breakpoints={{ lg: 1800, md: 996, sm: 768, xs: 480, xxs: 0 }}
            rowHeight={rowHeight}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 3 }}
            rows={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 3 }}

        >
            <div key="a" className='bg-slate-500 rounded-xl'><BarChart className='bg-red-700' /></div>
            <div key="b" className='bg-blue-700'>b</div>
            <div key="c" className='bg-green-700'>c</div>
        </ResponsiveGridLayout>
    );
}


export default DashboardCanvas;