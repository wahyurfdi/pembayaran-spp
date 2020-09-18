const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const webRoutes = require('./routes/web')
const apiRoutes = require('./routes/api')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/spp/', webRoutes)
app.use('/api/', apiRoutes)

app.set('view engine', 'ejs')
app.use(express.static(__dirname+'/views'))

app.listen('8080', (err)=>{
    if(err) throw err

    console.log('ON Port http://localhost:8080')
})