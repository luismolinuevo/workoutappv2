const router = require("express").Router();
const { user, workouts, exercise } = require("../models");
const passport = require("../middleware/passport-config");

router.get("/" , passport.isAuthenticated(), async (req, res) => {
  exercise.findAll({}).then((allExercises) => res.json(allExercises));
});

router.get("/exerciseId/:id", passport.isAuthenticated(), async (req, res) => {
  const id = req.params.id;
  const exercises = await exercise.findByPk(id);
  res.json(exercises)
});

//this is get all the exercises for a certain workout
router.get("/:workoutsId", passport.isAuthenticated(), async (req, res) => {
    const workoutsId = req.params.workoutsId;  //id of workouts
    const exercises = await exercise.findAll({ where: { workoutId: workoutsId } });
    res.json(exercises);
});

//this will create a exercise
router.post("/", passport.isAuthenticated(), async (req, res) => {
    // const exercises = req.body;
    await exercise.create({
        name: req.body.name,
        reps: req.body.reps,
        sets: req.body.sets,
        weight: req.body.weight,
        restPeriod: req.body.restPeriod,
        pr: req.body.pr,
        videoUrl: req.body.videoUrl,
        desc: req.body.desc,
        workoutId: req.body.workoutId

    })
    .then((newPost) => {
        res.status(201).json(newPost);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

router.put("/edit/:id", passport.isAuthenticated(), async (req, res) => {
  let values = {id: req.body.id, name: req.body.name, reps: req.body.reps, sets: 
    req.body.sets, weight: req.body.weight,restPeriod: req.body.restPeriod,pr: req.body.pr,videoUrl: req.body.videoUrl,desc: req.body.desc,workoutId: req.body.workoutId}
  let condition = {where: {id: req.body.id}}
  exercise.update(values, condition);

  });
 
  
//this will delete a exercise
router.delete("/:exerciseId", passport.isAuthenticated(), async (req, res) => {
    const exerciseId = req.params.exerciseId;
  
    await exercise.destroy({
      where: {
        id: exerciseId,
      },
    });
  
    res.json("DELETED SUCCESSFULLY");
});





module.exports = router;