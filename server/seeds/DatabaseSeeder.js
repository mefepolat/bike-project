const mongoose = require("mongoose");
const Bike = require("../models/bike");
const Station = require("../models/station")
// Connect to the MongoDB database
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/bike-rental", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const stations = [
  {
    stationName: 'Station 1',
    location: 'Montreal',
    geometry: {
      type: 'Point',
      coordinates: [-73.561668, 45.5019]
    },
    availableBikes: []
  },
  {
    stationName: 'Station 2',
    location: 'Montreal',
    geometry: {
      type: 'Point',
      coordinates: [-73.555811, 45.519185]
    },
    availableBikes: []
  },
  {
    stationName: 'Station 3',
    location: 'Montreal',
    geometry: {
      type: 'Point',
      coordinates: [-73.589294, 45.511906]
    },
    availableBikes: []
  }
];

const bikes = [
  {
    bikeType: "Road Bike",
    isRented: false,
    isInMaintenance: false,
  },
  {
    bikeType: "Mountain Bike",
    isRented: false,
    isInMaintenance: false,
  },
  {
    bikeType: "Hybrid Bike",
    isRented: false,
    isInMaintenance: false,
  },
  {
    bikeType: "Electric Bike",
    isRented: false,
    isInMaintenance: false,
  },
  {
    bikeType: "BMX Bike",
    isRented: false,
    isInMaintenance: false,
  },
];
async function seedDatabase() {
  try {
   

    await Station.deleteMany({});
    await Bike.deleteMany({});

    const savedStations = await Station.insertMany(stations);
    console.log(`Saved ${savedStations.length} stations to the database`);

    const savedBikes = Promise.all(bikes.map(async bike => {
      const station = savedStations[Math.floor(Math.random() * savedStations.length)];
      bike.station = station._id;
      const newBike = new Bike(bike);
      await newBike.save();
      station.availableBikes.push(newBike._id);
      await station.save();
      return newBike;
    }));
    
    console.log(`Saved ${savedBikes.length} bikes to the database`);

    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
}

// seedDatabase();



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