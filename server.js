
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan')
const connectDB = require("./config/db");
require('dotenv').config();

const app = express();

// Connect Database
connectDB();
app.use(logger('dev'));
app.use(express.json());

// Init middleware
app.use(express.json({ msg: "Welcome" }));

app.get("/", (req, res) => res.json({ msg: "Welcome" }));

app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/gratitude", require("./routes/gratitude"));
app.use("/api/affirmation", require("./routes/affirmation"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
