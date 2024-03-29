global.mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const crypto = require('crypto');
const session = require('express-session');
const connectMongo = require('connect-mongo')(session);

app.use(express.json());

app.use(express.static(path.join(__dirname, './www')));

const atlasURL = 'mongodb+srv://clearBnB:grupp1java20@cluster-clearbnb.tl726.mongodb.net/ClearBnB?retryWrites=true&w=majority';

global.mongoose.connect(atlasURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const models = require('./models.js');
const secret = 'S0m3#p30p13_l1k35-c1l4n7r0,_50m3.d0N7';

app.use(session({
  secret: 'S0m3#p30p13_l1k35-c1l4n7r0,_50m3.d0N7', // choose your own...
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new connectMongo({mongooseConnection: mongoose.connection})
}));

// get for models
app.get("/rest/:model", async (req, res) => {
  let model = models[req.params.model]
  let doc = await model.find()
  res.json(doc)
})

//get specific model by id
app.get("/rest/:model/:id", async (req, res) => {
  let model = models[req.params.model]
  let doc = await model.findById(req.params.id).populate(['residenceId', 'userId', 'featuresId']).exec();
  res.json(doc);
})

// add a model
app.post("/rest/:model", async (req, res) => {
  let model = models[req.params.model]
  let doc = new model(req.body);
  await doc.save();
  res.json(doc);
})

// Add a user
app.post('/api/users', async (req, res) => {
  let model = models['users'];

  let valCheck = await model.findOne({ email: req.body.email });
  if (valCheck) {
    res.json({ success: false });
    return;
  }

  // Encrypt password
  const hash = crypto.createHmac('sha256', secret)
    .update(req.body.password).digest('hex');
  // Create new user
  let user = new model({...req.body, password: hash});
  // NOTE: This system is unsafe since you can 
  // choose your own role on registration!
  await user.save();
  res.json({success: true});
});

// delete a residence confirm password
app.post('/api/confirmDelete', async (req, res) => {

  const hash = crypto.createHmac('sha256', secret)
    .update(req.body.password).digest('hex');

  let model = models['users'];
  let user = await model.findOne({ email: req.body.email, password: hash });
  if(user){
    res.json({success: 'true'});
  }
  else {
    res.json({success: 'false'});
  }
})

// login
app.post('/api/login', async (req, res) => {
    // note: req.session is unique per user/browser
  if(req.session.user){
    res.json({error: 'Someone is already logged in'});
    return;
  }
   // Encrypt password
  const hash = crypto.createHmac('sha256', secret)
    .update(req.body.password).digest('hex');
  // Search for user
  let model = models['users'];
  let user = await model.findOne({ email: req.body.email, password: hash });
  if(user){
    // succesful login, save the user to the session object
    req.session.user = user;
    res.json({success: 'Logged in'});
  }
  else {
    res.json('');
  }
});
//logout
app.delete('/api/login', (req, res) => {
  if(req.session.user){
    delete req.session.user;
    res.json({success: 'Logged out'});
  }
  else {
    res.json({error: 'Was not logged in'});
  }
});
//get the user who is online
app.get('/api/login', (req, res) => {
  if(req.session.user){
    let user = {...req.session.user};
    delete user.password; // remove password in answer
    res.json(user);
  }
  else {
    res.json('');
  }
});
// delete a model with id
app.delete('/rest/:model/:id', async (req, res) => {
  let model = models[req.params.model];
  let doc = await model.findByIdAndDelete(req.params.id);
  res.json(doc);
});
// update a residence
app.put('/rest/residences/:id', async (req, res) => {
  let model = models['residences']

  let residence = await model.findById(req.params.id)

  if (req.body.bookedDays) {
    
    if (residence.bookedDays === null) {
      residence.bookedDays = [...req.body.bookedDays];
    }
    else {
      residence.bookedDays = [...residence.bookedDays, ...req.body.bookedDays];
    }
    delete req.body.bookedDays
  }

  if (req.body.views) {

    if (residence.views === null) {
      residence.views = req.body.views;
    }
    else {
      residence.views = residence.views +1;
    }
    delete req.body.views;
  }

  if (req.body.earned) {

    if (residence.earned === null) {
      residence.earned = req.body.earned;
    }
    else {
      residence.earned = residence.earned + req.body.earned;
    }
    delete req.body.earned;
  }

  if (req.body.amountOfBookings) {

    if (residence.amountOfBookings === null) {
      residence.amountOfBookings = req.body.amountOfBookings;
    }
    else {
      residence.amountOfBookings = residence.amountOfBookings + 1;
    }
    delete req.body.amountOfBookings;
  }

  Object.assign(residence, req.body)
  await residence.save()

  res.json(residence)
})


app.listen(3001, () => console.log("server started on port 3001"));