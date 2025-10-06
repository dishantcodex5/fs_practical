import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { motion } from 'framer-motion'
import { MapPin, ShoppingBag, Mail, MessageCircle } from 'lucide-react'
import ProductBox from '../Products/ProductBox'

const Profile = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const username = searchParams.get('username')
    const curuser = useSelector((state) => state.login.user) || {username: '', email: '', avatar: '#'}
    const isLogin = useSelector((state) => state.login.isLogin)
    const [user, setUser] = useState({
        username: 'none',
        avatar: '',
        isFarmer: false,
        products: [],
        email: 'none'
    })

    useEffect(() => {
        if (!isLogin){
            navigate('/')
        }
        axios.post(`${import.meta.env.VITE_BACKEND_API}/user/searchuser`, { username })
            .then((res) => {
                if (res.status < 400) {
                    if (!res.data.user) return
                    // Ensure each product has owner information
                    const userWithProducts = res.data.user;
                    userWithProducts.products = userWithProducts.products.map(product => ({
                        ...product,
                        owner: {
                            _id: userWithProducts._id,
                            username: userWithProducts.username,
                            avatar: userWithProducts.avatar,
                            isFarmer: userWithProducts.isFarmer
                        }
                    }));
                    setUser(userWithProducts);
                    console.log("Products with owner info:", userWithProducts.products);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [username])

    const handleProductDelete = (deletedProductId) => {
        setUser(prevUser => ({
            ...prevUser,
            products: prevUser.products.filter(product => product._id !== deletedProductId)
        }));
    };

    const handleSendMessage = () => {
        console.log(`Sending message to ${user.username}`)
        navigate(`/chat?with=${encodeURIComponent(user.username)}`)
    }

    return (
        <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-green-50 to-green-100 py-8">
            <div className="container mx-auto px-4">
                {/* Profile Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-2xl shadow-xl mb-8"
                >
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="relative">
                            <img
                                src={user.avatar}
                                alt={user.username}
                                className="w-24 h-24 rounded-full object-cover border-4 border-green-100"
                            />
                            <span className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium
                                ${user.isFarmer ? "bg-green-500" : "bg-blue-500"}`}>
                                {user.isFarmer ? "F" : "B"}
                            </span>
                        </div>
                        
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.username}</h2>
                            <div className="flex flex-col md:flex-row items-center gap-4 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    <span>{user.email}</span>
                                </div>
                            </div>
                        </div>

                        {username !== curuser.username && (
                            <button
                                onClick={handleSendMessage}
                                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 
                                         transition-colors duration-200 flex items-center gap-2"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Message
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Products Section */}
                {user.isFarmer && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-6 rounded-2xl shadow-xl"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <ShoppingBag className="w-5 h-5 text-green-600" />
                            <h3 className="text-xl font-semibold text-gray-900">Product Listings</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-fr">
                            {user.products.length > 0 ? (
                                user.products.map((product, idx) => (
                                    <ProductBox 
                                        key={product._id || idx}
                                        product={product}
                                        onDelete={handleProductDelete}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12 text-gray-500">
                                    <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-40" />
                                    <p>No products listed yet.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default Profile
