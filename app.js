const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const app = express()
const port = 3000

const { sequelize } = require('./db/sequelizeSetup')

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.json(req.cookies) // je fais une requete
    res.cookie(`estDejaVuSurLeSite`, true) // je reçois une réponse
    
    res.json('Hello World !')
})

const coworkingRouter = require('./routes/coworkingRoutes')
const userRouter = require('./routes/userRoutes')


app.use('/api/coworkings', coworkingRouter) //tous les endspoint réunient dans ce fichier auront ce router
app.use('/api/users', userRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


