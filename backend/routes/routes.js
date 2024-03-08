const express = require('express');
const User = require('../models/user'); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); 



router.post("/signup", async (req, res) => {
  const { name, email, password} = req.body;

  // Check if user already exists
  let existingUser = await User.findOne({ email: email });
  if (existingUser) return res.status(400).send("User already exists.");

  try {
    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user in the database
    await user.save();

    // Generate a JWT token for the new user
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } 
    );

    // Respond with the user (excluding the password) and their token
    res.status(201).send({
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});


// Login route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Unable to login");
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).send("Unable to login");
    }

   const token = jwt.sign(
     { _id: user._id.toString() },
     process.env.JWT_SECRET,
     { expiresIn: "1h" }
   );
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});


// Get all Users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});


// Get a single User by id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
   res.status(200).send({ status: 'Success', message: 'User fetched successfully', data: user });

  } catch (error) {
    res.status(500).send(error);
  }
});


// Update a User by id
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a User by id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});




module.exports = router;