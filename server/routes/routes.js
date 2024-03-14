const router = require('express').Router()
const { signup, login, logout, checkuser } = require('../controllers/auth-controller')
const { addtoFevourites, removeFromFavourites, getFavourties } = require('../controllers/feature-controller')
const { TokenVerify } = require('../middleware/TokenVerify')

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)

router.get('/checkUser', TokenVerify, checkuser)

router.post("/addToFavourites/:id", addtoFevourites);
router.post("/removeFromFavourites/:id", removeFromFavourites);
router.get("/getFavourites/:id", getFavourties);


module.exports = router