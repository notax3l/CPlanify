CPlanify – Event Planning Web App

By: Tanishq Pratap Singh (200597638)
Course Project – Georgian College (COMP 2084)

:Overview

CPlanify is a simple event-planning and calendar management web application built using Node.js, Express, MongoDB, Handlebars, Passport.js, and FullCalendar.

File Hirarchy:
CPlanify/
│
├── app.js
├── package.json
├── .env.example
├── README.md
│
├── config/
│   ├── db.js
│   └── passport.js
│
├── middleware/
│   └── auth.js
│
├── models/
│   ├── User.js
│   └── Event.js
│
├── routes/
│   ├── index.js
│   ├── auth.js
│   └── events.js
│
├── public/
│   ├── stylesheets/
│   │   └── style.css
│   ├── images/
│   └── scripts/ (optional – currently empty)
│
├── views/
│   ├── layout.hbs
│   │
│   ├── auth/
│   │   ├── login.hbs
│   │   └── register.hbs
│   │
│   ├── events/
│   │   ├── index.hbs
│   │   ├── add.hbs
│   │   ├── edit.hbs
│   │   ├── public.hbs
│   │   └── calendar.hbs
│   │
│   └── index.hbs
│
└── bin/
    └── www


Users can:

Create an account and log in

Add, edit, and delete personal events

View all their events visually on a full monthly calendar

Choose colors, times, and descriptions for each event

View a separate Public Events page

Access everything through a clean, user-friendly UI

The application is fully deployed and accessible online.

🌐 Live Deployment

🔗 Hosted on Render:
https://cplanify.onrender.com

🛠️ Technologies Used

Node.js + Express.js

MongoDB + Mongoose

Handlebars (HBS) template engine

Passport-local authentication

Sessions + Flash Messages

FullCalendar.js for visual event display

HTML, CSS, JavaScript

⭐ Independent Learning Feature: Keyword Search on Public Events Page

As part of the assignment requirement to implement an additional feature beyond class material, I added a the calender.js to it.

✅ What It Does

Gives users a visual represntation of their tasks in the form of a calender 

🗂️ Files Updated

views/events/public.hbs

A small client-side JS script inside the same file

This feature improves usability and makes the app feel more dynamic and modern.

File Hirarchy :


NOTE TO PROFESSOR:
UPON ALMOST COMPLETING THE ASSIGNMENT AND MAKING THE FINAL COMMITS , I REALIZED THAT ALL THIS CONTENT IS SUPPOSED TO BE IN THE ASSIGNMENT 2 FOLDER IN THE COURSE GITHUB REPOSITORY
APOLOGIES FOR THAT
I WILL BE ADDING THE CONTENTS DIRECTLY TO THAT REPO ASWELL , HERE IS THE LINK : https://github.com/notax3l/COMP2068JSFrameworks
FOR NOW , I WILL BE SUBMITTING THIS REPO ALONG WITH THE DEPLOYMENT LINK
