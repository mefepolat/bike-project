const Report = require("../models/report");
const User = require("../models/user");
const Bike = require("../models/bike");
const Trip = require("../models/trip");

module.exports.createReport = async (req, res, next) => {
  try {
    const { title, description, dummyUser, id, category } = req.body;
    console.log(dummyUser);

    if (!dummyUser) {
      return res.status(403).json({
        message: "You need to be logged in to make a report!",
      });
    }
    if (!id) {
      return res.status(403).json({
        message: "There is no active trip found to be able to make a report.",
      });
    }
    if (!title || !description) {
      return res.status(403).json({
        message: "All fields are required.",
      });
    }

    
    const endDate = new Date().toISOString();
    const trip = await Trip.findByIdAndUpdate(id, {
      isActive: false,
      end_date: endDate,
      end_station: "",
    });
    const report = new Report({ title, description, bike:trip.bike });
    const bike = await Bike.findByIdAndUpdate(trip.bike, {
      isRented: false,
      $unset: { station: 1 },
    });
    if (!bike) {
      res.json({
        message: "there is an issue with the bike",
      });
    }
    if (category === "repair") {
      bike.isInMaintenance = true;
    } else if (category === "lost") {
      bike.isLost = true;
    }
    await bike.save();
    report.author = dummyUser._id;
    const updatedUser = await User.findById(dummyUser._id);

    await report.save();
    updatedUser.reports.push(report._id);
    await updatedUser.save();
    return res.json({ message: "Your report has been successfully created." });
  } catch (err) {
    return res.status(400).json(err);
  }
};


module.exports.getReports = async (req,res) => {
    const reports = Report.find({}).populate('author');
    if(!reports){
        return res.json({
            message: "There are no active reports."
        })
    }
    return res.json({reports});
}