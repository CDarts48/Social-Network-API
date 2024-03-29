const express = require("express");
const router = express.Router();
const User = require("../../Models/User");
const Thought = require("../../Models/Thought");

// GET all users
router.get("/", async (req, res) => {
  const users = await User.find().populate("thoughts friends");
  res.json(users);
});

// GET a single user by its _id and populated thought and friend data
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate("thoughts friends");
  res.json(user);
});

// POST a new user
router.post("/", async (req, res) => {
  const user = new User(req.body);
  await user
    .save()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json(err));
});

// PUT to update a user by its _id
router.put("/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(user);
});

// PUT to add a thought to a user's thoughts array
router.put("/:userId/thoughts/:thoughtId", async (req, res) => {
  const thought = await Thought.findById(req.params.thoughtId);
  if (!thought) {
    return res.status(404).json({ message: "No thought found with this id!" });
  }

  const user = await User.findByIdAndUpdate(
    req.params.userId,
    { $push: { thoughts: req.params.thoughtId } },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ message: "No user found with this id!" });
  }

  res.json(user);
});

// POST /:userId/friends/:friendId
router.post("/:userId/friends/:friendId", async (req, res) => {
  console.log("userId:", req.params.userId);
  console.log("friendId:", req.params.friendId);

  try {
    // Find the friend by _id
    const friend = await User.findById(req.params.friendId);
    console.log("friend:", friend);
    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }

    // Add the friend's ID to the existing user's friends array
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $push: { friends: friend._id } },
      { new: true }
    );
    console.log("user:", user);

    res.json(user);
  } catch (err) {
    console.log("error:", err);
    res.status(500).json(err);
  }
});

// Remove a friend
router.delete("/:userId/friends/:friendId", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to remove user by its _id
router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "No user found with this id!" });
  }

  // BONUS: Remove a user's associated thoughts when deleted
  await Thought.deleteMany({ username: user.username });

  res.json({ message: "User deleted" });
});

module.exports = router;
