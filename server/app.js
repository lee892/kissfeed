//var createError = require('http-errors')
const express = require('express')
//const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const config = require('./utils/config')
require('express-async-errors')
const articleRouter = require('./routes/article')
const usersRouter = require('./routes/users')
const loginRouter = require('./routes/auth')
const reqArticleRouter = require('./routes/requestArticle.js')
const mongoose = require('mongoose')
//const { Configuration, OpenAIApi } = require('openai')
const cors = require('cors')
const bodyParser = require('body-parser')
const middleware = require('./utils/middleware')

const app = express()

//db connection
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('build'))

//routes
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/articles', reqArticleRouter)
app.use('/api/articles', articleRouter)


app.get('/health', (req, res) => {
    res.send('ok')
})

app.get('/version', (req, res) => {
    res.send('1') // change this string to ensure a new version deployed
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


app.use((err, req, res) => {
    res.locals.error = err
    const status = err.status || 500
    res.status(status)
    res.render('error')
})


module.exports = app
