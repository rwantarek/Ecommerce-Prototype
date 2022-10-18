const {findAll, findOne, insertOne, updateOne, deleteAll, deleteOne, deleteSome} = require("../DB/Base");
const {ObjectId} = require("mongodb");
const jwt = require('jsonwebtoken');
const dataBaseName = "ZobaStore";
const collectionName = "orders";

class OrderService {

    // list all orders
    async listOrders() {
        return findAll(dataBaseName,collectionName);
    }

    //list all orders user make before
    async listOrdersUserMake(token) {
        try {
            //get id of the user from token
            let id = await this.getUserIdFromToken(token);

            //return all orders done by this user
            return findAll(dataBaseName,collectionName,{"userId" : id});
        }catch (e){
            return null
        }
    }

    //get order by id
    async listOrderById(id) {
        try {
            return await findAll(dataBaseName,collectionName,{"userId" : id});
        }catch(e) {
            return null;
        }
    }

    //create order
    async createOrder(token,data) {

        // if the user is guest (the token undefined which is the user not sign-in)
        if(token === undefined){
            return null
        }else{
            //1-get id of the user from token
            let id = await this.getUserIdFromToken(token);

            try {
                data.isActive = true;
                data.userId = id;
                return await insertOne(dataBaseName,collectionName,data);
            }catch (e) {
                return null;
            }
        }

    }

    //change order status
    async changeOrderStatues(id) {
        let order = await findOne(dataBaseName,collectionName,{_id : ObjectId(id)})
        if(!order){
            return null
        }
        if(!order.isActive || order.isActive === false){
            return await updateOne(dataBaseName,collectionName,id, {isActive : true})
        }
        else{
            return await updateOne(dataBaseName,collectionName,id, {isActive : false})
        }
    }

    //delete all orders
    async deleteAllOrders() {
        try {
            return await deleteAll(dataBaseName,collectionName);
        }catch (e) {
            return null;
        }

    }

    //delete specific order
    async deleteOrder(id) {
        let order = await findOne(dataBaseName,collectionName,{_id : ObjectId(id)})
        if(!order){
            return null
        }else{
            return await deleteOne(dataBaseName,collectionName,{_id : ObjectId(id)})
        }
    }

    //delete all orders done by specific user
    async deleteOrdersBySpecificUser(id) {
        let order = await findAll(dataBaseName, collectionName, {userId: id});
        if (!order) {
            return null
        } else {
            try {
                return await deleteSome(dataBaseName, collectionName, {userId: id});
            } catch (e) {
                return null;
            }
        }
    }


    async getUserIdFromToken(token){
        let decoded = jwt.verify(token, 'shhhhh');
        let id = decoded.id;
        return id;
    }
}

module.exports = {
    OrderService
}