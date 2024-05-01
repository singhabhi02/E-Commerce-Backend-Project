/**
 * I need to write the controller / logic to register a user
 */
const bcrypt = require('bcryptjs')
const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const { secret } = require('../configs/auth.config')
const secret= require("../configs/auth.config")


exports.signup = async(req, res) => {
    /**
     * Logic ot create the user
     */

    // 1. Read the request body 
    const request_body = req.body // This will get me the request body in the form of javascript


    //2. Insert the data in the Users coleection in MongoDB
const userObj = {
    name: request_body.name,
    userId : request_body.userId,
    email  : request_body.email,
    userType : request_body.userType,
    password : bcrypt.hashSync(request_body.password, 8)
}

try{
    const user_created = await user_model.create (userObj)
    /**
     * Return this user 
     */
    const res_obj ={
        name : user_created.name,
        userId : user_created.userId,
        email : user_created.email,
        userType : user_created.userType,
        createdAt : user_created.createdAt,
        updatedAt : user_created.updatedAt
    }
    
    res.status(201).send(res_obj)

}catch(err){
    console.log("Error while registering the user: " ,  err)
    res.status(500).send;{
        message : "Some Error while registering the user"
    }
}
    //3. Return the response back to the user
}

//------------------------------------------------------------------------------
// We are creating a new user signin form

exports.signin = async (req ,res ) => {

    // Check if the uer ID is present in the system
    const user = await user_model.findOne({userId : req.body.userId})

    if(user == null){
        return res.status(404).send({
            message : "UserId passed is not a vald userId"
        })
    }

    //Password is correct?
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)
    //This method will comapare the password given by the user and the password 
    //stored in the database.
if(!isPasswordValid)
    return res.status(401).send({
        message : "Wrong password passed"
    })

    // Using jwt we will create the access token with a given TTL and return
    const token = jwt.sign({id: user.userId}, secret.secret ,{
        expiresIn : 120
    })
    res.status(200).send({
        name : user.name,
        userId : user.userId,
        email : user.email,
        userType : user.userType,
        accessToken : token
    })
}
