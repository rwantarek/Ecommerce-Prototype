const express = require('express');
const adminApp = express();

//import middle ware
const {adminMiddleWare} = require("../middleWares/adminMiddleWare");
adminApp.use(adminMiddleWare);

/*** products ***/
//import controllers (call backs in Routes)
const {ProductControllers} = require("../controllers/productControllers");
let PC = new ProductControllers();

//list product
adminApp.get('/products',PC.listProducts);

//get product by id
adminApp.get('/products/:id', PC.listProductById);

//get products have sale
adminApp.get('/sale/products', PC.listProductHaveSale);

//get products with count greater than 0
adminApp.get('/available/products', PC.listAvailableProducts);

//get products by general category id
adminApp.get('/products/generalCategory/:id', PC.listProductByGeneralCategoryId);

//get products by category id
adminApp.get('/products/category/:id', PC.listProductByCategoryId);

//get products by sub category id
adminApp.get('/products/subCategory/:id', PC.listProductBySubCategoryId);

//get products by general category and category id together
adminApp.get('/products/category/generalCategory/:id1/:id2', PC.listProductByCategoryAndGeneralCategoryIds);

//get products by general category ,category id and subCategory id
adminApp.get('/products/subCategory/category/generalCategory/:id1/:id2/:id3',
    PC.listProductBySubCategoryAndCategoryAndGeneralCategoryIds);

//create product
adminApp.post('/products', PC.createProduct);

//update product
adminApp.put('/products/:id', PC.updateProduct);

//delete product
adminApp.delete('/products/:id', PC.deleteProduct);

//delete all products
adminApp.delete('/products', PC.deleteAllProducts);

//delete all products with count <0
adminApp.delete('/notAvailable/products', PC.deleteNotAvailableProducts);

//activate or deactivate product
adminApp.put('/products/status/:id', PC.changeProductStatues);

/*********************************************/

/*** user ***/
//authentication
const {authControllers} = require("../controllers/authControllers");
let AC = new authControllers();

//login
adminApp.post('/login', AC.login);

//signUp
adminApp.post('/register', AC.register);


//import user controllers
const {userControllers} = require("../controllers/userControllers");
let UC = new userControllers();

//list users
adminApp.get('/users',UC.listUsers);

//get user by id
adminApp.get('/users/:id', UC.listUserById);

//delete user by id
adminApp.delete('/users/:id', UC.deleteUser);

//delete all users
adminApp.delete('/users', UC.deleteAllUser);

//update user by id
adminApp.put('/users/:id', UC.updateUser);

//activate or deactivate user
adminApp.put('/users/status/:id', UC.changeUserStatues);


/*********************************************/

/*** orders ***/
//import orderControllers
const {OrdersControllers} = require("../controllers/OrdersControllers");
let OC = new OrdersControllers();

//list orders
adminApp.get('/orders',OC.listOrders);

//get order by specific user id
adminApp.get('/orders/user/:id', OC.listOrderById);

//create order
adminApp.post('/orders', OC.createOrder);

//delete all orders
adminApp.delete('/orders', OC.deleteAllOrders);

//delete specific order
adminApp.delete('/orders/:id', OC.deleteOrder);

//delete orders done by specific user
adminApp.delete('/orders/user/:id', OC.deleteOrdersBySpecificUser);

//activate or deactivate order
adminApp.put('/orders/status/:id', OC.changeOrderStatus);

/*********************************************/

/*** generalCategories (Woman - Men - Kids - Home - Beauty) ***/
//import generalCategoryController
const {GeneralCategoryControllers} = require("../controllers/generalCategoryControllers");
let GCC = new GeneralCategoryControllers();

//list generalCategories
adminApp.get('/generalCategories',GCC.listGeneralCategories);

//get generalCategories by id
adminApp.get('/generalCategories/:id', GCC.listGeneralCategoryById);

//create generalCategories
adminApp.post('/generalCategories', GCC.createGeneralCategory);

//update generalCategories
adminApp.put('/generalCategories/:id', GCC.updateGeneralCategory);

//delete generalCategories
adminApp.delete('/generalCategories/:id', GCC.deleteGeneralCategory);

//delete all general categories
adminApp.delete('/generalCategories', GCC.deleteAllGeneralCategories);

//activate or deactivate generalCategories
adminApp.put('/generalCategories/status/:id', GCC.changeGeneralCategoryStatus);

/*********************************************/

/*** categories (types inside each category) ***/
//import CategoryController
const {CategoryControllers} = require("../controllers/categoryControllers");
let CC = new CategoryControllers();

//list categories
adminApp.get('/categories',CC.listCategories);

//get categories by id
adminApp.get('/categories/:id', CC.listCategoryById);

//get categories by general category id
adminApp.get('/categories/generalCategory/:gId', CC.listCategoryByGeneralCategoriesId);

//create categories
adminApp.post('/categories', CC.createCategory);

//update categories
adminApp.put('/categories/:id', CC.updateCategory);

//delete categories
adminApp.delete('/categories/:id', CC.deleteCategory);

//delete all categories
adminApp.delete('/categories', CC.deleteAllCategories);

//activate or deactivate categories
adminApp.put('/categories/status/:id', CC.changeCategoryStatus);

/*********************************************/

/*** subCategories (filters inside each subcategory) ***/
//import subCategories controllers
const {subCategoryControllers} = require("../controllers/subCategoryControllers");
let SCC = new subCategoryControllers();

//list SubCategories
adminApp.get('/subCategories',SCC.listSubCategories);

//get SubCategory by id
adminApp.get('/subCategories/:id', SCC.listSubCategoryById);

//get SubCategories by general category id
adminApp.get('/subCategories/generalCategory/:id', SCC.listSubCategoryByGeneralCategoryId);

//get SubCategories by category id
adminApp.get('/subCategories/category/:id', SCC.listSubCategoryByCategoryId);

//get SubCategories by general category id and category id together
adminApp.get('/subCategories/category/generalCategory/:idOne/:idTwo', SCC.listSubCategoryByGeneralCategoryAndCategoryIds);

//create SubCategory
adminApp.post('/subCategories', SCC.createSubCategory);

//update SubCategory
adminApp.put('/subCategories/:id', SCC.updateSubCategory);

//delete SubCategory
adminApp.delete('/subCategories/:id', SCC.deleteSubCategory);

//delete all subCategories
adminApp.delete('/subCategories', SCC.deleteAllSubCategory);

//activate or deactivate SubCategory
adminApp.put('/subCategories/status/:id', SCC.changeSubCategory);

/*********************************************/

/*** cart ***/
//import filterTypeControllers
const {CartControllers} = require("../controllers/cartControllers");
let cartController = new CartControllers();

//list carts
adminApp.get('/carts',cartController.listCarts);

//get cart of specific user by id
adminApp.get('/carts/user/:id', cartController.listCartByUserId);

//get cart for user login now
adminApp.get('/user/cart', cartController.listCartOfUserLoginNow);

//create cart
adminApp.post('/carts', cartController.addToCart);

//delete cart of specific user
adminApp.delete('/carts/user/:id', cartController.deleteCartByUserId);

//delete all carts
adminApp.delete('/carts', cartController.deleteAllCarts);

//delete all items from cart of specific user (empty cart)
adminApp.delete('/cartItems/user/:id', cartController.deleteCartItemsForUser);

//delete all items from cart of user login now
adminApp.delete('/user/cartItems', cartController.deleteCartItemsForUserLoginNow);

//delete all items from cart of all user
adminApp.delete('/cartItems', cartController.deleteAllCartItemsForAllUsers);

//delete item from cart for specific user
adminApp.delete('/cartItem/user/:id', cartController.deleteItemInCartOfSpecificUser);

//delete item from cart for user login now
adminApp.delete('/user/cartItem', cartController.deleteItemInCartOfUserLoginNow);

//delete item from all carts of all users
//adminApp.delete('/cartItem', cartController.deleteItemInCartsOfAllUsers);

//update item in cart of specific user
adminApp.put('/cartItem/user/:id', cartController.updateItemInCartForSpecificUser);

//update item in cart of user login now
adminApp.put('/user/cartItem', cartController.updateItemInCartForUserLoginNow);

//update item in all carts for all users
//adminApp.put('/cartItem', cartController.updateItemInCartForAllUsers);

//update other data of carts for user
adminApp.put('/carts/user/:id', cartController.updateCartDataOfUser);

//activate or deactivate cart
adminApp.put('/carts/status/:id', cartController.changeCartStatusByUserId);

module.exports = {
    adminApp
}