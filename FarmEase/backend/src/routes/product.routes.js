import { Router } from 'express';
import * as productController from '../controllers/product.controller.js';
import upload from '../middlewares/multer.middleware.js';
import auth from '../middlewares/auth.middleware.js';

const router = Router();

// Product management routes
router.post('/create', auth, upload.single("photo"), productController.createProduct);
router.post('/search', productController.searchProduct);
router.post('/filter', productController.filterProduct);
router.post('/deleteproduct', auth, productController.deleteProduct);

// Cart management routes
router.post('/addtocart', auth, productController.addToCart);
router.post('/removefromcart', auth, productController.removeFromCart);
router.post('/getcart', auth, productController.getCart);
router.post('/deletefromcart', auth, productController.deleteFromCart);

// Order management routes
router.post('/placeorder', auth, productController.placeOrder);

// Stock management route
router.post('/updatestock', auth, productController.updateStock);

export default router; 