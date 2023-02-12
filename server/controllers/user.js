const User = require('../models/user');


module.exports.registerUser = async (req,res,next) => {
    try {
        
        const {username,email,password} = req.body;
        const user = new User({username,email});
        const registeredUser = await User.register(user,password);
        req.login(registeredUser, function(err) {
            if(err){
                return next(err);
            }
           
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports.login = (req,res) => {
    delete req.session.returnTo;
}