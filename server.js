const express = require('express')
const dotenv = require('dotenv')
const { connectToDB } = require('./config/db')
const AuthRouter = require('./routes/authRoutes')
const { MedicineRouter } = require('./routes/medicineRoutes')
const { LogRouter } = require('./routes/logRoutes')
const { authenticate } = require('./middlewares/authenticationMiddleware')

const app = express()
dotenv.config()
const PORT = process.env.PORT || 5000
app.use(express.json())
// routes
app.use('/api/auth', AuthRouter)
app.use('/api/medicine', authenticate(['USER']), MedicineRouter)
app.use('/api/logs', authenticate(['ADMIN']), LogRouter)

connectToDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log('server running on post = ', PORT);
        })
    })
    .catch((error) => {
        console.log('server couldnot be started', error)
    })