let {UserService} = require('../Services/userService');
let service = new UserService();

class authControllers {

    async register(req, res) {
        let {firstname ,lastname ,username, password, gender} = req.body;
        let result = await service.register(firstname ,lastname ,username, password, gender);
        if(result != null){
            res.json({
                message: "sign-up successfully"
            })
        }else{
            res.json({
                message: "the username already used try another one"
            })
        }
    }

    async login(req, res) {
        let {username,password} = req.body;
        let user  = await service.login(username,password);
        if(user != null){
            res.json({
                message :"login successfully",
                user
            })
        }else{
            res.json({
                message : "login fail try another time"
            })
        }
    }

}
module.exports = {
    authControllers
}