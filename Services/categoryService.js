const {findAll, findOne, insertOne, updateOne, deleteOne, deleteAll} = require("../DB/Base");
const {ObjectId} = require("mongodb");
const dataBaseName = "ZobaStore";
const collectionName = "categories";


class CategoryService {

    //list all categories
    async listCategories() {
        return findAll(dataBaseName,collectionName);
    }

    //get category by id
    async listCategoryById(id) {
        try {
            return await findOne(dataBaseName,collectionName,{_id : ObjectId(id)});
        }catch(e) {
            return null;
        }
    }

    //get category by general category id
    async listCategoriesByGeneralCategoryId(g_id) {
        try {
            return await findAll(dataBaseName,collectionName,{generalCategoryId : g_id});
        }catch(e) {
            return null;
        }

    }

    //create category
    async createCategory(data) {
        try {
            data.isActive = true;
            let generalCategory = await findOne(dataBaseName,"generalCategories",
                {barcode : data.generalCategoryBarCode});
            data.generalCategoryId = generalCategory._id.toString();
            return await insertOne(dataBaseName,collectionName,data);
        }catch (e) {
            return null;
        }
    }

    //update category
    async updateCategory(id, data) {
        let category = await findOne(dataBaseName,collectionName,{_id : ObjectId(id)});
        if(!category){
            return null
        }else{
            return await updateOne(dataBaseName,collectionName,id,data);
        }
    }

    //delete category
    async deleteCategory(id) {
        let category = await findOne(dataBaseName,collectionName,{_id : ObjectId(id)});
        if(!category){
            return null
        }else{
            return await deleteOne(dataBaseName,collectionName,{_id : ObjectId(id)});
        }
    }

    //delete all categories
    async deleteAllCategories() {
        try {
            return await deleteAll(dataBaseName,collectionName);
        }catch (e) {
            return null;
        }
    }

    //change category status
    async changeCategoryStatus(id) {
        let category = await findOne(dataBaseName,collectionName,{_id : ObjectId(id)});
        if(!category){
            return null
        }else{
            if(!category.isActive || category.isActive === false){
                return await updateOne(dataBaseName,collectionName,id,{isActive : true});
            }else{
                return await updateOne(dataBaseName,collectionName,id,{isActive : false});
            }
        }
    }

}

module.exports = {
    CategoryService
}