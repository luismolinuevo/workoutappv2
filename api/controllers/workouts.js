const router = require("express").Router();
const { user, workouts, exercise } = require("../models");
const passport = require("../middleware/passport-config");

router.get("/", passport.isAuthenticated(), async (req, res) => {
  const id = req.user.uuid;
  const listOfWorkouts = await workouts.findAll({
    where: { userId: id },
  });
  res.json(listOfWorkouts);
});

router.post("/", passport.isAuthenticated(), async (req, res) => {
    await workouts.create({ 
        title:req.body.title,
        textBody: req.body.textBody,
        userId: req.user.uuid
     })
      .then((newPost) => {
        res.status(201).json(newPost);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
});

//this is used to get workouts by id(useparms)
router.get("/:id", passport.isAuthenticated(), async (req, res) => {
    const id = req.params.id;
    const post = await workouts.findByPk(id);
    res.json(post)
  });

router.delete("/:id", passport.isAuthenticated(), async (req, res) => {
    const workoutId = req.params.id;
  
    await workouts.destroy({
      where: {
        id: workoutId,
      },
});
  
    res.json("DELETED SUCCESSFULLY");
});



module.exports = router;