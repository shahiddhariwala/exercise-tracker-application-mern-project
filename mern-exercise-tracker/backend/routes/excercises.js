const router = require('express').Router();
let Exercise = require("../models/user.model");

router.route('/').get((req, res) => {
    Exercise.find()
        .then(users => res.json(excercises))
        .catch(error => res.status(400).json('Error:' + error));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExcercise = new Exercise(
        {
            username,
            description,
            duration,
            date,
        }
    );
    newExcercise.save()
        .then(() => res.json('Excercise added!'))
        .catch(error => res.status(400).json('Error:' + error));
});

module.exports = router;