// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";



// async function main(){
//     await mongoose.connect(MONGO_URL);
// }

// const initDB = async()=>{
//     await Listing.deleteMany({});
//     initData.data = initData.data.map((obj)=>({
//         ...obj,owner:"69c8dd8f35f8ceb9cc30673d"
//     }));
//     await Listing.insertMany(initData.data);
//     console.log("data was initialised");
// };
// main()
// .then(()=> console.log("connected to DB"))
// .catch(err =>{
//     console.log(err);
// });

// initDB();

const mongoose = require("mongoose");
const initData = require("./data.js"); // this is an array ✅
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

// connect DB
async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("connected to DB");
}

// initialize DB
const initDB = async () => {
    await Listing.deleteMany({});

    const updatedData = initData.map((obj) => ({
        ...obj,
        owner: new mongoose.Types.ObjectId("69c8dd8f35f8ceb9cc30673d"),
    }));

    await Listing.insertMany(updatedData);

    console.log("data was initialised");
};

// run everything
main()
    .then(() => initDB())
    .catch((err) => console.log(err));