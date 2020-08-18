const router = require('express').Router();
let Exercise = require("../models/exercise.model");

router.route('/').get((req, res) => {
    Exercise.find()
        .then(excercises => res.json(excercises))
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

router.route('/:id').get((req, res) => {
    console.log(req.params.id);
    Exercise.findById(req.params.id)
        .then(excercise => res.json(excercise))
        .catch(error => res.status(400).json('Error:' + error));

});

router.route("/:id").delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json("Excercise deleted !"))
        .catch(error => res.status(400).json('Error:' + error));
});

router.route("/update/:id").post((req, res) => {
    Exercise.findById(req.params.id)
        .then(excercise => {
            excercise.username = req.body.username;
            excercise.description = req.body.description;
            excercise.duration = Number(req.body.duration);
            excercise.date = Date.parse(req.body.date);

            excercise.save()
                .then(() => res.json("Succesfully updated excercise !"))
                .catch(error => res.status(400).json('Error:' + error));

        })
        .catch(error => res.status(400).json('Error:' + error));
});
module.exports = router;