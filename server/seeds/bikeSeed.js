const mongoose = require('mongoose');
const Bike = require('../models/bike');

// Connect to the MongoDB database
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/bike-rental', {
useNewUrlParser: true,
useUnifiedTopology: true
});

const bikes = [
{
bikeType: "Road Bike",
isRented: false,
isInMaintenance: false
},
{
bikeType: "Mountain Bike",
isRented: false,
isInMaintenance: false
},
{
bikeType: "Hybrid Bike",
isRented: false,
isInMaintenance: false
},
{
bikeType: "Electric Bike",
isRented: false,
isInMaintenance: false
},
{
bikeType: "BMX Bike",
isRented: false,
isInMaintenance: false
}
];

// Function to seed the bikes data
const seedBikes = async () => {
try {
// Remove all existing bikes
await Bike.deleteMany({});
console.log('Bikes removed.');

for (const bike of bikes) {
    const newBike = new Bike(bike);
    await newBike.save();
  }
  console.log('Bikes seeded successfully.');
  
  // Disconnect from the database
  mongoose.connection.close();
} catch (error) {
    console.error(error);
    }
    };
    
    seedBikes();
    
    
    
    
    