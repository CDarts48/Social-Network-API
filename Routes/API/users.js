const express = require("express");
const router = express.Router();
const { User } = require("../../Models/User");
const { Thought } = require("../../Models/Thought");

// GET all users
router.get("/users", async (req, res) => {
  const users = await User.find().populate("thoughts friends");
  res.json(users);
});

// GET a single user by its _id and populated thought and friend data
router.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate("thoughts friends");
  res.json(user);
});

// POST a new user
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// PUT to update a user by its _id
router.put("/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(user);
});

// DELETE to remove user by its _id
router.delete("/users/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  // BONUS: Remove a user's associated thoughts when deleted
  await Thought.deleteMany({ username: user.username });

  res.json({ message: "User deleted" });
});

module.exports = router;
