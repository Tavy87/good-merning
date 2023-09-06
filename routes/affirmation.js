const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../models/Users");
const Affirmation = require("../models/Affirmation");

// router.get("/", auth, async (req, res) => {
//   try {
//     const affirmation = await Affirmation.findOne({ user: req.user.id });
//     // .sort({
//     //   date: -1
//     // });
//     res.json(affirmation);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// @route GET api/affirmation
// @desc Get all affirmations
//@access Private

router.get("/", auth, async (req, res) => {
  try {
    var n = 1;
    const affirmation = await Affirmation.find(
      { user: req.user.id },
      { affirm: 1, _id: 0 }
    );
    res.json(affirmation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/affirmation
// @desc Add new affirmation post
//@access Private

router.post(
  "/",
  [
    auth,
    [
      check("affirm", "Say something nice to yourself!")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { affirm, date } = req.body;

    try {
      const newAffirmation = new Affirmation({
        affirm,
        date,
        user: req.user.id
      });

      const affirmation = await newAffirmation.save();

      res.json(affirmation);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route PUT api/affirmation/:id
// @desc Update affirmation post
//@access Private

router.put("/:id", auth, async (req, res) => {
  const { affirm } = req.body;

  const affirmationFields = {};

  if (affirm) affirmationFields.affirm = affirm;

  try {
    let affirmation = await Affirmation.findById(req.params.id);

    if (!affirmation)
      return res.status(404).json({ msg: "Affirmation not found" });

    if (affirmation.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    affirmation = await Affirmation.findByIdAndUpdate(
      req.params.id,
      { $set: affirmationFields },
      { new: true }
    );

    res.json(affirmation);
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
    let affirmation = await Affirmation.findById(req.params.id);

    if (!affirmation)
      return res.status(404).json({ msg: "Affirmation Not Found" });

    if (affirmation.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    await Affirmation.findByIdAndRemove(req.params.id);

    res.json({ msg: "Affirmation Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
