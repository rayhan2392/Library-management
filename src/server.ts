import mongoose from "mongoose";
import app from "./app";


let server;
const port = 5000;
async function main() {
   try {
     await mongoose.connect(
      "mongodb+srv://todosApp:Y3qRsLX2yG1tEVRe@cluster0.s6hdjpg.mongodb.net/libraryDB?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("connected to mongodb using mongoose");
    server= app.listen(port,()=>{
        console.log(`App is listneing on ${port}`)
    })
   } catch (error) {
    console.log(error)
   }
}

main();