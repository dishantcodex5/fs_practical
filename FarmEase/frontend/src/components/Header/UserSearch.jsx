import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function UserSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (query) => {
    if (!query.trim()) {
      setUsers([]); 
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/user/filteruser`,{ search: query },{ withCredentials: true }
      );
      if (res.status < 400) {
        setUsers(res.data.users);
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  
  useEffect(() => {
    if (!searchTerm) {
      setUsers([]);
      return;
    }

    const delay = setTimeout(() => {
      fetchUsers(searchTerm);
    }, 500);

    return () => clearTimeout(delay); 
  }, [searchTerm]);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-green-50 to-green-100 py-8">
      <div className="max-w-3xl mx-auto w-full bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-2">Find Users</h2>
          <p className="text-gray-600">Connect with farmers and buyers in our community</p>
        </div>

        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search by username or email..."
            className="w-full p-4 pl-12 border-2 border-green-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="space-y-4 min-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center h-[400px]">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent"></div>
                <div className="rounded-full h-16 w-16 border-4 border-green-300 border-t-transparent absolute top-0 left-0 animate-[spin_1.5s_linear_infinite]"></div>
              </div>
            </div>
          ) : users.length > 0 ? (
            users.map((user, index) => (
              <NavLink key={index} to={`/profile?username=${encodeURIComponent(user.username)}`}>
                <div className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt="Avatar"
                        className="w-16 h-16 rounded-full object-cover border-2 border-green-500 group-hover:border-green-600 transition-colors"
                      />
                      <span className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs
                        ${user.isFarmer ? "bg-green-500" : "bg-blue-500"}`}>
                        {user.isFarmer ? "F" : "B"}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800 group-hover:text-green-700 transition-colors">
                        {user.username}
                      </h3>
                      <p className="text-gray-600 mb-2">{user.email}</p>
                      <span className={`inline-block text-sm px-4 py-1.5 rounded-full font-medium transition-colors
                        ${user.isFarmer 
                          ? "bg-green-100 text-green-700 group-hover:bg-green-200" 
                          : "bg-blue-100 text-blue-700 group-hover:bg-blue-200"}`}>
                        {user.isFarmer ? "Farmer" : "Buyer"}
                      </span>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] bg-white/50 rounded-xl p-8">
              <svg
                className="h-16 w-16 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <p className="text-gray-500 text-lg font-medium">No users found</p>
              <p className="text-gray-400 text-sm mt-2">Try searching with a different term</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserSearch;