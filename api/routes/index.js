const express = require('express');
const people = require('./peopleRoutes');
const levels = require('./levelsRoutes');
const classes = require('./classesRoutes');

module.exports = (app) => {
  app.use(express.json(), people, levels, classes);
};
