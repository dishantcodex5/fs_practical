import { useState, useEffect } from "react";
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Loader2, Check, AlertCircle} from 'lucide-react'
import {updateCartCount} from "../../redux/slices/loginSlice"
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const isLogin = useSelector((state) => state.login.isLogin)
  const [loading, setLoading] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    setTotal(cart.reduce((acc, cur) => acc + cur.product.price*cur.quantity, 0))
  }, [cart])

  useEffect(() => {
    setLoading(true)
    axios.post(`${import.meta.env.VITE_BACKEND_API}/product/getcart`,{}, {
        withCredentials: true
    })
    .then((res) => {
        setCart(res.data.cart)
        dispatch(updateCartCount(res.data.cartCount))
        setLoading(false) 
    })
    .catch((err) => {
        console.log(err.message)
        setLoading(false)
    })
  }, []);

  const incrementQuantity = (id) => {
    const item = cart.find(item => item.product._id === id);
    if (item && item.quantity >= item.product.availableQuantity) {
      setError("Cannot add more than available stock.");
      setTimeout(() => setError(""), 3000);
      return;
    }
    
    setLoading(true)
    axios.post(`${import.meta.env.VITE_BACKEND_API}/product/addtocart`, {productId:id}, {
        withCredentials: true
    })
    .then((res) => {
        setCart((cart) => cart.map((item) => (item.product._id===id) ? ({...item, quantity:item.quantity+1}) : item))
        dispatch(updateCartCount(res.data.cartCount))
        setLoading(false)
    })
    .catch((err) => {
        console.log(err.message)
        setLoading(false)
    })
  };

  // Decrease quantity
  const decrementQuantity = (id) => {
    setLoading(true)
    axios.post(`${import.meta.env.VITE_BACKEND_API}/product/removefromcart`, {productId:id}, {
        withCredentials: true
    })
    .then((res) => {
        setCart((cart) => cart.map((item) => item.product._id===id ? ({...item, quantity:item.quantity-1}) : item).filter((item) => item.quantity>0))
        dispatch(updateCartCount(res.data.cartCount))
        setLoading(false)
    })
    .catch((err) => {
        console.log(err.message)
        setLoading(false)
    })
  };

  // Remove item from cart
  const removeItem = (id) => {
    setLoading(true)
    axios.post(`${import.meta.env.VITE_BACKEND_API}/product/deletefromcart`, {productId:id}, {
        withCredentials: true
    })
    .then((res) => {
        setCart((cart) => cart.filter(item => item.product._id !== id))
        dispatch(updateCartCount(res.data.cartCount))
        setLoading(false)
    })
    .catch((err) => {
        console.log(err)
        setLoading(false)
    })
  };

  const buyHandler = async (e) => {
    try {
      setLoading(true);
      // Create an array of products and their quantities to update
      const orderItems = cart.map(item => ({
        productId: item.product._id,
        quantity: item.quantity
      }));

      // Send order to backend
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/product/placeorder`,
        { orderItems },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setCart([]);
          dispatch(updateCartCount(0));
        }, 2000);
      }
    } catch (err) {
      console.error("Error placing order:", err);
      setError("Failed to place order. Please try again.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* {loading && <div className = 'z-100 top-0 left-0 min-h-[100vh] min-w-[100vw] fixed flex justify-center items-center'>
        <Loader2 className="w-10 h-10 animate-spin text-gray-600"/>
      </div>} */}
      {loading && (
        <>
          <div className="z-[100] opacity-10 top-0 left-0 min-h-[100vh] min-w-[100vw] fixed bg-black" />
          <Loader2 className="z-[100] opacity top-[45vh] left-[45vw] min-h-[10vh] min-w-[10vw] fixed flex justify-center w-10 opacity-100 h-10 animate-spin text-gray-800 " />
        </>
      )}

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 max-w-md w-auto bg-red-100 border border-red-400 text-red-700 px-8 py-3 rounded flex items-center gap-2 z-50 text-center justify-center shadow-lg"
          >
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl p-6 flex flex-col items-center relative z-50"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4"
              >
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Check className="w-8 h-8 text-green-600" />
                </motion.div>
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Order Placed Successfully!</h3>
              <p className="text-gray-600 text-center">
                Thank you for your purchase.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map(({product, quantity}) => (
            <div key={product._id} className="flex items-center gap-4 border-b pb-4 mb-4">
              <img src={product.photo} alt={product.name} className="w-24 h-24 object-cover rounded-md" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500">Price: ₹{product.price}</p>
                <p className="text-gray-500">{product.category} - {product.region}</p>

                <div className="flex items-center gap-2 mt-2">
                  <button 
                    onClick={() => decrementQuantity(product._id)} 
                    className="bg-gray-300 px-2 py-1 rounded"
                  > - </button>

                  <span>{quantity}</span>

                  <button 
                    onClick={() => {
                      if (product.availableQuantity === 0) {
                        setError("This product is out of stock.");
                        setTimeout(() => setError(""), 3000);
                        return;
                      }
                      if (quantity >= product.availableQuantity) {
                        setError("Cannot add more than available stock.");
                        setTimeout(() => setError(""), 3000);
                        return;
                      }
                      incrementQuantity(product._id);
                    }}
                    className="bg-gray-300 px-2 py-1 rounded"
                  > + </button>
                </div>

                <button 
                  onClick={() => removeItem(product._id)} 
                  className="text-red-500 mt-2"
                >Remove</button>
              </div>
            </div>
          ))}

          <div className="text-right font-bold text-lg">
            Total: ₹{total}
          </div>

          <button 
            onClick={buyHandler} 
            className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 hover:bg-yellow-600 transition-colors"
          >
            Proceed to Buy
          </button>
        </>
      )}
    </div>
  );
};

export default Cart