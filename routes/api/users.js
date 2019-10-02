const router = require("express").Router();
const bcrypt = require("bcrypt");
// require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User, Book } = require("../../models/");
const auth = require("../../middleware/auth");

// signup user
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  // basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields." });
  }

  // check for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      name,
      email,
      password
    });

    // create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            process.env.jwtSecret,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: { id: user._id, name: user.name, email: user.email }
              });
            }
          );
        });
      });
    });
  });
});

// add book to user
router.post("/:userId", (req, res) => {
  const newBook = req.body;
  Book.create(newBook)
    .then(data => {
      const user = req.params.userId;
      User.findByIdAndUpdate(
        user,
        { $push: { saved_books: data._id } },
        { upsert: true, new: true }
      )
        .then(updatedUser => {
          res.json(updatedUser);
        })
        .catch(err => {
          res.json(err);
        });
    })
    .catch(err => res.json(err));
});

// get books from user
router.get("/:userId/books", (req, res) => {
  User.findById(req.params.userId)
    .populate("saved_books")
    .exec((err, user) => {
      if (err) res.json(err);
      res.json({
        books: user.saved_books
      });
    });
});

// delete book from user
router.delete("/:userId", (req, res) => {
  const user = req.params.userId;
  User.findByIdAndUpdate(
    user,
    { $pull: { saved_books: req.body.bookId } },
    { upsert: true, new: true }
  )
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
