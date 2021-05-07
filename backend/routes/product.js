const express = require('express');
const router = express.Router();

const { getProducts, newProduct, getSingleProducts, updateProduct, deleteProduct } =require('../controllers/productController');
// const {newProducts} = require("../controllers/productController");

// Add an article
router.route('/admin/products/new').post(newProduct);

// list products
router.route('/products').get(getProducts);

// Single article
router.route('/product/:id').get(getSingleProducts);

// Update an article
router.route('/admin/product/:id').put(updateProduct).delete(deleteProduct);

// Delete an article
router.route('/admin/product/:id').delete(deleteProduct);

module.exports = router;