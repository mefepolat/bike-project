const Report = require('../models/report');


module.exports.createReport = async (req,res,next) => {
   try {
    const {title, description, user} = req.body;
   console.log(title)
   console.log(user._id)
   const report = new Report(title, description);
   report.author = user._id;
   await report.save();
   return res.json({message: 'Your report has been successfully created.'})
} catch(err) {
    return res.statusCode(400).json(err);
}
}
