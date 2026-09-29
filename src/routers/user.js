const express = require("express");
const User = require("../models/user");
const router = express.Router();

////////////////////////////////////////////////////////////////////
//POST method to add new user
router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

////////////////////////////////////////////////////////////////////
//GET method retrieve all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

////////////////////////////////////////////////////////////////////
// GET method to retrieve a specific user using id
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send("Unable to find user");
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

////////////////////////////////////////////////////////////////////
//PATCH method to update a user using _id
router.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("No user is found");
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

////////////////////////////////////////////////////////////////////
// DELETE method using _id to delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send("Unable to find user");
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
