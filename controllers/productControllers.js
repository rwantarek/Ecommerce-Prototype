let {ProductService} = require('../Services/poductService');
let service = new ProductService();

class ProductControllers{

    async listProducts(req,res) {
        let result = await service.listProducts();
        if(result === null){
            res.json({
                message : "there is error in list all products"
            })
        }else{
            res.json({
                list : result
            })
        }
    }

    async listProductById(req,res) {
        let id = req.params.id;
        let result = await service.listOneProduct(id);
        if(result === null){
            res.status(400).json({
                message : "the product not found"
            })
        }else{
            res.json({
                list : result
            })
        }
    }


    async listProductByGeneralCategoryId(req,res) {
        let g_id = req.params.id;
        let result = await service.listProductByGeneralCategoryId(g_id);
        if(result === null){
            res.status(400).json({
                message : "the product not found"
            })
        }else{
            res.json({
                list : result
            })
        }
    }

    async listProductByCategoryId(req,res) {
        let c_id = req.params.id;
        let result = await service.listProductByCategoryId(c_id);
        if(result === null){
            res.status(400).json({
                message : "the product not found"
            })
        }else{
            res.json({
                list : result
            })
        }
    }

    async listProductBySubCategoryId(req,res) {
        let sc_id = req.params.id;
        let result = await service.listProductBySubCategoryId(sc_id);
        if(result === null){
            res.status(400).json({
                message : "the product not found"
            })
        }else{
            res.json({
                list : result
            })
        }
    }

    async listProductByCategoryAndGeneralCategoryIds(req,res) {
        let id1 = req.params.id1;
        let id2 = req.params.id2;
        let result = await service.listProductByCategoryAndGeneralCategoryIds(id1,id2);
        if(result === null){
            res.status(400).json({
                message : "the product not found"
            })
        }else{
            res.json({
                list : result
            })
        }
    }

    async listProductBySubCategoryAndCategoryAndGeneralCategoryIds(req,res) {
        let id1 = req.params.id1;
        let id2 = req.params.id2;
        let id3 = req.params.id3;
        let result = await service.listProductBySubCategoryAndCategoryAndGeneralCategoryIds(id1,id2,id3);
        if(result === null){
            res.status(400).json({
                message : "the product not found"
            })
        }else{
            res.json({
                list : result
            })
        }

    }

    async listProductHaveSale(req,res) {
        let result = await service.listProductsHaveSale();
        if(result === null){
            res.json({
                message : "there is error in list all products"
            })
        }else{
            res.json({
                list : result
            })
        }
    }

    async listAvailableProducts(req,res) {
        let result = await  service.listAvailableProducts();
        if(result === null){
            res.json({
                message : "there is error in list all products"
            })
        }else{
            res.json({
                list : result
            })
        }
    }

    async createProduct(req,res) {
        let data = req.body;
        let result = await service.createProduct(data);
        if(result === "change barcode"){
            res.json({
                message: "change barcode please"
            })
        }else{
            if (result === null) {
                res.json({
                    message: "the product creation fail"
                })
            } else {
                res.json({
                    message: "the product created successfully"
                })
            }
        }
    }

    async updateProduct(req,res) {
        let id = req.params.id;
        let data = req.body;

        let result = await service.updateProduct(id , data);

        if(result === null){
            res.status(400).json({
                message : "the product not found"
            })
        }else{
            res.json({
                message : "the product updated successfully"
            })
        }
    }

    async deleteProduct(req,res) {
        let id = req.params.id;
        let result = await service.deleteProduct(id);

        if(result === null){
            res.status(400).json({
                message : "the product not found"
            })
        }else{
            res.json({
                message : "the product deleted successfully"
            })
        }
    }

    async deleteAllProducts(req,res) {
        let result = await service.deleteAllProducts();
        if(result === null){
            res.json({
                message : "there is a problem in deleting all products try another time!"
            })
        }else{
            res.json({
                message : "all products deleted successfully"
            })
        }
    }

    async deleteNotAvailableProducts(req,res) {
        let result = await service.deleteNotAvailableProducts();
        if(result === null){
            res.json({
                message : "there is a problem in deleting non available products try another time!"
            })
        }else{
            res.json({
                message : "all non available products deleted successfully"
            })
        }
    }


    async changeProductStatues(req,res) {
        let id = req.params.id;
        let result = await service.changeStatues(id);

        if(result === null){
            res.status(400).json({
                message : "the product not found"
            })
        }else{
            res.json({
                message : "the product statues changed successfully"
            })
        }
    }
}

module.exports = {
    ProductControllers
}