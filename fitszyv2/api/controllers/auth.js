const router = require("express").Router();
const { user } = require("../models");
const passport = require("../middleware/passport-config");

router.post("/signup", (req, res) => {    //  /api/auth/signup would be how you access this
    console.log("POST body: ", req.body);
    user.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      weight: req.body.weight,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => {
        user.password = undefined;
        req.login(user, () => res.status(201).json(user));
      })
      .catch((err) => {
        res.status(400).json({ msg: "Failed Signup", err });
      });
  });

  router.post("/login", passport.authenticate("local"), (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    // console.log(req.user)

    res.json(req.user);
  });
  
  router.get("/login", (req, res) => {
    if (req.user) {   //putting this fixed it
      res.json(req.user);
    } else {
      res.sendStatus(401);
    }

    // if(req.session.user && req.session.user.email)
  });
  
  router.post("/logout", async (req, res) => {    //logout user.    The logout() is a passport js method
    // req.logout((err) => {
    //   if (err) return next(err);
    //   res.status(200).json({ message: "Logout successful" });
    //   req.sessionStore.destroy()
    // });
    try {
      await req.session.destroy()
      return res.sendStatus(200)
  } catch (e) {
      console.error(e)
      return res.sendStatus(500)
  }
  });


module.exports = router;