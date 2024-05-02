/**
 * This will be the starting file of the project
 */

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const server_config = require("./configs/server.config")
const db_config = require("./configs/db.config")
const user_model = require("./models/user.model")
const bcrypt = require("bcryptjs")

app.use(express.json()) 
//Middleware means whenever you get json you have to read it as json object

/**
 * Create an admin user at the starting of the applications
 * If no already present
 */
// Connection with MongoDb
mongoose.connect(db_config.DB_URL)

const db= mongoose.connection
db.on("error", ()=>{
    console.log("Error while connecting to MongoDB")
})

db.once("open", ()=>{
    console.log("Connected to MongoDB");
    init()
})

async function init(){
    try{
        const user = await user_model.findOne({userId : "admin"})

    if(user){
        console.log("Admin is already present");
        return
        }

    }catch(err){
        console.log("Error while reading the data", err);
    }
    try{
        user =  await user.model.create({
            name : "Abhishek",
            userId : "admin",
            email : "abhishek@gmail.com",
            userType : "ADMIN",
            password : bcrypt.hashSync("Welcome123" , 8) //to encrypt the password
        })
        console.log("Admin is created",  user);

        }catch(err){
            console.log("Error while create admin" , err)
    }
}

/**
 * Stich the route to the server
 */
require("./routes/auth.routes")(app) //calling routes and passing app object
//ye krne ke bad my server knows abt the routes and my my routes know abt 
//the controller and my controller knows abt my models 
//saari cheeze ek doosre se connected hai

require("./routes/category.route")(app)


/*
 * Start the server
 */
app.listen(server_config.PORT , ()=>{
    console.log("Server started at port num :" , server_config.PORT);
})