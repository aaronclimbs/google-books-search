const router = require("express").Router();
const bookRoutes = require("./books");
const userRoutes = require("./users");
const authRoutes = require("./auth");

// Book routes
router.use("/books", bookRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;
