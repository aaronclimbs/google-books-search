const router = require("express").Router();
const booksController = require("../../controllers/booksController");
const auth = require("../../middleware/auth");

// Matches with "/api/books"
router
  .route("/")
  .get(booksController.findAll)
  .post(auth, booksController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(auth, booksController.remove);

module.exports = router;
