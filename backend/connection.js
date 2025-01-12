import mongoose from "mongoose"

async function mongoConnect(url) {

    try{

        await mongoose.connect(url)
        console.log("Mongodb Connected")
    }

    catch(error){

        console.log(error)
    }
    
}



export default mongoConnect