import { useState } from "react";
import { IconX, IconPlus, IconMinus } from "@tabler/icons-react";

function Popup({ popUpMessage, popup, setPopup }) {
    // const [popupOpen, setPopupOpen] = useState(open)

    return (
        <div className="overflow-hidden w-full h-full">
            <div className={`${popup ? null : "hidden"} absolute top-0 left-0 w-full h-full flex justify-center items-center`}>
                {/* <div className="absolute z-10 opacity-100 bg-white w-full sm:w-auto h-1/2 left-0 top-1/4 md:w-1/2 md:h-1/3 lg:h-1/2 md:top-1/4 md:left-1/4 md:w-96 drop-shadow flex flex-col rounded-lg pr-1"> */}
                
                <div className="relative z-10 opacity-100 bg-white w-96 h-80 rounded-lg flex flex-col ">
                    <IconX className={`self-end cursor-pointer mt-4 mr-4 text-slate-500 w-fit max-h-12 h-full`} onClick={() => setPopup(!popup)} />
                    {popUpMessage && popUpMessage}
                </div>
                <div id="overlay" className={`absolute inset-0 bg-slate-500 opacity-50 flex`}>
                </div>
                
            </div>
        </div>
    )

}

export default Popup;