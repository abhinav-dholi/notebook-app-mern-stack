const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Create a user using: POST "/api/auth/createuser". Doesnt require auth
router.post('/createuser', [
    body('email','Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('name', 'Enter a valid name').isLength({ min: 5 })

], async (req, res) => {
    // if there are errors, return bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // check whether the user with the same email already exists
    try {
    let user = await User.findOne({ email: req.body.email});
    if (user){
        return res.status(400).json({error: "A user with the same email already exists"})
    }
    user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    })
    
   

    res.json(user)
}
catch(error)
{
    console.error(error.message);
    res.status(500).send("some error occured")
}
})

module.exports = router;