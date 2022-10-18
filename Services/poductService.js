const {findAll, findOne, insertOne, updateOne, deleteOne, deleteAll,deleteSome} = require("../DB/Base");
const {ObjectId} = require("mongodb");
const dataBaseName = "ZobaStore";
const collectionName = "products";

class ProductService {

    //list all products
    async listProducts() {
        try {
            return await findAll(dataBaseName, collectionName);
        } catch (e) {
            return null;
        }
    }

    //list products have sale
    async listProductsHaveSale() {
        try {
            return await findAll(dataBaseName, collectionName, {"salePercentage": {$gt: 0}});
        } catch (e) {
            return null;
        }
    }


    //list products with count greater than 0
    async listAvailableProducts() {
        try {
            return await findAll(dataBaseName, collectionName, {"count": {$gt: 0}});
        } catch (e) {
            return null;
        }
    }

    //list product by id
    async listOneProduct(id) {
        try {
            return await findOne(dataBaseName, collectionName, {_id: ObjectId(id)});
        } catch (e) {
            return null;
        }
    }


    //list products by general category id
    async listProductByGeneralCategoryId(id) {
        try {
            return await findAll(dataBaseName,collectionName,{generalCategoryId : id});
        }catch(e) {
            return null;
        }
    }

    //list products by  category id
    async listProductByCategoryId(c_id) {
        try {
            return await findAll(dataBaseName,collectionName,{categoryId : c_id});
        }catch(e) {
            return null;
        }
    }

    //list products by sub category id
    async listProductBySubCategoryId(sc_id) {
        try {
            return await findAll(dataBaseName,collectionName,{subCategoryId : sc_id});
        }catch(e) {
            return null;
        }
    }

    //list products by general category and category ids
    async listProductByCategoryAndGeneralCategoryIds(id1, id2) {
        try {
            return await findAll(dataBaseName,collectionName,
                {$and : [{categoryId : id1},{generalCategoryId :id2}]});
        }catch(e) {
            return null;
        }
    }

    //list products by general category, category and sub category ids
    async listProductBySubCategoryAndCategoryAndGeneralCategoryIds(id1, id2, id3) {
        try {
            return await findAll(dataBaseName,collectionName,
                {$and : [{categoryId : id1},{generalCategoryId :id2},{subCategoryId : id3}]});
        }catch(e) {
            return null;
        }
    }

    //create product
    async createProduct(data) {
        try {

            data.isActive = true;

            let generalCategory = await findOne(dataBaseName, "generalCategories",
                {barcode: data.generalCategoryBarcode});
            data.generalCategoryId = generalCategory._id.toString();
            //console.log(generalCategory);

            let category = await findOne(dataBaseName, "categories",
                {barcode: data.categoryBarcode});
            data.categoryId = category._id.toString();
            //console.log(category);

            let subCategory = await findOne(dataBaseName, "subCategories",
                {barcode: data.subCtegoryBarcode});
            data.subCategoryId = subCategory._id.toString();
            console.log(subCategory);

            return await insertOne(dataBaseName, collectionName, data);

        } catch (e) {
            return null;
        }
    }

    //update product
    async updateProduct(id, data) {
        let product = await findOne(dataBaseName, collectionName, {_id: ObjectId(id)})
        if (!product) {
            return null;
        } else {
            return await updateOne(dataBaseName, collectionName, id, data);
        }
    }

    //change statues of product
    async changeStatues(id) {
        let product = await findOne(dataBaseName, collectionName, {_id: ObjectId(id)})
        if (!product) {
            return null
        }
        if (!product.isActive || product.isActive === false) {
            return await updateOne(dataBaseName, collectionName, id, {isActive: true})
        } else {
            return await updateOne(dataBaseName, collectionName, id, {isActive: false})
        }
    }

    //delete product
    async deleteProduct(id) {
        let product = await findOne(dataBaseName, collectionName, {_id: ObjectId(id)})
        if (!product) {
            return null
        } else {
            return await deleteOne(dataBaseName, collectionName, {_id: ObjectId(id)})
        }
    }

    //delete all products
    async deleteAllProducts() {
        try {
            return await deleteAll(dataBaseName, collectionName);
        } catch (e) {
            return null;
        }
    }

    //delete all not available products
    async deleteNotAvailableProducts() {
        try {
            return await deleteSome(dataBaseName, collectionName, {"count": {"$lte": 0}});
        } catch (e) {
            return null;
        }
    }
}

module.exports = {
    ProductService
}