const express = require('express')
const path = require('path')
// const logger = require('./middleware/logger')
// const error404 = require('./middleware/err-404')
// const indexRouter = require('./routes/index2')
// const indexRouter_login = require('./routes/index_login')
const errorMiddleware = require('../src/middleware/error')
const crudRouter = require('../src/routes/crud')
const app = express()
// app.use(logger)
app.use(express.urlencoded())
app.set("view engine", "ejs")
app.use('/crud', crudRouter)
// app.use('/api/books', indexRouter)
// app.use('/api/user/login', indexRouter_login)
// app.use('/api/books/:id', indexRouter)
// app.use('/api/books/:id/download',indexRouter)
// app.use(error404)
app.use(errorMiddleware)
app.set('views', path.join('src/views'))

const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log(`Server is listening port ${PORT}`)