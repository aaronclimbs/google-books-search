const router = require("express").Router();
require("dotenv").config;
const auth = require("../../middleware/auth");
const axios = require("axios").default;

router.get("/:term", (req, res) => {
  const term = req.params.term;
  console.log(term);
  const query = `https://www.googleapis.com/books/v1/volumes?q=${term}`;
  axios
    .get(query)
    .then(response => {
      const books = response.data.items;
      res.json(books);
    })
    .catch(err => {
      console.log(err);
      res.json({ msg: "Error: Please check your search term." });
    });
});

module.exports = router;
