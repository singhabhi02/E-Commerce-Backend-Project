/**
 *   POST localhost:8080/ecom/api/v1/auth/categories
 */

category_controller = require("../controllers/category.controller")
authMiddleware = require("../middlewares/auth.mw")

module.exports =  (app) =>{
    app.post("/ecom/api/v1/auth/categories" ,[authMiddleware.verifyToken , authMiddleware.isAdmin], category_controller.createNewCategory)
}