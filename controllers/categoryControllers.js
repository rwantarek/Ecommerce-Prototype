// import service that will use inside controllers
const {CategoryService} = require("../Services/categoryService");
let service = new CategoryService();

class CategoryControllers {

    async listCategories(req,res) {
        res.json({
            list : await service.listCategories()
        })
    }

    async listCategoryById(req,res) {
        let id = req.params.id;
        let result = await service.listCategoryById(id);
        if(result === null){
            res.status(400).json({
                message : "the category not found"
            })
        }else{
            res.json({
                result
            })
        }
    }

    async listCategoryByGeneralCategoriesId(req,res) {
        let g_id = req.params.gId;
        let result = await service.listCategoriesByGeneralCategoryId(g_id);
        if(result === null){
            res.status(400).json({
                message : "the general category not found"
            })
        }else{
            res.json({
                result
            })
        }
    }

    async createCategory(req,res) {
        let data = req.body;
        let result = await service.createCategory(data);
        if(result === null){
            res.json({
                message : "the category creation fail"
            })
        }else{
            res.json({
                message : "the category created successfully"
            })
        }
    }

    async updateCategory(req,res) {
        let id = req.params.id;
        let data = req.body;
        let result = await service.updateCategory(id,data);
        if(result === null){
            res.status(400).json({
                message : "the category not found"
            })
        }else{
            res.json({
                message : "the category updated successfully"
            })
        }
    }

    async deleteCategory(req,res) {
        let id = req.params.id;
        let result = await service.deleteCategory(id);
        if(result === null){
            res.status(400).json({
                message : "the category not found"
            })
        }else{
            res.json({
                message : "the category deleted successfully"
            })
        }
    }

    async deleteAllCategories(req,res) {
        let result = await service.deleteAllCategories();
        if(result === null){
            res.json({
                message : "there is a problem in deleting all categories try another time!"
            })
        }else{
            res.json({
                message : "all categories deleted successfully"
            })
        }
    }

    async changeCategoryStatus(req,res) {
        let id = req.params.id;
        let result = await service.changeCategoryStatus(id);

        if(result === null){
            res.status(400).json({
                message : "the category not found"
            })
        }else{
            res.json({
                message : "the category statue changed successfully"
            })
        }
    }


}

module.exports = {
    CategoryControllers
}