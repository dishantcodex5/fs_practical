// import { createBrowserRouter,createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
// import {useEffect} from 'react'
// import Home from './components/Home/Home.jsx'
// import Layout from './Layout.jsx'
// import Cart from './components/Cart/Cart.jsx'
// import Authentication from './components/Authentication/Authentication.jsx'
// import axios from 'axios'
// import { useDispatch } from "react-redux"
// import { login } from "./features/loginSlicer.js"
// import { ChatBox1, ChatBox2, ChatBox3, ChatBox4, ChatBox5, ChatBox6, ChatBox7, ChatBox8 } from "./components/Home/ChatBoxes.jsx"
// import {io} from 'socket.io-client'
// import CreateProduct from "./components/Products/CreateProduct.jsx"
// import ShowProducts from "./components/Products/ShowProducts.jsx"
// import AboutUs from "./components/Footer/AboutUs.jsx"
// import Profile from "./components/Header/Profile.jsx"
// import UserSearch from "./components/Header/UserSearch.jsx"
// import Chat from "./components/Extras/Chat.jsx"

// export const socket = io(import.meta.env.VITE_BACKEND_API)

// const router = createBrowserRouter(
//     createRoutesFromElements(
//       <>
//         <Route path='/' element={<Layout />}>
//           <Route index element={<Home />}></Route>
//           <Route path='/cart' element={<Cart/>}></Route>
//           <Route path='/auth' element={<Authentication/>}></Route>
//           <Route path='/chatbox1' element={<ChatBox1/>}></Route>
//           <Route path='/chatbox2' element={<ChatBox2/>}></Route>
//           <Route path='/chatbox3' element={<ChatBox3/>}></Route>
//           <Route path='/chatbox4' element={<ChatBox4/>}></Route>
//           <Route path='/chatbox5' element={<ChatBox5/>}></Route>
//           <Route path='/chatbox6' element={<ChatBox6/>}></Route>
//           <Route path='/chatbox7' element={<ChatBox7/>}></Route>
//           <Route path='/chatbox8' element={<ChatBox8/>}></Route>
//           <Route path='/addproduct' element={<CreateProduct />}></Route>
//           <Route path='/showproducts' element={<ShowProducts/>}></Route>
//           <Route path='/aboutus' element={<AboutUs/>}></Route>
//           <Route path='/profile' element={<Profile/>}></Route>
//           <Route path='/usersearch' element={<UserSearch/>}></Route>
//           <Route path='/chat' element={<Chat/>}></Route>
//         </Route>
//       </>
//     )
// )

// const App = () => {
//     console.log(import.meta.env)
//     const dispatch = useDispatch()
//     // useEffect(() => {
//         const fetchUser = (async () => {
//           try {
//             const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/user/getuser`, {
//               withCredentials: true,
//             });

//             if (res.status < 400) {
//               console.log("Redux has logged-in user");
//               console.log(`${import.meta.env.VITE_BACKEND_API}/user/getuser`)
//               console.log(res.data.data)
//               if (res.data.data){
//                 dispatch(login(res.data.data))
//               }

//             } else {
//               console.log("Redux has not logged-in user");
//             }
//           } catch (err) {
//             console.log("Axios error while fetching user");
//             console.log(err.message);
//           }
//         })();

//         // fetchUser(); // Calling the async function
//       // }, []);

//     return (
//         <>
//             <RouterProvider router = {router} />
//         </>
//     )
// }

// export default App

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from "./features/loginSlicer.js";
import Layout from "./Layout.jsx";
import Home from "./components/Home/Home.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Authentication from "./components/Authentication/Authentication.jsx";
import {
  ChatBox1,
  ChatBox2,
  ChatBox3,
  ChatBox4,
  ChatBox5,
  ChatBox6,
  ChatBox7,
  ChatBox8,
} from "./components/Home/ChatBoxes.jsx";
import { io } from "socket.io-client";
import CreateProduct from "./components/Products/CreateProduct.jsx";
import ShowProducts from "./components/Products/ShowProducts.jsx";
import AboutUs from "./components/Footer/AboutUs.jsx";
import Profile from "./components/Header/Profile.jsx";
import UserSearch from "./components/Header/UserSearch.jsx";
import Chat from "./components/Extras/Chat.jsx";
import { Loader2 } from "lucide-react";
import PrivateRoutes from "./components/utils/PrivateRoutes.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";

export const socket = io(import.meta.env.VITE_BACKEND_API);

console.log(location.pathname);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/auth" element={<Authentication />} />
      <Route path="/aboutus" element={<AboutUs />} />

      <Route element={<PrivateRoutes />}> 
        <Route path="/cart" element={<Cart />} />
        <Route path="/chatbox1" element={<ChatBox1 />} />
        <Route path="/chatbox2" element={<ChatBox2 />} />
        <Route path="/chatbox3" element={<ChatBox3 />} />
        <Route path="/chatbox4" element={<ChatBox4 />} />
        <Route path="/chatbox5" element={<ChatBox5 />} />
        <Route path="/chatbox6" element={<ChatBox6 />} />
        <Route path="/chatbox7" element={<ChatBox7 />} />
        <Route path="/chatbox8" element={<ChatBox8 />} />
        <Route path="/addproduct" element={<CreateProduct />} />
        <Route path="/showproducts" element={<ShowProducts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/usersearch" element={<UserSearch />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      {/* <Route path="/chat" element={<Chat />} /> */}
    </Route>
  )
);

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/user/getuser`,
          {
            withCredentials: true,
          }
        );

        if (res.status < 400 && res.data.data) {
          dispatch(login(res.data.data));
        }
      } catch (err) {
        console.log("Axios error while fetching user:", err.message);
      } finally {
        setLoading(false); // Ensure loading is set to false after request
      }
    };

    fetchUser();
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <div className="z-[100] opacity-10 top-0 left-0 min-h-[100vh] min-w-[100vw] fixed bg-black" />
        <Loader2 className="z-[100] opacity top-[45vh] left-[45vw] min-h-[10vh] min-w-[10vw] fixed flex justify-center w-10 opacity-100 h-10 animate-spin text-gray-800 " />
      </>
    );
  }

  return <RouterProvider router={router} />;
};

export default App;
