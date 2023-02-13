const ExpressError = require('./utils/ExpressError');
const Trips = require('./models/trips')

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        return res.json({
            message: "You are not authenticated"
        })
    }
    next();
}

module.exports.isRider = async(req,res,next) => {
    const {id} = req.params;
    const trip = await Trips.findById(id);

    if(!trip.rider.equals(req.user.id)){

        throw new ExpressError('you do not have permission to do that.', 500);
    }
    next();
}