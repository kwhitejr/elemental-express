var express = require('express');
var jade = require('jade');
var bodyParser = require('body-parser');

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
    pageBuild //,
    // res.render()
  );


// use the request params to full the jade template
app.get('/:elementName', function (req, res) {
  console.log(req.params);
  res.render('element', {elementName: req.params.elementName, elementSymbol: req.params.elementSymbol, elementAtomicNumber: req.params.elementAtomicNumber, elementDescription: req.params.elementDescription});
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
function pageBuild(req, res, next) {
  var newPage = '<html lang="en">' +
      '<head>' +
        '<meta charset="UTF-8">' +
        '<title> The Elements -' + req.body.elementName + '</title>' +
        '<link rel="stylesheet" href="/css/styles.css">' +
      '</head>' +
      '<body>' +
        '<h1>' + req.body.elementName + '</h1>' +
        '<h2>' + req.body.elementSymbol + '</h2>' +
        '<h3>' + req.body.elementAtomicNumber + '</h3>' +
        '<p>' + req.body.elementDescription + '</p>' +
        '<p><a href="/">back</a></p>' +
      '</body>' +
    '</html>';
  fs.writeFile('./public/' + req.body.elementName + '.html', newPage);
  return next();
}

var server = app.listen(3000, function ()  {
  var port = server.address().port;
  console.log('All aboard the elemental express: ' + port);
});