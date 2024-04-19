
const user_model = require("../models/user.model")

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

module.exports = {
    verifySignUpBody: verifySignUpBody
}