import React, { useEffect, useState } from "react";
import axios from "axios";

const FarmerDashboard = () => {
  const [farmerProfile, setFarmerProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [profileRes, productsRes, ordersRes] = await Promise.all([
          axios.get("/farmer/profile", { withCredentials: true }),
          axios.get("/dashboard/inventory", { withCredentials: true }),
          axios.get("/farmer/orders", { withCredentials: true }),
        ]);
        setFarmerProfile(profileRes.data);
        setProducts(Array.isArray(productsRes.data) ? productsRes.data : []);
        setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center text-lg">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-green-50 py-8 px-2 md:px-8">
      {/* Profile Section */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h1 className="text-3xl font-bold text-green-900 mb-4 flex items-center gap-2">
          <span className="inline-block"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-8 h-8 mr-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' /></svg></span>
          Farmer Profile
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-green-800 mb-2">Personal Information</h2>
            <p className="text-gray-700"><span className="font-medium">Name:</span> {farmerProfile?.name}</p>
            <p className="text-gray-700"><span className="font-medium">Email:</span> {farmerProfile?.email}</p>
            <p className="text-gray-700"><span className="font-medium">Phone:</span> {farmerProfile?.phone}</p>
            <p className="text-gray-700"><span className="font-medium">Address:</span> {farmerProfile?.address}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-green-800 mb-2">Farm Information</h2>
            <p className="text-gray-700"><span className="font-medium">Farm Name:</span> {farmerProfile?.farmName}</p>
            <p className="text-gray-700"><span className="font-medium">Location:</span> {farmerProfile?.farmLocation}</p>
            <p className="text-gray-700"><span className="font-medium">Certification:</span> {farmerProfile?.certification || 'Not Certified'}</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-4xl text-green-800 mb-2"><i className="fa fa-box"></i></span>
          <div className="text-3xl font-bold text-green-900">{products.filter(p => p.status === 'active').length}</div>
          <div className="text-gray-500">Active Products</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-4xl text-green-800 mb-2"><i className="fa fa-shopping-cart"></i></span>
          <div className="text-3xl font-bold text-green-900">{orders.length}</div>
          <div className="text-gray-500">Total Orders</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-4xl text-green-800 mb-2"><i className="fa fa-rupee-sign"></i></span>
          <div className="text-3xl font-bold text-green-900">₹{orders.reduce((sum, order) => sum + order.total, 0)}</div>
          <div className="text-gray-500">Total Revenue</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-4xl text-yellow-600 mb-2"><i className="fa fa-exclamation-triangle"></i></span>
          <div className="text-3xl font-bold text-yellow-700">{products.filter(p => p.stock <= 5).length}</div>
          <div className="text-gray-500">Low Stock Items</div>
        </div>
      </div>

      {/* Products and Orders Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Products List */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-green-900 mb-4 flex items-center gap-2">
            <span className="inline-block"><i className="fa fa-seedling"></i></span> Your Products
          </h2>
          <table className="w-full text-left">
            <thead>
              <tr className="text-green-800">
                <th className="py-2">Product</th>
                <th className="py-2">Price</th>
                <th className="py-2">Stock</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => (
                <tr key={product._id} className={idx % 2 === 0 ? "bg-green-50" : "bg-yellow-50"}>
                  <td className="py-2 font-medium">{product.name}</td>
                  <td className="py-2">₹{product.price}</td>
                  <td className="py-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.stock <= 5 ? "bg-yellow-200 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="py-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.status === 'active' ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                      {product.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-green-900 mb-4 flex items-center gap-2">
            <span className="inline-block"><i className="fa fa-shopping-bag"></i></span> Recent Orders
          </h2>
          <table className="w-full text-left">
            <thead>
              <tr className="text-green-800">
                <th className="py-2">Order ID</th>
                <th className="py-2">Customer</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={order._id} className={idx % 2 === 0 ? "bg-green-50" : "bg-yellow-50"}>
                  <td className="py-2 font-medium">#{order._id.slice(-6)}</td>
                  <td className="py-2">{order.customerName}</td>
                  <td className="py-2">₹{order.total}</td>
                  <td className="py-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'completed' ? "bg-green-100 text-green-800" :
                      order.status === 'pending' ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard; 