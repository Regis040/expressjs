const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const app = express()
const port = 3000

// const { sequelize } = require('./db/sequelizeSetup')

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

app.get('/', (req, res) => {
    // Exemple d'un cookie de première visite d'un site

    // console.log(req.cookies)
    // res.cookie('monapirest_estdejavenu', true)
    // if (req.cookies.monapirest_estdejavenu) {
    //     res.json('Hello World !')
    // } else {
    //     res.json('Salut tu es nouveau !')
    // }

    res.json('Hello World !')
})

const coworkingRouter = require('./routes/coworkingRoutes')
const userRouter = require('./routes/userRoutes')

app.use('/api/coworkings', coworkingRouter)
app.use('/api/users', userRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})