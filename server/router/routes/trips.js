'use strict';
import logger from '../../logging/logger';

module.exports = (router, db) => {

    // GET all trips
    router.get('/trips', (req, res) => {
        db.trips.findAll()
            .then(trips => {
                res.status(200).json(trips);
            });
    });

    // GET one trip by id
    router.get('/trip/:id', (req, res) => {
        const id = req.params.id;
        db.trips.find({
            where: { id: id }
        })
            .then(trip => {
                res.status(200).json(trip);
            });
    });

    // POST single trip
    router.post('/trip', (req, res) => {
        const id = req.body.id;
        const destination = req.body.destination;
        const startdate = req.body.startdate;
        const enddate = req.body.enddate;
        const user_id = req.body.user_id;
        db.trips.create({
            id, destination, startdate, enddate, user_id
        })
            .then(newtrip => {
                res.status(200).json(newtrip);
            })
            .catch(err => {
                logger(0, err);
                res.status(500).json({ message: 'Unsuccessful, Please try again.' });
            });
    });

    // PATCH single trip
    router.patch('/trip/:id', (req, res) => {
        const id = req.params.id;
        const updates = req.body.updates;
        db.trips.find({
            where: { id: id }
        })
            .then(trip => {
                return trip.updateAttributes(updates)
            })
            .then(updatedtrip => {
                res.status(200).json(updatedtrip);
            });
    });

    // DELETE single trip
    router.delete('/trip/:id', (req, res) => {
        const id = req.params.id;
        db.trips.destroy({
            where: { id: id }
        })
            .then(deletedtrip => {
                res.status(200).json(deletedtrip);
            });
    });
};
