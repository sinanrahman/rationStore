const express = require("express")
const router = express.Router()

const adminController = require("../controllers/authController")

router.get("/login", adminController.showLoginPage)
router.post("/loginpage", adminController.login)
router.get("/logout", adminController.logout)

router.get("/add-admin", adminController.createAdmin)

module.exports = router