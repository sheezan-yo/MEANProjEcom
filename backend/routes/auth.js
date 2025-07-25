const express = require("express");
const { registerUser, loginUser } = require("../handlers/auth-handler");
const router = express.Router();

router.post("/register", async (req, res) => {
    let model = req.body;
    if (model.name && model.email && model.password) {
        // register
        await registerUser(model);
        res.send({
            message: "user registered",
        });
    } else {
        res.status(400).json({
            error: "Please provide name, email and password",
        });
    }
});

router.post("/login", async (req, res) => {
    let model = req.body;
    if (model.email && model.password) {
        // login
        const result = await loginUser(model);
        if (result) {
            res.send(result);
        } else {
            res.status(400).json({
                error: "Email or password is incorrect",
            });
        }
    } else {
        res.status(400).json({
            error: "Please provide email and password",
        });
    }
});

module.exports = router;