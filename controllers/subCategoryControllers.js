// import service that will use inside controllers
let {SubCategoryService} = require('../Services/subCategoryService');
let service = new SubCategoryService();

class subCategoryControllers {

    async listSubCategories(req,res) {
        res.json({
            list : await service.listSubCategories()
        })
    }

    async listSubCategoryById(req,res) {
        let id = req.params.id;
        let result = await service.listSubCategoryById(id);
        if(result === null){
            res.status(400).json({
                message : "there are no subCategories found!"
            })
        }else{
            res.json({
                result
            })
        }
    }

    async listSubCategoryByGeneralCategoryId(req,res) {
        let g_id = req.params.id;
        let result = await service.listSubCategoryByGeneralCategoryId(g_id);
        if(result === null){
            res.status(400).json({
                message : "there are no subCategories found!"
            })
        }else{
            res.json({
                result
            })
        }
    }

    async listSubCategoryByCategoryId(req,res) {
        let c_id = req.params.id;
        let result = await service.listSubCategoryByCategoryId(c_id);
        if(result === null){
            res.status(400).json({
                message : "there are no subCategories found!"
            })
        }else{
            res.json({
                result
            })
        }
    }

    async listSubCategoryByGeneralCategoryAndCategoryIds(req,res) {
        let id1 = req.params.idOne;
        let id2 = req.params.idTwo;
        let result = await service.listSubCategoryByGeneralCategoryAndCategoryIds(id1,id2);
        if(result === null){
            res.status(400).json({
                message : "there is no subCategories found!"
            })
        }else{
            res.json({
                result
            })
        }

}

    async createSubCategory(req,res) {
        let data = req.body;
        let result = await service.createSubCategory(data);
        if(result === null){
            res.json({
                message : "the sub category creation fail"
            })
        }else{
            res.json({
                message : "the sub category created successfully"
            })
        }
    }

    async updateSubCategory(req,res) {
        let id = req.params.id;
        let data = req.body;
        let result = await service.updateSubCategory(id,data);
        if(result === null){
            res.status(400).json({
                message : "the sub category not found"
            })
        }else{
            res.json({
                message : "the sub category updated successfully"
            })
        }
    }

    async deleteSubCategory(req,res) {
        let id = req.params.id;
        let result = await service.deleteSubCategory(id);
        if(result === null){
            res.status(400).json({
                message : "the sub category not found"
            })
        }else{
            res.json({
                message : "the sub category deleted successfully"
            })
        }
    }

    async deleteAllSubCategory(req,res) {
        let result = await service.deleteAllSubCategories();
        if(result === null){
            res.json({
                message : "there is a problem in deleting all sub categories try another time!"
            })
        }else{
            res.json({
                message : "all sub categories  deleted successfully"
            })
        }
    }

    async changeSubCategory(req,res) {
        let id = req.params.id;
        let result = await service.changeSubCategoryStatus(id);

        if(result === null){
            res.status(400).json({
                message : "the sub category not found"
            })
        }else{
            res.json({
                message : "the sub category statue changed successfully"
            })
        }
    }
}

module.exports = {
    subCategoryControllers
}