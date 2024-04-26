import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { IconMenu2 } from "@tabler/icons-react";
import './App.css';
import './index.css';
import BarChart from './Widgets/BarChart';
import MenuBar from './Components/Menu/MenuBar';
import Popup from './Components/Popup/Popup';
import { useFetchData } from './Hooks/useFetchData';
// import { fetchUserInfo } from './Services/authenticationAPI';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from './Router';
import { RouterProvider } from 'react-router-dom';


const queryClient = new QueryClient();

function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  )
}

export default App
