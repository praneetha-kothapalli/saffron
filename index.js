const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Spot = require('./models/Spot');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/saffronRoads', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


// Routes
app.get('/', async (req, res) => {
  const spots = await Spot.find();
  res.render('index');
});

app.get('/form', (req, res) => {
  res.render('form');
});

app.post('/submit-spot', async (req, res) => {
  const { name, state, location, description } = req.body;
  const newSpot = new Spot({ name, state, location, description });
  await newSpot.save();
  res.redirect('/');
});

app.post('/delete/:id', async (req, res) => {
  await Spot.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

app.get('/state/:stateName', async (req, res) => {
  const stateName = req.params.stateName;
  const spots = await Spot.find({ state: stateName });
  res.render('state-view', { stateName, spots });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
