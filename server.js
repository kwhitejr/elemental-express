var express = require('express');
var jade = require('jade');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.set('views', 'public');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extend: false}));

app.route('/')
  .get(function (req, res) {
    res.render('./index', {});
  });

app.route('/elements')
  .post(
    validateElement,
    addElementToData
  );


// use the request params to full the jade template
app.get('/:elementName', function (req, res) {
  console.log(req.params);
  res.render('element', {
    elementName: req.params.elementName,
    elementSymbol: req.params.elementSymbol,
    elementAtomicNumber: req.params.elementAtomicNumber,
    elementDescription: req.params.elementDescription
  });
});

function validateElement(req, res, next) {
  if (!req.body.elementName || !req.body.elementSymbol || !req.body.elementAtomicNumber || !req.body.elementDescription) {
    res.status(400);
    // sending both writes and ends the connection/stream
    return res.render('404');
  }
  return next();
}

// alter this function so that it adds the req info to data.json
function createElementData(req, res, next) {
  var newElement = {};
  newElement[req.body.elementName] =
    {
      "elementName": req.body.elementName,
      "elementSymbol": req.body.elementSymbol,
      "elementAtomicNumber": req.body.elementAtomicNumber,
      "elementDescription": req.body.elementDescription
    };

  return newElement;
}

function addElementToData(req, res, next) {
  var newElement = createElementData(req);
  console.log('writing to file...');
  //use synchronous function???
  // var originalFile = fs.readFileSync('data.json');
  // var original = JSON.parse(originalFile);
  // console.log(original);
  // original.push(newElement);
  // var originalJSON = JSON.stringify(original);
  fs.writeFile('data.json', JSON.stringify(newElement), function (err) {
    if (err) throw err;
  });
  res.json(newElement);
  return next();
}


var server = app.listen(3000, function ()  {
  var port = server.address().port;
  console.log('All aboard the elemental express: ' + port);
});