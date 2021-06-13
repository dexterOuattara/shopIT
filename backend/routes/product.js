const express = require('express')
const router = express.Router();


const {
    getProducts,
    getAdminProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview,
    newCategory,
    getAdminCategories,
    deleteCategory,
    updateCategory,
    getAdminSingleCategory

} = require('../controllers/productController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

// Start List route Product

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);

// End  List route Product

//  Global route Admin

router.route('/admin/products').get(getAdminProducts);
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);
router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);


// Start route category

router.route('/admin/product_category').get(getAdminCategories);
router.route('/admin/product_category/new').post(isAuthenticatedUser, authorizeRoles('admin'), newCategory);
router.route('/admin/product_category/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateCategory)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCategory);

// End route category

// End Global route Admin


// Start route review

router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews').get(isAuthenticatedUser, getProductReviews)
router.route('/reviews').delete(isAuthenticatedUser, deleteReview)

// End route review

module.exports = router;