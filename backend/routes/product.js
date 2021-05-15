const express = require('express');
const router = express.Router();

const { getProducts, newProduct, getSingleProducts, updateProduct, deleteProduct, createProductReview } = require('../controllers/productController');


const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')



// list products
router.route('/products').get(getProducts);

// Single article
router.route('/product/:id').get(getSingleProducts);

// Add an article
router.route('/admin/products/new').post(isAuthenticatedUser,authorizeRoles('admin'), newProduct);

// Update an article
router.route('/product/:id')
    .put(isAuthenticatedUser,authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser,authorizeRoles('admin'), deleteProduct);

router.route('/review').put(isAuthenticatedUser, createProductReview)

module.exports = router;