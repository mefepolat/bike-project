const User = require('../models/user');
const passport = require('passport');


module.exports.registerUser = async (req,res,next) => {
    try {
        
        const {username,email,password} = req.body;
        const user = new User({username,email});
        const registeredUser = await User.register(user,password);
        res.json(registeredUser);
        
        }
     catch (error) {
        console.log(error);
    }
}

module.exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid username or password',
      });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      res.cookie('user', user, {
        maxAge: 3600 * 10000, // 1 hour in milliseconds
        httpOnly: true,
        secure: true,
      });

      const newUser = { ...user };
      return res.json({ newUser });
    });
  })(req, res, next);
};

module.exports.logout = (req,res,next) => {

    req.logout(function(error) {
        if(error){
            return next(error)
        }
        delete req.session.returnTo;
        return res.json({
          success:true,
          message: "Successfully logged out."
        })
    })
    
}


// module.exports.checkUser = async (req,res,next) =>{
//   const {userId} = req.body;
//   const user = await User.findById(userId);
//   return res.json({user});
// }