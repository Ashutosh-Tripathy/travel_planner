'use strict';
import logger from '../../logging/logger';


module.exports = (app, db) => {

    // GET all users
    app.get('/users', (req, res) => {
        db.users.findAll()
            .then(users => {
                res.json(users);
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
        logger(4, req);
        const id = req.body.id;
        const name = req.body.name;
        const role = req.body.role;
        db.users.create({
            name: name,
            role: role
        })
            .then(newuser => {
                res.json(newuser);
            })
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
