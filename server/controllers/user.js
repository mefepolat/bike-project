const User = require("../models/user");
const passport = require("passport");

module.exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    res.json(registeredUser);
  } catch (error) {
    console.log(error);
  }
};

module.exports.login = (req, res, next) => {
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

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      const newUser = { ...user };
      
      req.session.user = {
        _id: user._id,
        username: user.username,
        trips: user.trips,
        admin: user.admin,
      };
    
      return res.json({ session: req.session });
    });
  })(req, res, next);
};

module.exports.logout = (req, res, next) => {
  
  req.session.destroy();
 
  req.logout(function (error) {
    res.clearCookie("session");
    if (error) {
     
      next(error);
    }
    
    return res.json({
      success: true,
      message: "Successfully logged out.",
    });
  });
};
