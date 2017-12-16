'use strict';
import bcrypt from 'bcrypt';
import logger from '../../logging/logger';
const saltRounds = 2;

module.exports = (app, db) => {

    // GET all users
    app.get('/users', (req, res) => {
        db.users.findAll()
            .then(users => {
                res.json(users);
            })
            .catch(err => {
                logger(2, err);
                throw err;
            });
    });

    // GET one user by id
    app.get('/user/:id', (req, res) => {
        const id = req.params.id;
        db.users.find({
            where: { id: id }
        })
            .then(user => {
                res.json(user);
            });
    });

    // POST single user
    app.post('/user', (req, res) => {
        const id = req.body.id;
        const name = req.body.name;
        const textpassword = req.body.password;
        const role = req.body.role;
        bcrypt.hash(textpassword, saltRounds)
            .then(password => {
		logger(2, "Hash created: " + password);
                db.users.create({ name, password, role })
                    .then(newuser => {
                        res.json(newuser);
                    });
            });
    });

    // PATCH single user
    app.patch('/user/:id', (req, res) => {
        const id = req.params.id;
        const updates = req.body.updates;
        db.users.find({
            where: { id: id }
        })
            .then(user => {
                return user.updateAttributes(updates)
            })
            .then(updateduser => {
                res.json(updateduser);
            });
    });

    // DELETE single user
    app.delete('/user/:id', (req, res) => {
        const id = req.params.id;
        db.users.destroy({
            where: { id: id }
        })
            .then(deleteduser => {
                res.json(deleteduser);
            });
    });
};
