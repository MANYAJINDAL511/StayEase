const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/stayease";

main().then(()=>{
    console.log("Connected");
}).catch((err)=>console.log(err));

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({
        ...obj,
        owner:"67f8c1808c7b92bb5988f063",
    }));
    await Listing.insertMany(initData.data);
    console.log("Success");
}

initDB();