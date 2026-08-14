const express = require('express');
const { connectDB } = require('./db');
connectDB()
const routes = require('./Routes/courseRoutes');
const cors = require('cors');

const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/course',routes)

app.listen(4000, () => {
    console.log('server is running....');

})