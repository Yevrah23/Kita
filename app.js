const express = require('express');
const app = express();
const path = require("path");
const port = 3000;
const logger = require('./middleware/logger');





//Init Middleware
//app.use(logger);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended : false}))

app.use('/api/users', require('./routes/api/users'));
app.use('/api/questions', require('./routes/api/questions'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname), 'public', 'index.html');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})