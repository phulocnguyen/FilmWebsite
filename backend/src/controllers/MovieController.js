const responseHandler = require("../handlers/response.handler.js");
const  MovieDB= require("node-themoviedb");
const axios = require('axios');
const options = {
    secure: true, // use https
    defaultLang: "en" // default language for all requests
};
const mdb = new MovieDB(process.env.TMDB_KEY, options);

class MovieController {
    async infoMovie(req, res) {
        const id = req.params.id;;
        try {
            const args = {
                pathParameters: {
                    movie_id: id,
                },
            };
            const response = await mdb.movie.getDetails(args);
           // res.send(response.data); // Assuming you want to send only the data part
            return responseHandler.ok(res, response);
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    }
    async getMovieList(req, res) {
        try {
            const args = {
                query: {
                    page: 1,
                },
            };
            const response = await mdb.movie.getPopular(args);
            return responseHandler.ok(res, response);  // Assuming you want to send only the data part
        } catch (error) {
            responseHandler.error(res);
        }
    }
    async getVideos(req, res) {
        try {
            const args = {
            pathParameters: {
                movie_id:req.params.id,
            },
            };
            
            const response = await mdb.movie.getVideos(args);

            return responseHandler.ok(res, response); // Assuming you want to send only the data part
        } catch (error) {
            responseHandler.error(res);
        }
    }
    async getImages(req, res) {
        try {
            const args = {
                pathParameters: {
                    movie_id: req.params.id,
                },
                query: {
                    include_image_language: "en,null",
                },
            };
            const response = await mdb.movie.getImages(args);
            return responseHandler.ok(res, response); // Assuming you want to send only the data part
        }
        catch (error) {
            responseHandler.error(res);
        }
    }
    async searchMovie(req, res) {
        try {
            const args = {
                query: {
                    query: req.query.query,
                },
            };
            const response = await mdb.search.multi(args);
            return responseHandler.ok(res, response); // Assuming you want to send only the data part
        } catch (error) {
            responseHandler.error(res);
        }
    }
    async getCredits(req, res) {
        try {
            const args = {
                pathParameters: {
                    movie_id: req.params.id,
                },
            };
            const response = await mdb.movie.getCredits(args);
            return responseHandler.ok(res, response); // Assuming you want to send only the data part
        } catch (error) {
            responseHandler.error(res);
        }
    }
    async getSimilar (req, res) {
        try {
            const args = {
                pathParameters: {
                    movie_id: req.params.id,
                },
            };
            const response = await mdb.movie.getSimilarMovies(args);
            return responseHandler.ok(res, response); // Assuming you want to send only the data part
        } catch (error) {
            responseHandler.error(res);
        }
    }
    async getGenres  (req, res)  {
        try {
            const response = await mdb.genre.getMovieList();
            return responseHandler.ok(res, response); // Assuming you want to send only the data part
        } catch (error) {
            responseHandler.error(res);
        }
    }
    async getDiscover(req, res) {
        try {
            let args = {
                query: {}
            };
            args.query.include_adult = false;
            if (req.query.with_genres) {
                args.query.with_genres = req.query.with_genres;
            }

            if (req.query.page) {
                args.query.page = req.query.page;
            }

            if (req.query.sort_by) {
                args.query.sort_by = req.query.sort_by;
            }
            if (req.query['primary_release_date.gte']) {
                args.query['primary_release_date.gte'] = req.query['primary_release_date.gte'];
            }
            if(req.query.primary_release_year){
                args.query['primary_release_year'] = req.query.primary_release_year;
            }
            if (req.query.with_original_language) {
                args.query.with_original_language = req.query.with_original_language;
            }
            let response;
            //const genreList = await mdb.genre.getMovieList();

            response = await mdb.discover.movie(args);
            
            return responseHandler.ok(res, response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
            return responseHandler.error(res);
        }
    }
    async getImages(req, res) {
        try{
            const args = {
                pathParameters: {
                    movie_id: req.params.id,
                },
            }
            //console.log(args);
             //const response = await mdb.movie.getImages(req.params.id);
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/images?api_key=6b651d68e87a26b95fe71080b28abea1`)
            return responseHandler.ok(res, response.data);
        }catch {
            return responseHandler.error(res);
        
        }
    }
    async getReviews(req, res) {
        try{
            const args = {
                pathParameters: {
                    movie_id: req.params.id,
                },
            }
            const response = await mdb.movie.getReviews(args);
            return responseHandler.ok(res, response);
        }catch {
            return responseHandler.error(res);
        
        }
    }
  
    
    
}

module.exports = new MovieController;
