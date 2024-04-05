import { IconX, IconPlus, IconMinus } from "@tabler/icons-react";
import { useState } from "react";

function MenuBar({ menuHeaders, itemsPerMenuHeader, handleMenuBar, open, setPopup }) {
    const [expandedHeaderIndex, setExpandedHeaderIndex] = useState(null);
    // const [popup, setPopup] = useState(false)
    console.log("Made it")

    const handleHeaderClick = (index) => {
        setExpandedHeaderIndex(index === expandedHeaderIndex ? null : index);
    };

    const handleItemClick = (event) => {
        handleMenuBar();
        setPopup(true);
        console.log("Index", event.target.value)

    };

    const iconStyling = "m-4 text-slate-500 w-10 h-10"

    return (
        <div className={`${open ? null : "hidden"}`}>
            <div id="overlay" className={`absolute inset-0 bg-slate-500 opacity-50`}></div>
            <div className="absolute z-10 bg-white right-0 top-0 h-screen md:w-96 w-full drop-shadow md:rounded-l-lg flex flex-col rounded-none pr-1">
                <IconX className={`self-end cursor-pointer ${iconStyling}`} onClick={handleMenuBar} />
                {menuHeaders ? menuHeaders.map((element, index) => {
                    return (
                        <div key={index} className="ml-6 ">
                            <div className="flex flex-row items-center justify-between cursor-pointer" onClick={() => handleHeaderClick(index)}>
                                <h1 className="text-3xl font-bold">{element}</h1>
                                {index === expandedHeaderIndex ? <IconMinus className={iconStyling} /> : <IconPlus className={iconStyling} />}

                            </div>
                            <ul className={`${index === expandedHeaderIndex ? '' : 'hidden'}`}>
                                {itemsPerMenuHeader && itemsPerMenuHeader[index] ? itemsPerMenuHeader[index].map((item, itemIndex) => {
                                    return (
                                        <li key={itemIndex} value={[index]} className="ml-10 mb-3 text-xl underline underline-offset-4 decoration-2 decoration-blue-500 font-semibold cursor-pointer" onClick={handleItemClick}>{item}</li>
                                    );
                                }) : null}
                            </ul>
                        </div>
                    );
                }) : null}
            </div>
        </div>
    );
}

export default MenuBar;
