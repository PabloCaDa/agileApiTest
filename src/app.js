const express = require('express');
const monitor = require('express-status-monitor')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors');
const auth = require('./auth');
const usersRouter = require('./users');
const costumersRouter = require('./costumers');
const authRouter = require('./auth');

const PORT = 5000
const app = express()

app.use(monitor())
app.use(express.json());  
app.use(cors());  
 
app.use(helmet())
app.use(helmet.noCache())
app.use(morgan('tiny'))

app.use(auth.middleware.secureHeaders)

app.use('/auth', authRouter);
app.use('/users', auth.middleware.authorization, auth.middleware.adminDetector, usersRouter);
app.use('/costumers', auth.middleware.authorization, costumersRouter);


module.exports = function startUp(){
    return app.listen(PORT, (err) => {
        console.log(`Servidor listo en el puerto ${PORT}`)
        if (err) console.log('El servidor no esta escuchando')
})
}