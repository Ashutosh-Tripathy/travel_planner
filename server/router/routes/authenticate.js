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
    db.users.findOne({ where: { id: req.body.id } })
      .then(user => {
        if (!user) {
          res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

          bcrypt.compare(req.body.password, user.password)
            .then(response => {
              if (!response) {
                res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
              }
              else {
                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                  id: user.id,
                  role: user.role
                };

                var token = jwt.sign(payload, app.get('superSecret'), {
                  expiresIn: 30 * 24 * 60 * 60 // expires in 24 hours
                });

                // return the information including token as JSON
                res.status(200).json({
                  success: true,
                  token: token
                });
              }
            });
        }
      });
  });
};


