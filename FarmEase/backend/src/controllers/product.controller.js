import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Product from "../models/product.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import User from "../models/user.model.js";
import fs from 'fs/promises'
import mongoose from 'mongoose'
import Order from '../models/order.model.js';


const createProduct = async (req, res) => {
    try{
        const {name, price, description, category, region, owner, quantityUnit, availableQuantity} = req.body
        const photoLocalPath = req.file?.path

        console.log(name, price, description, category, region, owner, photoLocalPath, quantityUnit, availableQuantity)

        let photo = await uploadOnCloudinary(photoLocalPath)
        photo = photo?.url
        await fs.unlink(photoLocalPath)
        
        if (!name || !price || !description || !category || !region || !quantityUnit || !availableQuantity) {
            throw new ApiError(400, "Please Fill all the fields")
        }
        if (!photo){
            throw new ApiError(400, "Photo is required")
        }

        // Create product with quantity information
        const product = await Product.create({
            name, 
            price, 
            description, 
            category, 
            region, 
            photo, 
            owner,
            quantityUnit,
            availableQuantity,
            pricePerUnit: price // Price is now per unit
        })

        const user = await User.findById(owner)

        console.log(user.products)

        if (user.products){
            user.products = [...user.products, product._id]
        }
        else{
            user.products = [product._id]
        }

        await user.save({validateBeforeSave:false})

        return res
        .status(200)
        .json(
            new ApiResponse(200, "Product successfully created")
        )

    } catch(err){
        return res.status(400).json(err.message)
    }
}

const searchProduct = async (req, res) => {
    try{
        let search = req.body.search
        console.log(search)
        let products = await Product.find({name:{$regex:search}})
        console.log(products)
        for (let product of products){
            product.owner = await User.findOne({_id: product.owner})
        }
        return res
        .status(200)
        .json(products)
    }
    catch(err){
        console.log(err.message)
        return res
        .status(401)
        .json(err.message)
    }
}

const filterProduct = async (req, res) => {
    try{
        let category = req.body.category
        let region = req.body.region
        if (!category && !region) throw new ApiError(401, "Fill all fields");
        let query = {}
        if (category!="All" && category) query.category = category;
        if (region!="All" && region) query.region = region;
        let products = await Product.find(query)
        for (let product of products){
            product.owner = await User.findOne({_id: product.owner})
        }
        return res
        .status(200)
        .json(products)
    }
    catch(err){
        console.log(err.message)
        return res
        .status(401)
        .json(err.message)
    }
}

const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const user = await User.findById(req.user._id);
        const cartItem = user.cart.find(item => item.product.toString() === productId);

        if (cartItem) {
            // Check stock before incrementing
            if (cartItem.quantity >= product.availableQuantity) {
                return res.status(400).json({ 
                    message: `Only ${product.availableQuantity} items available in stock` 
                });
            }
            cartItem.quantity += 1;
        } else {
            user.cart.push({ product: productId, quantity: 1 });
        }

        await user.save();
        
        // Get updated cart with product details
        const updatedUser = await User.findById(user._id).populate('cart.product');
        const cartCount = updatedUser.cart.reduce((total, item) => total + item.quantity, 0);

        return res.status(200).json({
            cart: updatedUser.cart,
            cartCount: cartCount
        });
    } catch (err) {
        console.error("Add to cart error:", err);
        return res.status(500).json({ message: "Failed to add item to cart" });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const user = await User.findById(req.user._id);
        const cartItemIndex = user.cart.findIndex(item => item.product.toString() === productId);

        if (cartItemIndex === -1) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        if (user.cart[cartItemIndex].quantity > 1) {
            user.cart[cartItemIndex].quantity -= 1;
        } else {
            user.cart.splice(cartItemIndex, 1);
        }

        await user.save();

        // Get updated cart with product details
        const updatedUser = await User.findById(user._id).populate('cart.product');
        const cartCount = updatedUser.cart.reduce((total, item) => total + item.quantity, 0);

        return res.status(200).json({
            cart: updatedUser.cart,
            cartCount: cartCount
        });
    } catch (err) {
        console.error("Remove from cart error:", err);
        return res.status(500).json({ message: "Failed to remove item from cart" });
    }
};

const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('cart.product');
        const cartCount = user.cart.reduce((total, item) => total + item.quantity, 0);

        return res.status(200).json({
            cart: user.cart,
            cartCount: cartCount
        });
    } catch (err) {
        console.error("Get cart error:", err);
        return res.status(500).json({ message: "Failed to fetch cart" });
    }
};

const deleteFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const user = await User.findById(req.user._id);
        user.cart = user.cart.filter(item => item.product.toString() !== productId);
        await user.save();

        // Get updated cart with product details
        const updatedUser = await User.findById(user._id).populate('cart.product');
        const cartCount = updatedUser.cart.reduce((total, item) => total + item.quantity, 0);

        return res.status(200).json({
            cart: updatedUser.cart,
            cartCount: cartCount,
            message: "Item removed from cart"
        });
    } catch (err) {
        console.error("Delete from cart error:", err);
        return res.status(500).json({ message: "Failed to delete item from cart" });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        // Find the product first to get owner information
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Verify that the logged-in user is the owner
        if (product.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this product" });
        }

        // Delete the product
        const deletedProduct = await Product.findByIdAndDelete(productId);

        // Remove product from owner's products array
        await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { products: productId } }
        );

        // Remove the product from all users' carts
        await User.updateMany(
            { "cart.product": productId },
            { $pull: { cart: { product: productId } } }
        );

        return res.status(200).json({ 
            message: "Product deleted successfully",
            deletedProduct 
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }
}

const updateStock = async (req, res) => {
    try {
        const { productId, quantity, price } = req.body;
        // Validate quantity
        if (quantity < 0) {
            return res.status(400).json({ message: "Invalid quantity" });
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        // Update stock
        product.availableQuantity = quantity;
        // Update price if provided and valid
        if (typeof price === 'number' && price >= 0) {
            product.price = price;
            product.pricePerUnit = price;
        }
        await product.save();
        return res.status(200).json({ 
            message: "Stock and price updated successfully",
            availableQuantity: product.availableQuantity,
            price: product.price
        });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const placeOrder = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('cart.product');
        console.log('Placing order for user:', req.user._id);
        console.log('User cart:', user.cart);
        if (!user.cart || user.cart.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }
        // Group cart items by seller
        const sellerMap = {};
        for (const item of user.cart) {
            const product = item.product;
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            if (product.availableQuantity < item.quantity) {
                return res.status(400).json({
                    message: `Only ${product.availableQuantity} ${product.name}(s) available`
                });
            }
            const sellerId = product.owner.toString();
            if (!sellerMap[sellerId]) sellerMap[sellerId] = [];
            sellerMap[sellerId].push(item);
        }
        // Place an order for each seller
        let createdOrders = [];
        for (const sellerId of Object.keys(sellerMap)) {
            const items = sellerMap[sellerId];
            let orderProducts = [];
            let totalPrice = 0;
            for (const item of items) {
                const product = await Product.findById(item.product._id);
            product.availableQuantity -= item.quantity;
                product.soldCount = (product.soldCount || 0) + item.quantity;
            await product.save();
                orderProducts.push({
                    product: product._id,
                    quantity: item.quantity,
                    price: product.pricePerUnit
                });
                totalPrice += product.pricePerUnit * item.quantity;
            }
            const order = await Order.create({
                buyer: user._id,
                seller: sellerId,
                products: orderProducts,
                totalPrice: totalPrice
            });
            createdOrders.push(order);
        }
        // Clear cart
        user.cart = [];
        await user.save();
        console.log('Created Orders:', createdOrders);
        return res.status(200).json({ message: "Order(s) placed successfully" });
    } catch (err) {
        console.error("Place order error:", err);
        return res.status(500).json({ message: "Failed to place order" });
    }
};

export {
    createProduct,
    searchProduct, 
    filterProduct,
    addToCart,
    removeFromCart,
    getCart,
    deleteFromCart,
    deleteProduct,
    updateStock,
    placeOrder
}