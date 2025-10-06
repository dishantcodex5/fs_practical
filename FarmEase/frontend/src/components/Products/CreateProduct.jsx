import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Loader2, Upload, IndianRupee, Tags, MapPin, Scale } from "lucide-react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {useNavigate} from "react-router-dom"

const CreateProduct = () => {
  const [product, setProduct] = useState({});
  const user = useSelector((state) => state.login.user);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const navi = new useNavigate();

  const handleProductChange = (e) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setProduct({ ...product, [e.target.name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    
    // Calculate pricePerUnit based on price and quantityUnit
    const pricePerUnit = product.price;
    const formData = {
      ...product,
      pricePerUnit
    };

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (photo) {
      data.append("photo", photo);
    }

    data.append("owner", user._id);
    
    axios
      .post(`${import.meta.env.VITE_BACKEND_API}/product/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status == 200) {
          console.log("product created successfully");
          navi(`/profile?username=${user.username}`);
        } else {
          console.log("error while creating product");
        }
        setPhoto(null);
        setProduct({});
        e.target.reset();
        setLoading(false);
        setImagePreview(null);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return user.isFarmer ? (
    <>
      {/* Loading Overlay */}
      {loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white p-6 rounded-xl shadow-xl flex items-center gap-3"
          >
            <Loader2 className="w-6 h-6 animate-spin text-green-600" />
            <p className="text-gray-700 font-medium">Creating product...</p>
          </motion.div>
        </motion.div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Form Card */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
              <h2 className="text-2xl font-bold text-white">Add New Product</h2>
              <p className="text-green-100 mt-1">Fill in the details below</p>
            </div>

            {/* Form */}
            <form onSubmit={submitHandler} className="p-6 space-y-6">
              {/* Product Name */}
              <div>
                <label className="text-sm font-medium text-gray-700">Product Name</label>
                <input
                  name="name"
                  onChange={handleProductChange}
                  type="text"
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200
                           focus:ring-2 focus:ring-green-500 focus:border-transparent
                           transition-all duration-200"
                  placeholder="e.g. Fresh Organic Tomatoes"
                  required
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="text-sm font-medium text-gray-700">Product Photo</label>
                <div className="mt-2">
                  <label className={`group relative flex flex-col items-center justify-center w-full h-64
                    border-2 border-gray-300 border-dashed rounded-xl
                    hover:border-green-500 transition-colors cursor-pointer
                    ${imagePreview ? 'border-green-500' : ''}`}>
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <img 
                          src={imagePreview} 
                          alt="Product preview" 
                          className="w-full h-full object-contain p-2 rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity 
                                      rounded-xl flex items-center justify-center">
                          <p className="text-white text-sm font-medium">Click to change image</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 text-center p-6">
                        <Upload className="mx-auto h-12 w-12 text-gray-400 group-hover:text-green-500" />
                        <div className="text-sm text-gray-600">
                          <span className="font-medium text-green-600">Click to upload</span>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG</p>
                        </div>
                      </div>
                    )}
                    <input
                      name="photo"
                      onChange={handleFileChange}
                      type="file"
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>

              {/* Price, Unit and Available Quantity in Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">Price per Unit (₹)</label>
                  <div className="mt-2 relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      name="price"
                      onChange={handleProductChange}
                      type="number"
                      step="0.01"
                      min="0"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200
                               focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Quantity Unit</label>
                  <div className="mt-2 relative">
                    <Scale className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      name="quantityUnit"
                      onChange={handleProductChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200
                               focus:ring-2 focus:ring-green-500 focus:border-transparent
                               appearance-none bg-white"
                      required
                    >
                      <option value="">Select Unit</option>
                      <option value="kg">Kilogram (kg)</option>
                      <option value="g">Gram (g)</option>
                      <option value="piece">Piece</option>
                      <option value="dozen">Dozen</option>
                      <option value="liter">Liter</option>
                      <option value="ml">Milliliter (ml)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Available Quantity</label>
                  <div className="mt-2 relative">
                    <Scale className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      name="availableQuantity"
                      onChange={handleProductChange}
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200
                               focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Available quantity"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Category & Region Side by Side */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Category */}
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <div className="mt-2 relative">
                    <Tags className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      name="category"
                      onChange={handleProductChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 
                               focus:ring-2 focus:ring-green-500 focus:border-transparent
                               appearance-none bg-white"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Fruits">Fruits</option>
                      <option value="Vegetables">Vegetables</option>
                      <option value="Dairy Products">Dairy Products</option>
                      <option value="Farm Core">Farm Core</option>
                      <option value="Dryfruits">Dryfruits</option>
                    </select>
                  </div>
                </div>
                {/* Region */}
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">Region</label>
                  <div className="mt-2 relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      name="region"
                      onChange={handleProductChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200
                               focus:ring-2 focus:ring-green-500 focus:border-transparent
                               appearance-none bg-white"
                      required
                    >
                      <option value="">Select Region</option>
                      <option value="Northern India">Northern India</option>
                      <option value="Southern India">Southern India</option>
                      <option value="Eastern India">Eastern India</option>
                      <option value="Western India">Western India</option>
                      <option value="Central India">Central India</option>
                      <option value="Northeastern India">Northeastern India</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  onChange={handleProductChange}
                  rows="4"
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200
                           focus:ring-2 focus:ring-green-500 focus:border-transparent
                           resize-none"
                  placeholder="Describe your product in detail..."
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 
                         text-white text-lg font-semibold rounded-xl shadow-lg
                         hover:from-green-700 hover:to-green-800 
                         focus:ring-4 focus:ring-green-500/50
                         transform transition-all duration-200"
              >
                Create Product
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default CreateProduct;
