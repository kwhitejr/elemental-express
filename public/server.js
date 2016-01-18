var express = require('express');
var db = require('./models');

var app = express();

app.post('/users', function (req, res) {
  db.models.User.create({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    bio: faker.lorem.sentence(),
    email: faker.internet.email()
  });
});

app.listen(8080, function () {
  db.sequelize.sync();
});