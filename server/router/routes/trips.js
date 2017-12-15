'use strict';

module.exports = (app, db) => {

    // GET all trips
    app.get('/trips', (req, res) => {
        db.trips.findAll()
            .then(trips => {
                res.json(trips);
            });
    });

    // GET one trip by id
    app.get('/trip/:id', (req, res) => {
        const id = req.params.id;
        db.trips.find({
            where: { id: id }
        })
            .then(trip => {
                res.json(trip);
            });
    });

    // POST single trip
    app.post('/trip', (req, res) => {
        const id = req.body.id;
        const destination = req.body.destination;
        const startdate = req.body.startdate;
        const enddate = req.body.enddate;
        const user_id = req.body.user_id;
        db.trips.create({
            id, destination, startdate, enddate, user_id
        })
            .then(newtrip => {
                res.json(newtrip);
            })
    });

    // PATCH single trip
    app.patch('/trip/:id', (req, res) => {
        const id = req.params.id;
        const updates = req.body.updates;
        db.trips.find({
            where: { id: id }
        })
            .then(trip => {
                return trip.updateAttributes(updates)
            })
            .then(updatedtrip => {
                res.json(updatedtrip);
            });
    });

    // DELETE single trip
    app.delete('/trip/:id', (req, res) => {
        const id = req.params.id;
        db.trips.destroy({
            where: { id: id }
        })
            .then(deletedtrip => {
                res.json(deletedtrip);
            });
    });
};
