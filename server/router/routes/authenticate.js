'use strict';
import logger from '../../logging/logger';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const saltRounds = 2;


//bcrypt.hash(myPlaintextPassword, saltRounds).then(function (hash) {
  // Store hash in your password DB.
//});


//bcrypt.compare(myPlaintextPassword, hash).then(function (res) {
  // res == true
//})



module.exports = (app, db) => {
  // Post authenticate
  app.post('/authenticate', (req, res) => {
    db.users.findOne({where: {id: req.body.id} })
      .then(user => {
        if (!user) {
          res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

          // check if password matches
	  logger(2, "pass: " + user.password + " body: " + req.body.password);
          if (user.password != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {
		
            // if user is found and password is right
            // create a token with only our given payload
            // we don't want to pass in the entire user since that has the password
            const payload = {
                name: user.name
            };

            var token = jwt.sign(payload, app.get('superSecret'), {
              expiresIn: 30 * 24 * 60 * 60 // expires in 24 hours
            });

            // return the information including token as JSON
            res.json({
              success: true,
              token: token
            });
          };
        }
      });
  });
};



