console.log("eventss loaded");
// events routes for CPlanify
//This file contains all routes related to event management, IE 
//This contains the CRUD operations for functinality of the site

const express = require('express');
const router = express.Router();

const Event = require('../models/Event');
const { isLoggedIn } = require('../middleware/auth');  



// public page showing all events
router.get('/public', async (req, res) => 
{
  try 
  {
    const events = await Event.find();  // show all events

    res.render('events/public', 
    { 
      title: 'Public Events', //this one shows the public events hence no login required
      events
    });
  } 
  catch (err) 
  {
    console.log(err);
    res.send('Error loading events.');
  }
});


// calendar json data route
router.get('/data', async (req, res) => {
  try {
  
    const eventList = await Event.find({ user: req.user._id });

    const formatted = eventList.map(e => {

      const startISO = e.startTime
        ? `${e.date}T${e.startTime}`
        : `${e.date}T00:00`;

      const endISO = e.endTime
        ? `${e.date}T${e.endTime}`
        : `${e.date}T23:59`;

      return {
        id: e._id.toString(), 
        title: e.title,
        start: startISO,
        end: endISO,
        color: e.color
      };
    });

    res.json(formatted);

  } catch (err) {
    console.log(err);
    res.json([]);
  }
});

// this one is only for the logged in users 
router.get('/data/user', isLoggedIn, async (req, res) => {
  try {
    const eventList = await Event.find({ user: req.user._id });

    //date and time formatting for calendar
    const formatted = eventList.map(e => {
      const startISO = e.startTime
        ? `${e.date}T${e.startTime}`
        : `${e.date}T00:00`;

      const endISO = e.endTime
        ? `${e.date}T${e.endTime}`
        : `${e.date}T23:59`;

      return {
        id: e._id,   
        title: e.title,
        start: startISO,
        end: endISO,
        color: e.color
      };
    });

    res.json(formatted);
  } catch (err) {
    console.log(err);
    res.json([]);
  }
});




// user's events page,this one requires login
router.get('/', isLoggedIn, async (req, res) =>   
{
  try 
  {
    const events = await Event.find({ user: req.user._id });  
    res.render('events/index', 
    { 
      title: 'My Events', //title for user's plans
      events
    });
  } 
  catch (err) 
  {
    console.log(err);
    res.send('Unable to load your events');
  }
});


// add event page (must login)
router.get('/add', isLoggedIn, (req, res) =>     
{
  res.render('events/add', { title: 'Add Event' });
});


// add event POST
router.post('/add', isLoggedIn, async (req, res) =>   
{
  const { title, date, startTime, endTime, description, color } = req.body;

  try 
  {
    const newEvent = new Event({
      title,
      date,
      startTime,
      endTime,
      description,
      color, 
      user: req.user._id
    });

    await newEvent.save();

    req.flash('success_msg', 'Event added!');
    res.redirect('/events/calendar');
  } 
  catch (err) 
  {
    console.log(err);
    req.flash('error_msg', 'Could not save event');
    res.redirect('/events/add');
  }
});


// edit event page
router.get('/edit/:id', isLoggedIn, async (req, res) =>   
{
  try 
  {
    const event = await Event.findById(req.params.id);

    if (!event || event.user.toString() !== req.user.id) 
    {
      req.flash('error_msg', 'Not allowed.');
      return res.redirect('/events');
    }

    res.render('events/edit', 
    {
      title: 'Edit Event',
      event
    });
  } 
  catch (err) 
  {
    console.log(err);
    res.redirect('/events');
  }
});


// edit event POST
router.post('/edit/:id', isLoggedIn, async (req, res) =>   
{
  const { title, date, startTime, endTime, description, color } = req.body;

  try 
  {
    await Event.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, 
      { title, date, startTime, endTime, description, color }
    );

    req.flash('success_msg', 'Event updated!');
    res.redirect('/events/calendar');
  } 
  catch (err) 
  {
    console.log(err);
    req.flash('error_msg', 'Update failed');
    res.redirect('/events');
  }
});


// delete event route
router.post('/delete/:id', isLoggedIn, async (req, res) =>   // <-- FIXED HERE
{
  try 
  {
    await Event.deleteOne({ _id: req.params.id, user: req.user.id });

    req.flash('success_msg', 'Event deleted');
    res.redirect('/events/calendar');
  } 
  catch (err) 
  {
    console.log(err);
    req.flash('error_msg', 'Error deleting event');
    res.redirect('/events');
  }
});

// user calendar page
router.get('/calendar', isLoggedIn, async (req, res) => {
  res.render('events/calendar', {
    title: `${req.user.displayName}'s Plans`
  });
});


module.exports = router;
