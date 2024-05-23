
const movieRoute = require("./movie.route");
const accountRoute = require("./account.route");
const personRoute = require("./person.route");
const genreRoute = require("./genre.route");
const reviewRoute = require("./review.route");

function routes(app) {
    app.use("/movie", movieRoute);
    app.use("/person", personRoute)
    app.use("/account", accountRoute);
    app.use("/genre", genreRoute);
    app.use("/reviews", reviewRoute);

}
module.exports = routes;
