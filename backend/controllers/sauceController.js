const express = require("express");
const router = express.Router();
const Sauce = require("../models/Sauce");
const jwt = require("jsonwebtoken");
const multer = require('multer');

const { hasSubscribers } = require("diagnostics_channel");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Specify the upload directory
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Customize filename
    },
  });
  
const upload = multer({ storage });

router.get("/sauces", async (req, res) => {
    try {
        const sauces = await Sauce.find();
        console.log('all sauces' + sauces);
        res.status(201).json(sauces);
    } 
    catch (error) {
        res.status(500).json({ error: "sauces failed" });
    }
});

router.get("/sauces/:id", async(req, res) =>{
    try {
        console.log(req.params);
        const sauces = await Sauce.find('_id=' + req.params.id);
        console.log(sauces);
        res.status(201).json(sauces);
    } 
    catch (error) {
        res.status(500).json({ error: "sauces failed" });
    }
});

router.post("/sauces", upload.single('image'), async(req, res) =>{
    try {
        img = req.file;
        console.log(img.filename);
        console.log(req.body.sauce);
        const {name, manufacturer, description, mainPepper, heat} = req.body;
        const sauce = new Sauce({userId:'', 
                                name, 
                                manufacturer,
                                description,
                                mainPepper,
                                imageUrl: '/uploads/' + img.filename,
                                heat,
                                likes:0, dislikes0,
                                usersLiked:[], usersDisliked:[]});
        console.log(sauce.imageUrl);
        await sauce.save();
        res.status(201).json({message: 'sauce added successfully'});
    } 
    catch (error) {
        res.status(500).json({ error: "sauces failed" });
    }


});

module.exports = router ;