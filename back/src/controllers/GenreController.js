const responseHandler = require("../handlers/response.handler.js");
const  MovieDB= require("node-themoviedb");

const options = {
    secure: true, // use https
    defaultLang: "en" // default language for all requests
};
const mdb = new MovieDB(process.env.TMDB_KEY, options);

class GenreController {
    async getGenres(req, res){
        try {
            const genres = await mdb.genre.getMovieList();
            return responseHandler.ok(res, genres);
        } catch (err) {
            return responseHandler.error(res);
        }
    }
}
module.exports = new GenreController;