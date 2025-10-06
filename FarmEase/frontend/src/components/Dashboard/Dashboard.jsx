import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [summaryRes, inventoryRes, ordersRes] = await Promise.all([
          axios.get("/dashboard/summary", { withCredentials: true }),
          axios.get("/dashboard/inventory", { withCredentials: true }),
          axios.get("/dashboard/orders", { withCredentials: true }),
        ]);
        setSummary(summaryRes.data);
        setInventory(Array.isArray(inventoryRes.data) ? inventoryRes.data : []);
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
      <h1 className="text-3xl font-bold text-green-900 mb-8 flex items-center gap-2">
        <span className="inline-block"><svg xmlns='http://www.w3.org/2000/svg' className='inline w-8 h-8 mr-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 17v-2a4 4 0 018 0v2m-4-4V7m0 0V5a2 2 0 10-4 0v2m0 0v6m0 0v2a4 4 0 01-8 0v-2m4 4v-6m0 0V5a2 2 0 114 0v2' /></svg></span>
        Analytics Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-4xl text-green-800 mb-2"><i className="fa fa-shopping-bag"></i></span>
          <div className="text-3xl font-bold text-green-900">{summary?.totalSales ?? 0}</div>
          <div className="text-gray-500">Total Sales</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-4xl text-green-800 mb-2"><i className="fa fa-rupee-sign"></i></span>
          <div className="text-3xl font-bold text-green-900">₹{summary?.totalRevenue ?? 0}</div>
          <div className="text-gray-500">Total Revenue</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-4xl text-green-800 mb-2"><i className="fa fa-users"></i></span>
          <div className="text-3xl font-bold text-green-900">{summary?.topCustomers?.length ?? 0}</div>
          <div className="text-gray-500">Top Customers</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-4xl text-yellow-600 mb-2"><i className="fa fa-exclamation-triangle"></i></span>
          <div className="text-3xl font-bold text-yellow-700">{summary?.lowStockCount ?? 0}</div>
          <div className="text-gray-500">Low Stock Items</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inventory Summary */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-green-900 mb-4 flex items-center gap-2">
            <span className="inline-block"><i className="fa fa-archive"></i></span> Inventory Summary
          </h2>
          <table className="w-full text-left">
            <thead>
              <tr className="text-green-800">
                <th className="py-2">Item</th>
                <th className="py-2">In Stock</th>
                <th className="py-2">Sold</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, idx) => (
                <tr key={item._id} className={idx % 2 === 0 ? "bg-yellow-50" : "bg-green-50"}>
                  <td className="py-2 font-medium">{item.name}</td>
                  <td className="py-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.inStock <= 2 ? "bg-yellow-200 text-yellow-800" : "bg-green-100 text-green-800"}`}>{item.inStock} in stock</span>
                  </td>
                  <td className="py-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-200 text-green-900">{item.sold} sold</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-green-900 mb-4 flex items-center gap-2">
            <span className="inline-block"><i className="fa fa-chart-line"></i></span> Recent Orders
          </h2>
          <table className="w-full text-left">
            <thead>
              <tr className="text-green-800">
                <th className="py-2">Customer</th>
                <th className="py-2">Item</th>
                <th className="py-2">Qty</th>
                <th className="py-2">Price</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                order.items.map((item, iidx) => (
                  <tr key={idx + '-' + iidx} className={(idx + iidx) % 2 === 0 ? "bg-green-50" : "bg-yellow-50"}>
                    <td className="py-2 font-medium text-green-900">{order.customer}</td>
                    <td className="py-2">{item.name}</td>
                    <td className="py-2">x{item.qty}</td>
                    <td className="py-2">₹{item.price}</td>
                    <td className="py-2">{order.date?.slice(0, 10)}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 