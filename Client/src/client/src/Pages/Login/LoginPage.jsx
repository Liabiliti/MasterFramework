import wsuLogo from "./wsu.png"
import background from "./background.jpg"
import { useNavigate } from 'react-router-dom'; // Import useHistory
import { useEffect, useState } from "react";
import { useFetchData } from '../../Hooks/useFetchData';
import { fetchUserInfo } from '../../Services/authenticationAPI';

function LoginPage() {

    const [user, setUser] = useState();
    const [failed, setFailed] = useState(true)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [triggerFetch, setTriggerFetch] = useState(false); // State to trigger fetch
    const navigate = useNavigate(); // Use useHistory hook
    
    const handleClick = async () => {
        // Directly call fetchUserInfo inside handleClick
        const response = await fetchUserInfo({ email, password });
        if (response && response.length > 0) {
            setFailed(true);
            navigate("/Dashboard");
        } else {
            setFailed(false);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <nav className="flex drop-shadow-2xl h-16 bg-gradient-to-r from-slate-50 from-20% via-purple-600 to-blue-600 justify-between items-center px-6">
                <img className='w-32' src={wsuLogo}></img>

            </nav>
            <div className="flex flex-row overflow-hidden relative">
                <main className="md:w-full md:h-screen">
                    <div className="w-full h-full"
                        style={{
                            background: `url(${background}`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}></div>
                </main>
                <aside className="md:absolute md:z-10 flex flex-col md:w-96 w-full h-full bg-white right-0 top-0  drop-shadow md:rounded-l-lg ">
                    <div className={`${failed !== false ? "invisible" : "visible"} h-24 sd:h-1/6 border bg-red-500 border-red-500 md:rounded-l-lg rounded-b-lg px-10 flex justify-center items-center`}>
                        <p className="text-slate-400 text-base text-white font-normal text-center">Invalid Email Address or Password</p>
                    </div>
                    <div className=" px-8 h-screen flex flex-col justify-center items-center pb-24">
                        <h1 className="text-3xl font-bold mb-2">Account Login</h1>
                        <p className="text-slate-400 text-sm font-normal text-center">Hello, welcome back to Western Sydney Airport!</p>
                        <input  type="text" 
                                placeholder="Email Address" 
                                className={`border ${failed !== false ? "border-black focus:outline-blue-600" : "border-red-500 focus:outline-red-500"} border-2 rounded-2xl text-sm max-w-96 w-full h-9 mt-10 px-3 py-1`}
                                onChange={(e) => setEmail(e.target.value)}></input>
                        <input  type="password" 
                                placeholder="Password" 
                                className={`border  ${failed !== false ? "border-black focus:outline-blue-600" : "border-red-500 focus:outline-red-500"} border-2 rounded-2xl text-sm max-w-96 w-full h-9 mt-5 px-3 py-1`}
                                onChange={(e) => setPassword(e.target.value)}></input>
                        <button 
                                className="border border-blue-500 bg-blue-500 font-semibold text-white text-sm border-2 rounded-xl max-w-96 w-full h-9 mt-10 px-3 hover:bg-blue-600 hover:border-blue-600"
                                onClick={handleClick}>Login</button>
                        <a className="text-slate-400 text-center mt-5 underline decoration-2 text-sm underline-offset-2 cursor-pointer">Forgot Password?</a>
                    </div>
                </aside>
            </div>
        </div>
    )

}

export default LoginPage;