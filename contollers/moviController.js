require('dotenv').config();
const db = require('../config/mysql');
const axios = require('axios');

//MySQL querys for get and add data
const queries = {
    getfavorite: 'SELECT * FROM favorites',
    addfavorite: 'INSERT INTO favorites (title, year, type, poster) VALUES (?, ?, ?, ?)',
}

//Render Index.ejs
const main = (req, res) => {
    const movies = [];
    res.render('index', { movies }); //Render index.ejs and send empty movies array
};

//Fetching Data from Api
const searchMovies = async (req, res) => {
    const searchValue = req.body.searchValue; // get searchValue using req.body
    const apiUrl = `http://www.omdbapi.com/?apikey=${process.env.APIKEY}&s=${searchValue}`;

    try {
        const response = await axios.get(apiUrl); // data fetch useing axios
        const movies = response.data.Search || []; // Get data and store in movies

        res.render('index', { movies });//Render index.ejs and send movies array
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).send('Error fetching movies');
    }
};

//Add favorite Movie in DB
const favoriteMovie = (req, res) => {
    const { title, year, type, poster } = req.body; // Get all value using req.body
    db.query(queries.addfavorite, [title, year, type, poster], (err, result) => {
        if (err) throw err;
        res.redirect('/');//when data add in DB so redirect on  index.ejs
    });
};

//Get Favorites list from DB
const getFavorites = (req, res) => {
    db.query(getFavorites, (err, results) => {
        if (err) throw err;
        res.render('favorites', { favorites: results });//Render favorites.ejs for show favorites movie list
    });
};

module.exports = { main, searchMovies, favoriteMovie, getFavorites };