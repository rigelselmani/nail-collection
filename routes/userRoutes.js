const express = require("express"),
    router = express.Router(),
    passport = require("passport");
User = require("../models/User");

//Register routes
router.get("/register", async(req, res) => {
    res.render("Register")
})
router.post("/register", async(req, res) => {
    const { username, password } = req.body;
    const user = new User({ username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
        if (err) return next(err);
        req.flash("success", "Welcome to yelp camp!");
        res.redirect("/");
    })



    return res.redirect("/");
})

//Login route
router.get("/login", async(req, res) => {
    res.render("Login")
})
router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), async(req, res) => {
    res.redirect("/")

})

router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Goodbye!")
    res.redirect("/")
})

module.exports = router;