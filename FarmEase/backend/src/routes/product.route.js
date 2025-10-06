import {Router} from 'express'
import upload from '../middlewares/multer.middleware.js'
import { createProduct, searchProduct, filterProduct, addToCart, removeFromCart, getCart, deleteFromCart, deleteProduct, placeOrder } from '../controllers/product.controller.js'
import verifyJWT from '../middlewares/auth.middleware.js'


const productRouter = Router()


productRouter.post('/createproduct', upload.single('photo'), createProduct)

productRouter.post('/searchproduct', searchProduct)

productRouter.post('/filterproduct', filterProduct)

productRouter.post('/addtocart', verifyJWT, addToCart)

productRouter.post('/removefromcart', verifyJWT, removeFromCart)

productRouter.post('/getcart', verifyJWT, getCart)

productRouter.post('/deletefromcart', verifyJWT, deleteFromCart)

productRouter.post('/deleteproduct', verifyJWT, deleteProduct)

productRouter.post('/placeorder', verifyJWT, placeOrder)


export default productRouter