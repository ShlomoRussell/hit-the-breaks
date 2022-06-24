const express = require('express');
const { authRouter, vacationsRouter } = require('./controllers');
const {jwtMiddleware} = require('./middlewares');
require('dotenv').config()
const app = express();
app.use(express.json())
app.use(express.static("static"));

app.use('/auth', authRouter)
app.use(jwtMiddleware);
app.use('/api/vacations',vacationsRouter)
app.get('/', (req, res) => {
    res.send('Hello from the other side')
})
app.listen(process.env.PORT,()=>console.log(`started at ${process.env.PORT}`))