const router = require("express").Router();
const bookRoutes = require("./books");
const userRoutes = require("./users");
const authRoutes = require("./auth");
const searchRoutes = require("./search");

// Book routes
router.use("/books", bookRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/search", searchRoutes);

module.exports = router;
