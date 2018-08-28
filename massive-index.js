require('dotenv').config()


//You can create a directory in the root of your project called "db" and Massive will load the SQL files therein and make them executable based on file name.

const express = require('express')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , app = express();

app.use(bodyParser.json());


//connect to the database. This will load the tables and functions, returning them to the db instance
massive(process.env.DATABASE_URL2).then(dbInstance => {
    app.set('db', dbInstance);
    
    // initializing database with seed file
    app.get('db').seed_file().then(res => console.log(res))
    .catch(err => console.log(err))
});



app.get('/api/users', (req, res) => {
    app.get('db').get_users().then( (users) => {
        res.status(200).send(users);
})});


const port = 4000;
app.listen(port, () => console.log(`Listening on port ${port}`))
