// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { login, logout } from "../../features/loginSlicer.js";
// import { Loader2 } from "lucide-react";
// import { Navigate } from "react-router-dom";

// const Authentication = () => {
//   const [slider, changeSlider] = useState("signin");
//   const [regForm, setRegForm] = useState({
//     username: "",
//     email: "",
//     isFarmer: false,
//     password: "",
//   });
//   const [logForm, setLogForm] = useState({ username: "", password: "" });
//   const [file, setFile] = useState(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const { isLogin } = useSelector((state) => state.login);
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFile(file);
//   };

//   const handleRegChange = (e) => {
//     const { name, value } = e.target;
//     setRegForm({ ...regForm, [name]: value });
//   };

//   const handleLogChange = (e) => {
//     const { name, value } = e.target;
//     setLogForm({ ...logForm, [name]: value });
//   };

//   const registerHandler = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formdata = new FormData();
//     Object.entries(regForm).forEach(([key, value]) => {
//       formdata.append(key, value);
//     });
//     if (file) {
//       formdata.append("avatar", file);
//     }

//     await axios
//       .post(`${import.meta.env.VITE_BACKEND_API}/user/create`, formdata, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (res.status < 400) {
//           console.log("successfully registered");
//           console.log(res.data.data);
//           dispatch(login(res.data.data));
//           navigate("/");
//         } else {
//           console.log("fail to register");
//         }
//       })
//       .catch((err) => {
//         console.log("error while registering user", err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };
//   const loginHandler = async (e) => {
//     setLoading(true);
//     const loginData = {};
//     Object.entries(logForm).forEach(([key, value]) => {
//       loginData[key] = value;
//     });
//     e.preventDefault();
//     await axios
//       .post(`${import.meta.env.VITE_BACKEND_API}/user/login`, loginData, {
//         withCredentials: true,
//       })
//       .then((res) => {
//         if (res.status < 400) {
//           console.log("successfully logged in");
//           console.log(res.data.data);
//           dispatch(login(res.data.data));
//           navigate("/");
//         } else {
//           console.log("fail to login");
//         }
//       })
//       .catch((err) => {
//         console.log("failed to login with axios", err.message);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return isLogin ? (
//     <Navigate to="/" />
//   ) : (
//     <>
//       {loading && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//           <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
//           <div className="relative bg-white p-6 rounded-xl shadow-xl flex items-center gap-3">
//             <Loader2 className="w-6 h-6 animate-spin text-green-600" />
//             <p className="text-gray-700 font-medium">Please wait...</p>
//           </div>
//         </div>
//       )}

//       <div className="min-h-screen w-full bg-gradient-to-br from-green-50 to-emerald-50 py-16 px-4">
//         <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Auth Tabs */}
//           <div className="flex border-b border-gray-200">
//             <button
//               id="signin"
//               onClick={() => changeSlider("signin")}
//               className={`flex-1 py-4 text-center font-medium transition-all duration-200
//                                 ${
//                                   slider === "signin"
//                                     ? "text-green-600 border-b-2 border-green-600"
//                                     : "text-gray-500 hover:text-green-600"
//                                 }`}
//             >
//               Sign In
//             </button>
//             <button
//               id="signup"
//               onClick={() => changeSlider("signup")}
//               className={`flex-1 py-4 text-center font-medium transition-all duration-200
//                                 ${
//                                   slider === "signup"
//                                     ? "text-green-600 border-b-2 border-green-600"
//                                     : "text-gray-500 hover:text-green-600"
//                                 }`}
//             >
//               Sign Up
//             </button>
//           </div>

//           {/* Forms Container */}
//           <div
//             id="scroller"
//             className="flex transition-transform duration-500 ease-in-out"
//             style={{
//               transform: `translateX(${slider === "signin" ? "0%" : "-100%"})`,
//             }}
//           >
//             {/* Login Form */}
//             <div className="min-w-full p-8">
//               <form onSubmit={loginHandler} className="space-y-6">
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">
//                     Username or email address *
//                   </label>
//                   <input
//                     value={logForm.username}
//                     onChange={handleLogChange}
//                     name="username"
//                     type="text"
//                     className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300
//                                                  focus:ring-2 focus:ring-green-500 focus:border-transparent
//                                                  transition-all duration-200"
//                     placeholder="Enter your username or email"
//                   />
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">
//                     Password *
//                   </label>
//                   <input
//                     value={logForm.password}
//                     onChange={handleLogChange}
//                     name="password"
//                     type="password"
//                     className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300
//                                                  focus:ring-2 focus:ring-green-500 focus:border-transparent
//                                                  transition-all duration-200"
//                     placeholder="Enter your password"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700
//                                              text-white font-semibold rounded-lg shadow-md
//                                              hover:from-green-700 hover:to-green-800
//                                              focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
//                                              transform transition-all duration-200 hover:-translate-y-0.5"
//                 >
//                   Sign In
//                 </button>
//                 <button
//                   type="button"
//                   className="w-full text-sm text-green-600 hover:text-green-700 
//                                              transition-colors duration-200"
//                 >
//                   Forgot your password?
//                 </button>
//               </form>
//             </div>

//             {/* Register Form */}
//             <div className="min-w-full p-8">
//               <form onSubmit={registerHandler} className="space-y-4">
//                 {/* Username Field */}
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">
//                     Username *
//                   </label>
//                   <input
//                     value={regForm.username}
//                     onChange={handleRegChange}
//                     required
//                     name="username"
//                     type="text"
//                     className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300
//                                                  focus:ring-2 focus:ring-green-500 focus:border-transparent
//                                                  transition-all duration-200"
//                     placeholder="Choose a username"
//                   />
//                 </div>

//                 {/* Email Field */}
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">
//                     Email address *
//                   </label>
//                   <input
//                     value={regForm.email}
//                     onChange={handleRegChange}
//                     required
//                     name="email"
//                     type="email"
//                     className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300
//                                                  focus:ring-2 focus:ring-green-500 focus:border-transparent
//                                                  transition-all duration-200"
//                     placeholder="Enter your email"
//                   />
//                 </div>

//                 {/* Avatar Upload */}
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">
//                     Profile Picture (optional)
//                   </label>
//                   <div className="mt-2">
//                     <input
//                       onChange={handleFileChange}
//                       name="avatar"
//                       type="file"
//                       className="w-full px-4 py-3 rounded-lg border border-gray-300
//                                                      file:mr-4 file:py-2 file:px-4 file:rounded-full
//                                                      file:border-0 file:text-sm file:font-medium
//                                                      file:bg-green-50 file:text-green-700
//                                                      hover:file:bg-green-100
//                                                      transition-all duration-200"
//                     />
//                   </div>
//                 </div>

//                 {/* Role Selection */}
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">
//                     Role
//                   </label>
//                   <div className="mt-2 flex gap-6">
//                     <div className="flex items-center">
//                       <input
//                         type="radio"
//                         id="farmer"
//                         name="isFarmer"
//                         value={true}
//                         onChange={handleRegChange}
//                         className="w-4 h-4 text-green-600 border-gray-300
//                                                          focus:ring-green-500"
//                       />
//                       <label
//                         htmlFor="farmer"
//                         className="ml-2 text-sm text-gray-700"
//                       >
//                         Farmer
//                       </label>
//                     </div>
//                     <div className="flex items-center">
//                       <input
//                         type="radio"
//                         id="consumer"
//                         name="isFarmer"
//                         value={false}
//                         onChange={handleRegChange}
//                         defaultChecked
//                         className="w-4 h-4 text-green-600 border-gray-300
//                                                          focus:ring-green-500"
//                       />
//                       <label
//                         htmlFor="consumer"
//                         className="ml-2 text-sm text-gray-700"
//                       >
//                         Consumer
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Password Field */}
//                 <div>
//                   <label className="text-sm font-medium text-gray-700">
//                     Password *
//                   </label>
//                   <input
//                     value={regForm.password}
//                     onChange={handleRegChange}
//                     required
//                     name="password"
//                     type="password"
//                     className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300
//                                                  focus:ring-2 focus:ring-green-500 focus:border-transparent
//                                                  transition-all duration-200"
//                     placeholder="Enter your password"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700
//                                              text-white font-semibold rounded-lg shadow-md
//                                              hover:from-green-700 hover:to-green-800
//                                              focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
//                                              transform transition-all duration-200 hover:-translate-y-0.5"
//                 >
//                   Register
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Authentication;
"use client"

import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { login } from "../../features/loginSlicer.js"
import { Loader2, AlertCircle } from "lucide-react"
import { Navigate } from "react-router-dom"

const Authentication = () => {
  const [slider, changeSlider] = useState("signin")
  const [regForm, setRegForm] = useState({
    username: "",
    email: "",
    isFarmer: false,
    password: "",
  })
  const [logForm, setLogForm] = useState({ username: "", password: "" })
  const [file, setFile] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { isLogin } = useSelector((state) => state.login)

  // Add error state variables
  const [loginError, setLoginError] = useState("")
  const [registerError, setRegisterError] = useState("")

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFile(file)
  }

  const handleRegChange = (e) => {
    const { name, value } = e.target
    setRegForm({ ...regForm, [name]: value })
    // Clear error when user starts typing
    setRegisterError("")
  }

  const handleLogChange = (e) => {
    const { name, value } = e.target
    setLogForm({ ...logForm, [name]: value })
    // Clear error when user starts typing
    setLoginError("")
  }

  const registerHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    setRegisterError("") // Clear previous errors

    const formdata = new FormData()
    Object.entries(regForm).forEach(([key, value]) => {
      formdata.append(key, value)
    })
    if (file) {
      formdata.append("avatar", file)
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/user/create`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })

      if (res.status < 400) {
        console.log("successfully registered")
        console.log(res.data.data)
        dispatch(login(res.data.data))
        navigate("/")
      } else {
        setRegisterError("Failed to register. Please try again.")
      }
    } catch (err) {
      console.log("error while registering user", err)
      setRegisterError(
        err.response?.data?.message || "Registration failed. Please check your information and try again.",
      )
    } finally {
      setLoading(false)
    }
  }

  const loginHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    setLoginError("") // Clear previous errors

    const loginData = {}
    Object.entries(logForm).forEach(([key, value]) => {
      loginData[key] = value
    })

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_API}/user/login`, loginData, {
        withCredentials: true,
      })

      if (res.status < 400) {
        console.log("successfully logged in")
        console.log(res.data.data)
        dispatch(login(res.data.data))
        navigate("/")
      } else {
        setLoginError("Failed to login. Please check your credentials.")
      }
    } catch (err) {
      console.log("failed to login with axios", err.message)
      setLoginError(err.response?.data?.message || "Invalid username or password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Error message component
  const ErrorMessage = ({ message }) => {
    if (!message) return null

    return (
      <div className="flex items-center gap-2 p-3 mt-3 text-red-700 bg-red-50 rounded-lg border border-red-200">
        <AlertCircle className="w-5 h-5" />
        <p className="text-sm">{message}</p>
      </div>
    )
  }

  return isLogin ? (
    <Navigate to="/" />
  ) : (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          <div className="relative bg-white p-6 rounded-xl shadow-xl flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-green-600" />
            <p className="text-gray-700 font-medium">Please wait...</p>
          </div>
        </div>
      )}

      <div className="min-h-screen w-full bg-gradient-to-br from-green-50 to-emerald-50 py-16 px-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Auth Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              id="signin"
              onClick={() => {
                changeSlider("signin")
                setLoginError("")
                setRegisterError("")
              }}
              className={`flex-1 py-4 text-center font-medium transition-all duration-200
                                ${
                                  slider === "signin"
                                    ? "text-green-600 border-b-2 border-green-600"
                                    : "text-gray-500 hover:text-green-600"
                                }`}
            >
              Sign In
            </button>
            <button
              id="signup"
              onClick={() => {
                changeSlider("signup")
                setLoginError("")
                setRegisterError("")
              }}
              className={`flex-1 py-4 text-center font-medium transition-all duration-200
                                ${
                                  slider === "signup"
                                    ? "text-green-600 border-b-2 border-green-600"
                                    : "text-gray-500 hover:text-green-600"
                                }`}
            >
              Sign Up
            </button>
          </div>

          {/* Forms Container */}
          <div
            id="scroller"
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(${slider === "signin" ? "0%" : "-100%"})`,
            }}
          >
            {/* Login Form */}
            <div className="min-w-full p-8">
              <form onSubmit={loginHandler} className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">Username or email address *</label>
                  <input
                    value={logForm.username}
                    onChange={handleLogChange}
                    name="username"
                    type="text"
                    className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300
                                                 focus:ring-2 focus:ring-green-500 focus:border-transparent
                                                 transition-all duration-200"
                    placeholder="Enter your username or email"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Password *</label>
                  <input
                    value={logForm.password}
                    onChange={handleLogChange}
                    name="password"
                    type="password"
                    className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300
                                                 focus:ring-2 focus:ring-green-500 focus:border-transparent
                                                 transition-all duration-200"
                    placeholder="Enter your password"
                  />
                </div>

                {/* Login Error Message */}
                <ErrorMessage message={loginError} />

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700
                                             text-white font-semibold rounded-lg shadow-md
                                             hover:from-green-700 hover:to-green-800
                                             focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                                             transform transition-all duration-200 hover:-translate-y-0.5"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className="w-full text-sm text-green-600 hover:text-green-700 
                                             transition-colors duration-200"
                >
                  Forgot your password?
                </button>
              </form>
            </div>

            {/* Register Form */}
            <div className="min-w-full p-8">
              <form onSubmit={registerHandler} className="space-y-4">
                {/* Username Field */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Username *</label>
                  <input
                    value={regForm.username}
                    onChange={handleRegChange}
                    required
                    name="username"
                    type="text"
                    className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300
                                                 focus:ring-2 focus:ring-green-500 focus:border-transparent
                                                 transition-all duration-200"
                    placeholder="Choose a username"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Email address *</label>
                  <input
                    value={regForm.email}
                    onChange={handleRegChange}
                    required
                    name="email"
                    type="email"
                    className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300
                                                 focus:ring-2 focus:ring-green-500 focus:border-transparent
                                                 transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Avatar Upload */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Profile Picture (optional)</label>
                  <div className="mt-2">
                    <input
                      onChange={handleFileChange}
                      name="avatar"
                      type="file"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300
                                                     file:mr-4 file:py-2 file:px-4 file:rounded-full
                                                     file:border-0 file:text-sm file:font-medium
                                                     file:bg-green-50 file:text-green-700
                                                     hover:file:bg-green-100
                                                     transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Role Selection */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <div className="mt-2 flex gap-6">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="farmer"
                        name="isFarmer"
                        value={true}
                        onChange={handleRegChange}
                        className="w-4 h-4 text-green-600 border-gray-300
                                                         focus:ring-green-500"
                      />
                      <label htmlFor="farmer" className="ml-2 text-sm text-gray-700">
                        Farmer
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="consumer"
                        name="isFarmer"
                        value={false}
                        onChange={handleRegChange}
                        defaultChecked
                        className="w-4 h-4 text-green-600 border-gray-300
                                                         focus:ring-green-500"
                      />
                      <label htmlFor="consumer" className="ml-2 text-sm text-gray-700">
                        Consumer
                      </label>
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Password *</label>
                  <input
                    value={regForm.password}
                    onChange={handleRegChange}
                    required
                    name="password"
                    type="password"
                    className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300
                                                 focus:ring-2 focus:ring-green-500 focus:border-transparent
                                                 transition-all duration-200"
                    placeholder="Enter your password"
                  />
                </div>

                {/* Register Error Message */}
                <ErrorMessage message={registerError} />

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700
                                             text-white font-semibold rounded-lg shadow-md
                                             hover:from-green-700 hover:to-green-800
                                             focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                                             transform transition-all duration-200 hover:-translate-y-0.5"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Authentication

