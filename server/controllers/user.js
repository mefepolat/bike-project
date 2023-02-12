const User = require('../models/user');
const passport = require('passport')


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


module.exports.login = (req,res,next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
          return next(err);
        }
    
        if (!user) {
          return res.status(400).json({
            success: false,
            message: "Invalid username or password",
          });
        }
    
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
    
          return res.json({
            success: true,
            message: "Login successful!",
            user,
          });
        });
      })(req, res, next);
}

module.exports.logout = (req,res,next) => {

    req.logout(function(error) {
        if(error){
            return next(error)
        }
    })
}