require('dotenv').config()

const express = require('express')
    , bodyParser = require('body-parser')
    , Sequelize = require('sequelize')
    , app = express();

app.use(bodyParser.json())


// Connection to the Heroku Postgres DB
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
      ssl: true
  }
});




// You can use the .authenticate() function like this to test the connection.
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });




// A Model represents a table in the database.
// Models are defined with sequelize.define('name', {attributes}, {options}).
const User = sequelize.define('user', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  likes: Sequelize.TEXT,
  birthdate: Sequelize.DATE
});
  



// // Sync this Model to the DB (Create the table). force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
  // User Table is now created!
  return User.bulkCreate([{
    firstName: 'Fred',
    lastName: 'Flintstone',
    birthdate: '1/1/1960'
  },{
    firstName: 'Wilma',
    lastName: 'Flintstone'
  },{
    firstName: 'Pebbles',
    lastName: 'Flintstone'
  },{
    firstName: 'Barney',
    lastName: 'Rubble'
  },{
    firstName: 'Betty',
    lastName: 'Rubble'
  },{
    firstName: 'Bamm-Bamm',
    lastName: 'Rubble'
  }]);
});




app.get('/api/users', (req, res) => {
  User.findAll().then(users => res.send(users));
});



app.post('/api/users', (req, res) => {
  User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName
  }).then(user => res.send(user));
});




app.put('/api/users/:name', (req, res) => {
  User.update({
    lastName: req.body.newLastName,
  }, {
    where: {
      firstName: req.params.id
    }
  }).then(NumberOfUpdatedUsers => res.send(NumberOfUpdatedUsers));
});




app.delete('/api/users/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
});



// Replacements in a query can be done in two different ways, either using named parameters (starting with :), or unnamed, represented by a ?. Replacements are passed in the options object.
app.get('/api/user/:id', (req, res) => {

  sequelize.query('SELECT * FROM Users WHERE id = ?',
    { replacements: [req.params.id], type: sequelize.QueryTypes.SELECT }
  ).then(user => res.send(user));

  // sequelize.query('SELECT * FROM Users WHERE id = :id ',
  //   { replacements: { id: req.params.id }, type: sequelize.QueryTypes.SELECT }
  // ).then(user => res.send(user));
})



const port = 4000;
app.listen(port, () => console.log(`Listening on port ${port}`))