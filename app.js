const express = require("express")
const app = express()

const { start } = require('./connectDB/db')
start(app)

const { routers } = require('./routers/routers')
routers(app)