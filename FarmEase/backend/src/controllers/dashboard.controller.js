import Product from '../models/product.model.js';
import Order from '../models/order.model.js';
import User from '../models/user.model.js';

// GET /dashboard/summary
export const getDashboardSummary = async (req, res) => {
  try {
    const farmerId = req.user._id;

    // Get all orders for this farmer
    const orders = await Order.find({ seller: farmerId }).populate('buyer', 'username email');

    // Total sales (number of items sold)
    const totalSales = orders.reduce((sum, order) =>
      sum + order.products.reduce((s, p) => s + p.quantity, 0), 0);

    // Total revenue
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

    // Unique customers
    const customerSet = new Set();
    orders.forEach(order => {
      if (order.buyer && order.buyer._id) customerSet.add(order.buyer._id.toString());
    });
    const uniqueCustomers = customerSet.size;

    // Products sold (number of product lines sold)
    const productsSold = orders.reduce((sum, order) => sum + order.products.length, 0);

    // Top customers (by spend)
    const customerMap = {};
    orders.forEach(order => {
      if (order.buyer && order.buyer._id) {
        const key = order.buyer.username || order.buyer.email || order.buyer._id.toString();
        customerMap[key] = (customerMap[key] || 0) + order.totalPrice;
      }
    });
    const topCustomers = Object.entries(customerMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, spent]) => ({ name, spent }));

    // Low stock count
    const lowStockCount = await Product.countDocuments({ owner: farmerId, availableQuantity: { $lte: 5 } });

    const result = {
      totalSales,
      totalRevenue,
      uniqueCustomers,
      productsSold,
      topCustomers,
      lowStockCount
    };

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /dashboard/inventory
export const getInventorySummary = async (req, res) => {
  try {
    const farmerId = req.user._id;
    const products = await Product.find({ owner: farmerId });
    const result = products.map(p => ({
      name: p.name,
      inStock: p.availableQuantity,
      sold: p.soldCount,
      _id: p._id
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /dashboard/orders
export const getRecentOrders = async (req, res) => {
  try {
    const farmerId = req.user._id;
    const orders = await Order.find({ seller: farmerId })
      .sort({ createdAt: -1 })
      .populate('buyer', 'username email')
      .populate('products.product');
    const formatted = orders.map(order => ({
      customer: order.buyer?.username || order.buyer?.email || 'Unknown',
      items: order.products.map(p => ({
        name: p.product.name,
        qty: p.quantity,
        price: p.price
      })),
      totalPrice: order.totalPrice,
      date: order.createdAt
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DEBUG: GET /dashboard/debug
export const getDebugData = async (req, res) => {
  try {
    const farmerId = req.user._id;
    const products = await Product.find({ owner: farmerId });
    const orders = await Order.find({ seller: farmerId })
      .populate('buyer', 'username email')
      .populate('products.product');
    res.json({
      farmerId,
      products,
      orders
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 