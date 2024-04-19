/**
 * Post localhost:8080/ecom/api/v1/auth/signup
 * 
 * I need to intercept this
 */

const authController = require("../controllers/auth.controller");

module.exports = (app) =>{
    app.post("/ecom/api/v1/auth/signup", authController.signup)
}