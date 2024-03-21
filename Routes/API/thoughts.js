const express = require("express");
const router = express.Router();
const { Thought, User } = require("../../Models");

// GET all thoughts
router.get("/", (req, res) => {
  Thought.find({})
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET a single thought by id
router.get("/:id", (req, res) => {
  Thought.findById(req.params.id)
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST a new thought
router.post("/", (req, res) => {
  Thought.create(req.body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );
    })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => res.json(err));
});

// PUT to update a thought by id
router.put("/:id", (req, res) => {
  Thought.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE to remove a thought by id
router.delete("/:id", (req, res) => {
  Thought.findByIdAndDelete(req.params.id)
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// POST a new reaction to a thought
router.post("/:thoughtId/reactions", (req, res) => {
  Thought.findByIdAndUpdate(
    req.params.thoughtId,
    { $push: { reactions: req.body } },
    { new: true, runValidators: true }
  )
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch((err) => res.json(err));
});

// DELETE a reaction from a thought
router.delete("/:thoughtId/reactions/:reactionId", (req, res) => {
  Thought.findByIdAndUpdate(
    req.params.thoughtId,
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    { new: true }
  )
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => res.json(err));
});

module.exports = router;
