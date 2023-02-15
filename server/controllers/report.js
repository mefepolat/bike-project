const Report = require('../models/report');
const User = require('../models/user')

module.exports.createReport = async (req,res,next) => {
   try {
    const {title, description, dummyUser} = req.body;
    console.log(dummyUser)
   const report = new Report({title, description});
   report.author = dummyUser._id;
   const updatedUser = User.findById(dummyUser._id);
   console.log(report.author)
   await report.save();
    updatedUser.trips.push(report._id);
    await updatedUser.save();
   return res.json({message: 'Your report has been successfully created.'})
} catch(err) {
    return res.status(400).json(err);
}
}
