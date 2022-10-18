const express = require('express');
const websiteApp = express()

/*** products ***/
//import product controllers
const {ProductControllers} = require("../controllers/productControllers");
let PC = new ProductControllers();

//get products have sale
websiteApp.get('/sale/products', PC.listProductHaveSale);

//get products with count greater than 0
websiteApp.get('/available/products', PC.listAvailableProducts);

//get product by id
websiteApp.get('/products/:id', PC.listProductById);

//get products by general category id
websiteApp.get('/products/generalCategory/:id', PC.listProductByGeneralCategoryId);

//get products by category id
websiteApp.get('/products/category/:id', PC.listProductByCategoryId);

//get products by sub category id
websiteApp.get('/products/subCategory/:id', PC.listProductBySubCategoryId);

//get products by general category and category id together
websiteApp.get('/products/category/generalCategory/:id1/:id2', PC.listProductByCategoryAndGeneralCategoryIds);

//get products by general category ,category id and subCategory id
websiteApp.get('/products/subCategory/category/generalCategory/:id1/:id2/:id3',
    PC.listProductBySubCategoryAndCategoryAndGeneralCategoryIds);

/*********************************************/

/*** authentication ***/
const {authControllers} = require("../controllers/authControllers");
let AC = new authControllers();

//login
websiteApp.post('/login', AC.login);

//register
websiteApp.post('/register', AC.register);

/*********************************************/

/*** users ***/
//import user controllers
const {userControllers} = require("../controllers/userControllers");
let UC = new userControllers();

//list users
websiteApp.get('/user',UC.listUser);

/*********************************************/

/*** orders ***/
//import orderControllers
const {OrdersControllers} = require("../controllers/OrdersControllers");
let OC = new OrdersControllers();

//create order
websiteApp.post('/orders', OC.createOrder);

//list orders done by this user
websiteApp.get('/orders/user',OC.listOrdersUserMake);

/*********************************************/

/*** general categories (Woman - Men - Kids - Home - Beauty) ***/
//import generalCategoryController
const {GeneralCategoryControllers} = require("../controllers/generalCategoryControllers");
let GCC = new GeneralCategoryControllers();

//list categories
websiteApp.get('/generalCategories',GCC.listGeneralCategories);

//get generalCategories by id
websiteApp.get('/generalCategories/:id', GCC.listGeneralCategoryById);
/*********************************************/

/*** Categories (types inside each general category) ***/
//import CategoriesControllers
const {CategoryControllers} = require("../controllers/categoryControllers");
let CC = new CategoryControllers();

//list subCategories
websiteApp.get('/categories',CC.listCategories);

//get categories by id
websiteApp.get('/categories/:id', CC.listCategoryById);

//get categories by general category id
websiteApp.get('/categories/generalCategory/:gId', CC.listCategoryByGeneralCategoriesId);



/*********************************************/

/*** subCategories (filters inside each category) ***/
//import subCategoryControllers
const {subCategoryControllers} = require("../controllers/subCategoryControllers");
let SCC = new subCategoryControllers();

//list subCategories
websiteApp.get('/subCategories',SCC.listSubCategories);

//get SubCategory by id
websiteApp.get('/subCategories/:id', SCC.listSubCategoryById);

//get SubCategories by general category id
websiteApp.get('/subCategories/generalCategory/:id', SCC.listSubCategoryByGeneralCategoryId);

//get SubCategories by category id
websiteApp.get('/subCategories/category/:id', SCC.listSubCategoryByCategoryId);

//get SubCategories by general category id and category id together
websiteApp.get('/subCategories/category/generalCategory/:idOne/:idTwo', SCC.listSubCategoryByGeneralCategoryAndCategoryIds);


/*********************************************/

/*** cart ***/
//import cartControllers
const {CartControllers} = require("../controllers/cartControllers");
let cartController = new CartControllers();

//get cart for user login now (open cart page)
websiteApp.get('/user/cart', cartController.listCartOfUserLoginNow);

//create cart (add to cart)
websiteApp.post('/carts', cartController.addToCart);

//delete all items from cart of user login now (clear cart)
websiteApp.delete('/user/cartItems', cartController.deleteCartItemsForUserLoginNow);

//delete item from cart for user login now (remove item)
websiteApp.delete('/user/cartItem', cartController.deleteItemInCartOfUserLoginNow);

//update item in cart of user login now
websiteApp.put('/user/cartItem', cartController.updateItemInCartForUserLoginNow);


module.exports = {
    websiteApp
}

