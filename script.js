const authController = require('./controllers/authController');
const blogController = require('./controllers/blogController');
const adminController = require('./controllers/adminController');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require("path");
const session = require('express-session');
const hbs = require('hbs');
const dotenv = require("dotenv");
hbs.registerHelper('eq', function (a, b) {
    return a.toString() === b.toString(); // Convert ObjectId to string for comparison
});
dotenv.config();



app.use(session({
    secret: 'keyboard cat',
}));
app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'hbs');

// Routes
app.use("/", authController);
app.use("/", blogController);
app.use("/", adminController);



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3334, () => {
      console.log(`Server started on port 3334`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
