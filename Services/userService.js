const {findOne, insertOne, findAll, deleteOne, updateOne, deleteAll, deleteSome} = require("../DB/Base");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {ObjectId} = require("mongodb");
const dataBaseName = "ZobaStore";
const collectionName = "users";

class UserService {

    //registration (add user)
    async register(firstname, lastname, username, password, gender) {

        //check if username exist before or no
        let user = await findOne(dataBaseName, collectionName, {username: username});
        if (!user) {
            //encrypt password
            const hashed_password = await bcrypt.hash(password, 10);
            return await insertOne(dataBaseName, collectionName,
                {firstname, lastname, username, hashed_password, gender, isActive: true, isAdmin: false});
        } else {
            return null;
        }
    }

    //login
    async login(username, password) {
        try {
            let user = await findOne(dataBaseName, collectionName, {username: username});

            //1-check if user found
            if (!user) {
                return {statues: false, message: "user not found"}
            }

            //2-check if password match
            await bcrypt.compare(password, user.password, function (err) {
                if (err) {
                    return {statues: false, message: "password wrong"};
                }
            })

            //3-check user statues
            if (!user.isActive) {
                return {statues: false, message: "user not active"}
            }

            //4-send token from server to client side
            let token = jwt.sign({username: user.username, id: user._id, isAdmin: user.isAdmin}
                , 'shhhhh');
            return {status: true, token};

        } catch (e) {
            return null;
        }
    }

    //list all users
    async listUsers() {
        return await findAll(dataBaseName, collectionName);
    }

    //list user
    async listUser(token){
        try {
            //get id of the user from token
            let id = await this.getUserIdFromToken(token);
            let user = await findOne(dataBaseName, collectionName,{"_id" : ObjectId(id)});
            return user;
        }catch (e) {
            return null;
        }

    }

    //get user by id
    async getUserById(id) {
        let user = await findOne(dataBaseName, collectionName, {_id: ObjectId(id)});
        if (!user) {
            return null
        } else {
            return user
        }

    }

    //delete user by id
    async deleteUserById(id) {
        let user = await findOne(dataBaseName, collectionName, {_id: ObjectId(id)});
        if (!user) {
            return null;
        } else {
            return await deleteOne(dataBaseName, collectionName, {_id: ObjectId(id)});
        }

    }

    //delete all users
    async deleteAllUsers(token) {
        try {
            let username = await this.getUserNameFromToken(token);
            return await deleteSome(dataBaseName,collectionName,{username: {$ne : username}});
        }catch (e) {
            return null;
        }
    }

    //update user by id
    async updateUserById(id, data) {
        let user = await findOne(dataBaseName, collectionName, {_id: ObjectId(id)});
        if (!user) {
            return null;
        } else {
            return updateOne(dataBaseName, collectionName, id, data);
        }
    }

    //change user status by id
    async changeUserStatus(id) {
        let user = await findOne(dataBaseName, collectionName, {_id: ObjectId(id)});
        if (!user) {
            return null;
        }
        if (!user.isActive || user.isActive === false) {
            return updateOne(dataBaseName, collectionName, id, {isActive: true});
        } else {
            return updateOne(dataBaseName, collectionName, id, {isActive: false});
        }
    }


    async getUserIdFromToken(token) {
        let decoded = jwt.verify(token, 'shhhhh');
        return decoded.id;
    }

    async getUserNameFromToken(token) {
        let decoded = jwt.verify(token, 'shhhhh');
        return decoded.username;
    }

}
module.exports = {
    UserService
}