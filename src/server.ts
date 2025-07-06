import app from "./app";


let server;
const port = 5000;
async function main() {
   try {
    server= app.listen(port,()=>{
        console.log(`App is listneing on ${port}`)
    })
   } catch (error) {
    console.log(error)
   }
}

main();