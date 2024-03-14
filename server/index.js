const express = require('express');
const app = express()
const port = 5000;
const cors = require('cors')
const connection = require('./db/connection');
const cookieParser = require('cookie-parser');
const router = require('./routes/routes')
require('dotenv').config()

connection()

//middleware 
app.use(express.json())
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(cookieParser())
app.use('/api', router)


app.listen(port, () => {
    console.log(`server running at ${port}`);
})


