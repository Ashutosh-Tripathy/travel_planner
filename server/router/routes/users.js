'use strict';
import bcrypt from 'bcrypt';
import logger from '../../logging/logger';
const saltRounds = 2;

module.exports = (router, db) => {

    // GET all users
    router.get('/users', (req, res) => {
        db.users.findAll()
            .then(users => {
		users.map(user => user.password = '');
                res.status(200).json(users);
            })
            .catch(err => {
                logger(0, err);
                res.status(500).json({ message: 'Unsuccessful, Please try again.' });
            });
    });

    // GET one user by id
    router.get('/user/:id', (req, res) => {
        const id = req.params.id;
        db.users.find({
            where: { id: id }
            //attributes: { exclude: ['password'] }
        })
            .then(user => {
		if(user) user.password = '';
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
                db.users.create({ name, password, role })
                    .then(newuser => {
			newuser.password = '';
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
