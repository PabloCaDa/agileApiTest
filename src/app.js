const express = require('express');
const monitor = require('express-status-monitor')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors');
const auth = require('./auth');
const users = require('./users');
const costumers = require('./costumers');
const api = require('./api')


const PORT = 5000;
const app = express()

app.use(monitor())
app.use(cors());  
 
app.use(helmet())
app.use(helmet.noCache())
app.use(morgan('tiny'))

app.use('/api', api)
app.get('/docs', generateDocs([auth.blueprint]),generateDocs([users.blueprint]), generateDocs([costumers.blueprint]))

module.exports = function startUp(){
    return app.listen(PORT, (err) => {
        console.log(`Servidor listo en  http://localhost:${PORT}`)
        if (err) console.log('El servidor no esta escuchando')
})
}