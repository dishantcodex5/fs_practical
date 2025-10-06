import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Trash2, X, Check, MapPin, ShoppingCart, Pencil } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { updateCartCount } from "../../redux/slices/loginSlice";

const ProductBox = ({ product, onDelete }) => {
  // Hide dummy or invalid products
  if (!product || !product._id || !product.name) return null;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCartSuccess, setShowCartSuccess] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAddQuantity, setEditAddQuantity] = useState(0);
  const [editRemoveQuantity, setEditRemoveQuantity] = useState(0);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [editPrice, setEditPrice] = useState(product.price);

  // Debug logs
  console.log("=== Delete Button Debug ===");
  console.log("Current user:", {
    id: user?._id,
    username: user?.username,
    isFarmer: user?.isFarmer
  });
  console.log("Product owner:", {
    id: product.owner._id,
    username: product.owner.username
  });

  // Check if current user is the owner of the product
  const isOwnProduct = user?.isFarmer && user?._id && product.owner._id && 
                      user._id.toString() === product.owner._id.toString();

  const onProfile = (e) => {
    e.stopPropagation();
    navigate(`/profile?username=${encodeURIComponent(product.owner.username)}`);
  };

  const cartHandler = async (e) => {
    e.stopPropagation();
    
    // Check if product is out of stock
    if (product.availableQuantity <= 0) {
      return;
    }
    
    let self = e.target;
    self.classList.add('scale-125');
    setTimeout(() => {
      self.classList.remove('scale-125');
    }, 40);
    
    try {
      console.log("Adding to cart...");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/product/addtocart`,
        { productId: product._id },
        { withCredentials: true }
      );
      
      if (response.status === 200) {
        console.log("Cart response:", response.data);
        console.log("New cart count:", response.data.cartCount);
        // Update cart count in Redux
        dispatch(updateCartCount(response.data.cartCount));
        // Show success popup
        setShowCartSuccess(true);
        setTimeout(() => {
          setShowCartSuccess(false);
        }, 2000);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      console.log("Deleting product with ID:", product._id);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/product/deleteproduct`,
        { productId: product._id },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setShowDeleteModal(false);
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          onDelete && onDelete(product._id);
        }, 2000);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform overflow-hidden w-full max-w-sm">
        {/* Product Image and Category Badge */}
        <div className="relative">
          <img
            src={product.photo}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <span className="absolute top-3 left-3 bg-green-900/90 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium">
            {product.category}
          </span>
          {isOwnProduct && (
            <>
              <button
                onClick={handleDelete}
                className="absolute top-3 right-3 bg-red-500/90 hover:bg-red-600/90 text-white p-2 rounded-full transition-all duration-200 transform hover:scale-105 z-10"
                title="Delete Product"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowEditModal(true)}
                className="absolute top-3 right-12 bg-blue-500/90 hover:bg-blue-600/90 text-white p-2 rounded-full transition-all duration-200 transform hover:scale-105 z-10"
                title="Edit Product"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </>
          )}
          
          {/* Out of Stock Badge */}
          {product.availableQuantity <= 0 && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold transform -rotate-12 scale-110">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-4">
          {/* Name and Description */}
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
          </div>

          {/* Region */}
          <div className="flex items-center gap-1.5 mb-3">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-600">{product.region}</span>
          </div>

          {/* Price and Actions */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-green-950">₹{product.price}</span>
                <span className="text-sm text-gray-500">per {product.quantityUnit}</span>
              </div>
              {isOwnProduct && (
                <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  Stock: {product.availableQuantity} {product.quantityUnit}
                </span>
              )}
            </div>

            {!isOwnProduct && (
              <button 
                onClick={cartHandler}
                disabled={product.availableQuantity <= 0}
                className={`w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200
                  ${product.availableQuantity <= 0 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-green-900 text-white hover:bg-green-950 active:scale-[0.98]'}`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">
                  {product.availableQuantity <= 0 ? 'Out of Stock' : 'Add to Cart'}
                </span>
              </button>
            )}
          </div>

          {/* Farmer Info */}
          <div 
            onClick={onProfile}
            className="flex items-center pt-4 mt-4 border-t border-gray-100 cursor-pointer group/owner"
          >
            <div className="relative">
              <img
                src={product.owner.avatar}
                alt={product.owner.username}
                className="w-8 h-8 rounded-full border-2 border-green-900 group-hover/owner:border-green-950 transition-colors"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-900 rounded-full flex items-center justify-center text-white text-[10px] font-medium">
                F
              </span>
            </div>
            <div className="ml-2">
              <span className="text-sm font-semibold text-gray-700 group-hover/owner:text-green-950 transition-colors">
                {product.owner.username}
              </span>
              <p className="text-xs text-gray-500">Farmer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Success Popup */}
      <AnimatePresence>
        {showCartSuccess && (
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Added to Cart</h3>
              <p className="text-gray-600 text-center">
                {product.name} has been added to your cart.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowDeleteModal(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md relative z-50"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Delete Product</h3>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{product.name}"? This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Product Deleted</h3>
              <p className="text-gray-600 text-center">
                Your product has been successfully deleted.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Product Modal */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowEditModal(false)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md relative z-50"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Edit Product</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setEditLoading(true);
                  setEditError("");
                  let newQuantity = product.availableQuantity + Number(editAddQuantity) - Number(editRemoveQuantity);
                  if (newQuantity < 0) newQuantity = 0;
                  try {
                    const url = `${import.meta.env.VITE_BACKEND_API}/product/updatestock`;
                    console.log('Calling update endpoint:', url);
                    const response = await axios.post(
                      url,
                      {
                        productId: product._id,
                        quantity: newQuantity,
                        price: parseInt(editPrice, 10)
                      },
                      { withCredentials: true }
                    );
                    if (response.status === 200) {
                      setShowEditModal(false);
                      window.location.reload();
                    } else {
                      setEditError(response.data.message || "Failed to update product");
                    }
                  } catch (err) {
                    setEditError(err.response?.data?.message || "Failed to update product");
                  } finally {
                    setEditLoading(false);
                  }
                }}
              >
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Current Quantity: <span className="font-bold">{product.availableQuantity} {product.quantityUnit}</span>
                  </label>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-green-700 font-medium mb-1" htmlFor="add-qty">Add to Stock</label>
                      <div className="flex items-center gap-1">
                        <span className="text-green-600 text-lg font-bold">+</span>
                        <input
                          id="add-qty"
                          type="number"
                          min="0"
                          value={editAddQuantity}
                          onChange={e => setEditAddQuantity(Number(e.target.value))}
                          className="w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-red-700 font-medium mb-1" htmlFor="remove-qty">Remove from Stock</label>
                      <div className="flex items-center gap-1">
                        <span className="text-red-600 text-lg font-bold">-</span>
                        <input
                          id="remove-qty"
                          type="number"
                          min="0"
                          value={editRemoveQuantity}
                          onChange={e => setEditRemoveQuantity(Number(e.target.value))}
                          className="w-full border border-red-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="edit-price">
                    Price per {product.quantityUnit}:
                  </label>
                  <input
                    id="edit-price"
                    type="number"
                    min="0"
                    value={editPrice}
                    onChange={e => setEditPrice(e.target.value)}
                    className="w-full border border-blue-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                {editError && <p className="text-red-500 mb-2">{editError}</p>}
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={editLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                    disabled={editLoading}
                  >
                    {editLoading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductBox;
