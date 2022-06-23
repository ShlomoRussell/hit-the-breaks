const express = require('express');
const jwtMiddleware = require('./middlewares/jwt.middleware');
require('dotenv').config()
const app = express();
app.use(express.json())
app.use(express.static("static"));

app.use('/auth', require('./controllers/auth.ctrl'))
app.use(jwtMiddleware);
app.get('/', (req, res) => {
    res.send('Hello from the other side')
})
app.listen(process.env.PORT,()=>console.log(`started at ${process.env.PORT}`))