const User = require("../Models/User");

const userController = {
  // Create a new user
  create: async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  // Get all users
  getAll: async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // Get a user by id
  getById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // Update a user by id
  update: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  // Delete a user by id
  delete: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // Add a friend to a user's friends array
  addFriend: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $push: { friends: req.params.friendId } },
        { new: true, runValidators: true }
      ).populate("friends");

      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // Remove a friend from a user's friends array
  removeFriend: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = userController;
