
const user_model = require("../models/user.model")
const jwt = require('jsonwebtoken')
const auth_config = require("../configs/auth.config")

/**
 * Create a mw will check if the request body is proper and correct
 */
const verifySignUpBody = async (req, res , next) => {

    try{
        //check for the name 
        if(!req.body.name){
            return res.status(400).send({
                message : "Failed ! Name was not provided in the request body"
            })
        }

        // check for the email
        if(!req.body.email){
            return res.status(400).send({
                message : "Failed ! Email was not provided in the request body"
            })
        }
        //check for the userid
        if(!req.body.userId){
            return res.status(400).send({
                message : "Failed ! userId was not providedin the request body"
            })
        }
        //check if the user with same userid is already present 
        const user = await user_model.findOne({userId : req.body.userId})
        if(user){
            return res.status(400).send({
                message : "Failed ! user with same userid is already present"
            })
        }

        next()

    }catch(err){
        console.log("Error while validatiing the request object body",  err);
        res.status(500).send({
            message : "Error while validatiing the request object body"
        })
    }
}

const verifySignInBody = async (req , res , next) =>{
    if(!req.body.userId){
        return res.status(400).send({
            message : "Failed ! userId was not provided in the request body"
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            message : "Failed ! password was not provided in the request body"
        })
    }
    next()
}

const verifyToken = (req, res, next) => {
    //check if the token is present in the header
    const token = req.headers["x-access-token"]
    if(!token){
        return res.status(403).send({
            message : "No token found : Unauthorized"
        })
    }
    //If it's the valid token
    jwt.verify(token,auth_config.secret ,async(err , decoded) =>{
        if(err){
            return res.status(401).send({
                message : "Unauthorized !!"
            })
        }
        const user = await user_model.findOne({userId :decoded.id})
        if(!user){
            return res.status(400).send({
                message : "Unauthorized , this user for token doesnt exist"
            })
        }
        //Set the user Info in the req body
        req.user = user
        next()
    })

    //Then move to the next step
}

const isAdmin = (req, res , next) => {
    const user  = req.user
    if(user && user.userType == "ADMIN"){
        next()
    } else{
        return res.status(403).send({
            message : "Only admins user are allowed to access this end point"
        })
    }
}


module.exports = {
    verifySignUpBody: verifySignUpBody,
    verifySignInBody : verifySignInBody,
    verifyToken: verifyToken, 
    isAdmin : isAdmin
}