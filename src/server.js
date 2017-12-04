const express = require("express");
const next = require("next");

const isDev = process.env.NODE_ENV !== "production";
const app = next({ dev: isDev });

const routes = require("./routes");

app.prepare().then(() => {
  express()
    .use(routes.getRequestHandler(app))
    .listen(3000);
});
