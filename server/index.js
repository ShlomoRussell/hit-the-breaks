const express = require('express');
require('dotenv').config()
const app = express();
app.use(express.json())
app.use('/auth',require('./controllers/auth.ctrl'))
app.get('/', (req, res) => {
    res.send('Hello from the other side')
})
app.listen(process.env.PORT,()=>console.log(`started at ${process.env.PORT}`))