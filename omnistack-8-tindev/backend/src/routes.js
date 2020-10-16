const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

const routes = express.Router();

// Test
routes.get('/test', (req, res) => {
  return res.json({message: 'Hello World'})
});

// Devs
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

// Likes and Dislikes
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

module.exports = routes;