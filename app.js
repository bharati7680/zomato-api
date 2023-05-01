const cors = require('cors')
const express = require('express')
const app = express()

const authRouter = require('./auth_router')
const clientRouter = require('./client_router')
const restaurantRouter = require('./restaurant_router')
const adminRouter = require('./admin_router')

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/client', clientRouter)
app.use('/api/restaurant', restaurantRouter)
app.use('/api/admin', adminRouter)


module.exports = app