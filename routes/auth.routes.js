/**
 * Post localhost:8080/ecom/api/v1/auth/signup
 * 
 * I need to intercept this
 */

const authController = require("../controllers/auth.controller");
const authMw = require("../middlewares/auth.mw");
const authMiddleware = require("../middlewares/auth.mw")


module.exports = (app) =>{
    app.post("/ecom/api/v1/auth/signup", [authMiddleware.verifySignUpBody] , authController.signup)

    /**
     * Route for 
     * POST localhost:8080/ecom/api/v1/auth/signin
     */
    app.post("/ecom/api/v1/auth/signin",[authMiddleware.verifySignInBody], authController.signin)
}