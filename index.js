const express = require('express');
const app = express();
const port = 3000;
const checkDup = require('./routes/checkDup.js');
const cors = require('cors');

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['POST', 'GET'],
}));

app.use('/api', checkDup);

app.listen(port, ()=>{
    console.log("App listening at port :%s", port);
})