import wsuLogo from "./wsu.png"
import background from "./background.jpg"
import { useNavigate } from 'react-router-dom'; // Import useHistory
import { useEffect, useState } from "react";
import { useFetchData } from '../../Hooks/useFetchData';
// import { fetchUserInfo } from '../../Services/authenticationAPI';
import { postData } from "../../Services/clientAPI";

function LoginPage() {

    const [failed, setFailed] = useState(true)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate(); // Use useHistory hook

    // const handleClick = async () => {
    //     // Directly call fetchUserInfo inside handleClick
    //     const response = await fetchUserInfo({ email, password });
    //     if (response && response.length > 0) {
    //         setFailed(true);
    //         navigate("/Dashboard");
    //     } else {
    //         setFailed(false);
    //     }
    // };


    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     console.log(username, password)
    //     try {
    //         const requestOptions = {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ username, password })
    //         };
    //         const response = await fetchUserInfo(requestOptions);
    //         if (response && response.length > 0) {
    //             setFailed(true);
    //             navigate("/Dashboard");

    //         } else {
    //             setFailed(false);
    //             setErrorMessage('Authentication failed');
    //         }
    //     } catch (error) {
    //         setErrorMessage('An error occurred');
    //     }
    // };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     console.log(username, password);
    //     try {
    //         // Define the request options
    //         const requestOptions = {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ username, password })
    //         };

    //         // Make the POST request to the backend
    //         const response = await fetch('http://localhost:3000/api/login', requestOptions);

    //         // Check if the request was successful
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }

    //         // Parse the response to JSON
    //         const data = await response.json();

    //         // Handle the response data
    //         if (data && data.message.length > 0) {
    //             setFailed(true);
    //             navigate("/Dashboard");
    //         } else {
    //             setFailed(false);
    //             setErrorMessage('Authentication failed');
    //         }
    //     } catch (error) {
    //         setErrorMessage('An error occurred');
    //     }
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await postData('auth/login', {
                username: username,
                password: password
            });
            console.log(data.message);
            if (data && data.message.length > 0) {
                setFailed(true);
                localStorage.setItem("token", data.message)
                navigate("/Dashboard");
            } else {
                setFailed(false);
                setErrorMessage('Authentication failed');
            }
        } catch (error) {
            setFailed(false);
            console.error('An error occurred:', error);
            setErrorMessage('An error occurred');
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <nav className="flex drop-shadow-2xl h-16 bg-gradient-to-r from-slate-50 from-20% via-purple-600 to-blue-600 justify-between items-center h-fit py-3 px-6">
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
                        <p className="text-slate-400 text-base text-white font-normal text-center">Invalid Email or Password</p>
                    </div>
                    {/* <div className=" px-8 h-screen flex flex-col justify-center items-center pb-24"> */}
                    <form onSubmit={handleSubmit} 
                        className=" px-8 h-screen flex flex-col justify-center items-center pb-24">
                        <h1 className="text-3xl font-bold mb-2">Account Login</h1>
                        <p className="text-slate-400 text-sm font-normal text-center">Hello, welcome back to Western Sydney Airport!</p>
                        <input type="text"
                            placeholder="Email Address"
                            name="username"
                            className={`border ${failed !== false ? "border-black focus:outline-blue-600" : "border-red-500 focus:outline-red-500"} border-2 rounded-2xl text-sm max-w-96 w-full h-9 mt-10 px-3 py-1`}
                            onChange={(e) => setUsername(e.target.value)}></input>
                        <input type="password"
                            placeholder="Password"
                            name="password"
                            className={`border  ${failed !== false ? "border-black focus:outline-blue-600" : "border-red-500 focus:outline-red-500"} border-2 rounded-2xl text-sm max-w-96 w-full h-9 mt-5 px-3 py-1`}
                            onChange={(e) => setPassword(e.target.value)}></input>
                        <button
                            type="submit"
                            value="Submit"
                            className="border border-blue-500 bg-blue-500 font-semibold text-white text-sm border-2 rounded-xl max-w-96 w-full h-9 mt-10 px-3 hover:bg-blue-600 hover:border-blue-600">Login</button>
                        <a className="text-slate-400 text-center mt-5 underline decoration-2 text-sm underline-offset-2 cursor-pointer">Forgot Password?</a>
                    </form>
                    {/* </div> */}
                </aside>
            </div>
        </div>
    )

}

export default LoginPage;