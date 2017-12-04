# Universal tutorial

## Step 1: Next.js + React

Install dependencies

```
npm i next@latest react@latest react-dom@latest
```

Scripts in package.json

```
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start"
},
```

Create the first page `pages/index.js`

```
export default () => <div>Don't panic!</div>;
```

Play

```
npm run dev
```

## Step 2: Create pages

Create `my-page.js` in `/pages/` folder to add pages server under `/my-page`
url.

## Step 3: Dynamic pages

```
npm i express next-routes
```

Create `routes` mapping

```
const routes = require("next-routes")();

routes
  .add("index", "/")
  .add("race", "/race/:name");

module.exports = routes;
```

Create a server (`server.js`) for our logic

```
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
```

Use links from our router

```
import { Link } from "../src/routes";
<Link route="race" params={{ name: "Humans" }}>Humans</Link>
```

Create a target page `pages/race.js` and get info from url

```
<h1>{props.url.query.name}</h1>
```

Change npm script

```
"dev": "node src/server.js"
```
