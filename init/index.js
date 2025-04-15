const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust_hotel";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => { 
  await Listing.deleteMany({});
  
  const updatedData = initData.data.map((obj) => ({
    ...obj,
    owner: "67f92184e7a4abe29c79cb89", 
  }));

  await Listing.insertMany(updatedData); 
  

  console.log("Data was inserted with owner");
};

initDB();
