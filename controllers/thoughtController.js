const Thought = require("../Models/Thought");

const thoughtController = {
  // Create a new thought
  create: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      res.status(201).json(thought);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all thoughts
  getAll: async (req, res) => {
    try {
      const thoughts = await Thought.find({});
      res.status(200).json(thoughts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a thought by id
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const thought = await Thought.findById(id);
      if (!thought) {
        res.status(404).json({ message: "Thought not found" });
      } else {
        res.status(200).json(thought);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a thought
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const thought = await Thought.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!thought) {
        res.status(404).json({ message: "Thought not found" });
      } else {
        res.status(200).json(thought);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a thought
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Thought.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ message: "Thought not found" });
      } else {
        res.status(204).json({ message: "Thought deleted" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = thoughtController;
