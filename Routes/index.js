const express = require("express");
const router = express.Router();

const thoughtsRoutes = require("./API/thoughts");
const usersRoutes = require("./API/users");

router.use("/thoughts", thoughtsRoutes);
router.use("/users", usersRoutes);

router.use((req, res) => res.send("Wrong route!"));

module.exports = router;
