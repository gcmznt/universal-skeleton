const routes = require("next-routes")();

routes.add("race", "/race/:name");

module.exports = routes;
