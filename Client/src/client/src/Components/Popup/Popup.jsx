import { useState } from "react";
import { IconX, IconPlus, IconMinus } from "@tabler/icons-react";

function Popup({ title, description, handleMenuBar, popup, setPopup }) {
    // const [popupOpen, setPopupOpen] = useState(open)

    return (
        <div>
            <div className={`${popup ? null : "hidden"} flex `}>
                <div id="overlay" className={`absolute inset-0 bg-slate-500 opacity-50`}></div>
                {/* <div className="mx-2 absolute z-10 bg-white w-auto  h-1/2 left-0 top-1/4 md:w-1/2 md:h-1/3 md:top-1/4 md:left-1/4  md:w-96 drop-shadow md:rounded-l-lg flex flex-col rounded-none pr-1"> */}
                <div className="absolute z-10 bg-white w-full sm:w-auto h-1/2 left-0 top-1/4 md:w-1/2 md:h-1/3 lg:h-1/2 md:top-1/4 md:left-1/4 md:w-96 drop-shadow flex flex-col rounded-lg pr-1">
                <IconX className={`self-end cursor-pointer m-4 text-slate-500 w-10 h-10`} onClick={() => setPopup(!popup)} />
                </div>
            </div>
        </div>
    )

}

export default Popup;