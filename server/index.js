const express = require('express');
const app = express()
const cors = require('cors')
const connection = require('./db/connection');
const cookieParser = require('cookie-parser');
const router = require('./routes/routes')
require('dotenv').config()

connection()

//middleware 
app.use(express.json())
app.use(cors({ origin: "https://recipe-mern-app-five.vercel.app/", credentials: true }))
app.use(cookieParser())
app.use('https://recipe-mern-app-nueq.onrender.com/api', router)


app.listen(process.env.PORT, () => {
    console.log(`server running at ${process.env.PORT}`);
})


