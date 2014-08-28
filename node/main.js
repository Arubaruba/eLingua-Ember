var fs = require('fs');
var express = require('express');
var jwt = require('jwt-simple');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');

var router = express.Router();
var app = express();

var port = 7070;
var firebaseSecret = '';

var transport = nodemailer.createTransport(smtpTransport({
  host: 'localhost',
  secure: false
}));

var emailTemplate = handlebars.compile(fs.readFileSync(__dirname + '/templates/add_tutor.hbs', {encoding: 'utf8'}));

//This just sends the email, the admin has to actually authorize
//the tutor's email address
router.get('/add_tutor', function (request, response) {
  //authenticate admin (this should be it's own route later on)
  if (!request.query.token || !request.query.email || !request.query.link) {
    response.end('INCORRECT_PARAMETERS');
  } else {
    var decoded;
    try {
      decoded = jwt.decode(request.query.token, firebaseSecret);
    } catch (err) {
      response.end('INVALID_TOKEN');
    }
    if (decoded) {
      var mailOptions = {
        from: 'noreply@elingua.com',
        to: request.query.email,
        subject: 'eLingua Tutor Account',
        text: emailTemplate({link: request.query.link})
      };
      transport.sendMail(mailOptions, function (err) {
        if (err) {
          response.end('EMAIL_ERROR');
        } else {
          response.end('EMAIL_SENT');
        }
      })
    }
  }
});

app.use(router);

app.listen(port, function () {
  console.log('Express server started on port ' + port);
});
