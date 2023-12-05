const express = require('express');
const router = express.Router();

const { main, searchMovies, favoriteMovie, getFavorites } = require('../contollers/moviController');

router.get('/', main);
router.post('/search', searchMovies);
router.post('/favouriteMovie', favoriteMovie);
router.get('/favouriteMovie', getFavorites);

module.exports = router;