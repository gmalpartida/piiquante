const express = require("express");
const router = express.Router();
const Sauce = require("../models/Sauce");
const jwt = require("jsonwebtoken");
const { hasSubscribers } = require("diagnostics_channel");

router.get("/sauces", async (req, res) => {
    try {
        const sauces = await Sauce.find();
        console.log(sauces);
        res.status(201).json(sauces);
    } 
    catch (error) {
        res.status(500).json({ error: "sauces failed" });
    }
});
module.exports = router ;