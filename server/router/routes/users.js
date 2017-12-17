'use strict';
import bcrypt from 'bcrypt';
import logger from '../../logging/logger';
const saltRounds = 2;

module.exports = (router, db) => {

    // GET all users
    router.get('/users', (req, res) => {
        db.users.findAll()
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => {
                logger(2, err);
                throw err;
            });
    });

    // GET one user by id
    router.get('/user/:id', (req, res) => {
        const id = req.params.id;
        db.users.find({
            where: { id: id },
            attributes: { exclude: ['password'] }
        })
            .then(user => {
                res.status(200).json(user);
            });
    });

    // POST single user
    router.post('/user', (req, res) => {
        const id = req.body.id;
        const name = req.body.name;
        const textpassword = req.body.password;
        const role = req.body.role;
        bcrypt.hash(textpassword, saltRounds)
            .then(password => {
                logger(2, "Hash created: " + password);
                db.users.create({ name, password, role })
                    .then(newuser => {
                        res.status(200).json(newuser);
                    });
            });
    });

    // PATCH single user
    router.patch('/user/:id', (req, res) => {
        const id = req.params.id;
        const updates = req.body.updates;
        db.users.find({
            where: { id: id }
        })
            .then(user => {
                return user.updateAttributes(updates)
            })
            .then(updateduser => {
                res.status(200).json(updateduser);
            });
    });

    // DELETE single user
    router.delete('/user/:id', (req, res) => {
        const id = req.params.id;
        db.users.destroy({
            where: { id: id }
        })
            .then(deleteduser => {
                res.status(200).json(deleteduser);
            });
    });
};
