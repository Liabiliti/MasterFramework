import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import BarChart from '../../Widgets/BarChart';

// Create a ResponsiveGridLayout component using WidthProvider
const ResponsiveGridLayout = WidthProvider(Responsive);

class MyGrid extends React.Component {
 render() {
    const layout = [
      { i: 'a', x: 0, y: 0, w: 1, h: 2 },
      { i: 'b', x: 1, y: 0, w: 3, h: 2 },
      { i: 'c', x: 4, y: 0, w: 1, h: 2 }
    ];

    return (
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }} // Define layouts for different breakpoints
        breakpoints={{ lg: 1800, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rows={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        
      >
        <div key="a" className='bg-slate-500 rounded-xl'><BarChart  className='bg-red-700'/></div>
        <div key="b" className='bg-blue-700'>b</div>
        <div key="c" className='bg-green-700'>c</div>
      </ResponsiveGridLayout>
    );
 }
}

export default MyGrid;
