const {findAll, findOne, insertOne, updateOne, deleteOne, deleteAll} = require("../DB/Base");
const {ObjectId} = require("mongodb");
const dataBaseName = "ZobaStore";
const collectionName = "subCategories";


class SubCategoryService {

    //list all subCategories
    async listSubCategories() {
        return findAll(dataBaseName,collectionName);
    }

    //list subCategory by id
    async listSubCategoryById(id) {
        try {
            return await findOne(dataBaseName,collectionName,{_id : ObjectId(id)});
        }catch(e) {
            return null;
        }
    }

    //list subcategories by general category id
    async listSubCategoryByGeneralCategoryId(g_id) {
        try {
            return await findAll(dataBaseName,collectionName,{
                generalCategoryId : g_id});
        }catch(e) {
            return null;
        }
    }

    //list subcategories by category id
    async listSubCategoryByCategoryId(c_id) {
        try {
            return await findAll(dataBaseName,collectionName,{
                categoryId : c_id});
        }catch(e) {
            return null;
        }
    }

    //list subcategories by general category and category ids together
    async listSubCategoryByGeneralCategoryAndCategoryIds(id1, id2) {
        try {
            return await findAll(dataBaseName,collectionName,
                {$and : [{categoryId : id1},{generalCategoryId : id2}]}
            );
        }catch(e) {
            return null;
        }
    }

    //create subCategory
    async createSubCategory(data) {
        try {
            data.isActive = true;
            let generalCategory = await findOne(dataBaseName,"generalCategories",
                {barcode : data.generalCategoryBarCode});
            data.generalCategoryId = generalCategory._id.toString();
            //console.log(generalCategory)

            let category = await findOne(dataBaseName,"categories",
                {barcode : data.categoryBarCode});
            //console.log(category)
            data.categoryId = category._id.toString();
            return await insertOne(dataBaseName,collectionName,data);
        }catch (e) {
            return null;
        }
    }

    //update subCategory
    async updateSubCategory(id, data) {
        let subCategory = await findOne(dataBaseName,collectionName,{_id : ObjectId(id)});
        if(!subCategory){
            return null
        }else{
            return await updateOne(dataBaseName,collectionName,id,data);
        }
    }

    //delete subCategory
    async deleteSubCategory(id) {
        let subCategory = await findOne(dataBaseName,collectionName,{_id : ObjectId(id)});
        if(!subCategory){
            return null
        }else{
            return await deleteOne(dataBaseName,collectionName,{_id : ObjectId(id)});
        }
    }

    //delete all subCategories
    async deleteAllSubCategories() {
        try {
            return await deleteAll(dataBaseName,collectionName);
        }catch (e) {
            return null;
        }
    }

    //change subCategory status
    async changeSubCategoryStatus(id) {
        let subCategory = await findOne(dataBaseName,collectionName,{_id : ObjectId(id)});
        if(!subCategory){
            return null
        }else{
            if(!subCategory.isActive || subCategory.isActive === false){
                return await updateOne(dataBaseName,collectionName,id,{isActive : true});
            }else{
                return await updateOne(dataBaseName,collectionName,id,{isActive : false});
            }
        }
    }


}

module.exports = {
    SubCategoryService
}