const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../models/Users");
const Gratitude = require("../models/Gratitude");

// @route GET api/gratitude
// @desc Get all gratitude posts
//@access Private

router.get("/", auth, async (req, res) => {
  try {
    const gratitude = await Gratitude.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(gratitude);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/gratitude
// @desc Add new gratitude post
//@access Private

router.post(
  "/",
  [
    auth,
    [
      check("item", "Write something to be grateful for!")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { item, category, date } = req.body;

    try {
      const newGratitude = new Gratitude({
        item,
        category,
        date,
        user: req.user.id
      });

      const gratitude = await newGratitude.save();

      res.json(gratitude);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route PUT api/gratitude/:id
// @desc Update gratitude post
//@access Private

router.put("/:id", auth, async (req, res) => {
  const { item, category } = req.body;

  const gratitudeFields = {};

  if (item) gratitudeFields.item = item;
  if (category) gratitudeFields.category = category;

  try {
    let gratitude = await Gratitude.findById(req.params.id);

    if (!gratitude)
      return res.status(404).json({ msg: "Gratitude Not Found" });

    if (gratitude.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    gratitude = await Gratitude.findByIdAndUpdate(
      req.params.id,
      { $set: gratitudeFields },
      { new: true }
    );

    res.json(gratitude);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/gratitude/:id
// @desc Delete a gratitude post
//@access Private

router.delete("/:id", auth, async (req, res) => {
  try {
    let gratitude = await Gratitude.findById(req.params.id);

    if (!gratitude)
      return res.status(404).json({ msg: "Gratitude Not Found" });

    if (gratitude.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    await Gratitude.findByIdAndRemove(req.params.id);

    res.json({ msg: "Item Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
