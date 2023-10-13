const express = require("express");
const ExpressError = require("./expressError");
const items = require("./fakeDB");
const router = new express.Router();

router.get("/", (req, res) => {
  res.json({ items });
});
router.post("/", (req, res, next) => {
  try {
    if (!req.body.name) throw new ExpressError("Missing name parameter", 400);
    const item = { name: req.body.name, price: req.body.price };
    items.push(item);
    res.status(201).json({ added: item });
  } catch (err) {
    return next(err);
  }
});
router.get("/:name", (req, res) => {
  const foundItem = items.find((item) => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  res.json({ added: foundItem });
});

router.patch("/:name", (req, res) => {
  const foundItem = items.find((item) => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  foundItem.name = req.body.name;
  foundItem.price = req.body.price;
  res.json({ added: foundItem });
});
router.delete("/:name", (req, res) => {
  const foundItem = items.find((item) => item.name === req.params.name);
  if (foundItem === undefined || foundItem === -1) {
    throw new ExpressError("Item not found", 404);
  }
  items.splice(foundItem, 1);
  res.json({ message: "Deleted" });
});

module.exports = router;
