const express = require('express')
const port = process.env.PORT
const userRouter = require('./routers/router')
const projectRouter = require('./routers/project')
require('./db/db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use('/user', userRouter)
app.use('/project', projectRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})