# Universal tutorial

## Step 1: Next.js + React

Install dependencies

```
$ npm i -S next@latest react@latest react-dom@latest
```

Scripts in package.json

```json
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start"
},
```

Create the first page `pages/index.js`

```javascript
export default () => <div>Don't panic!</div>;
```

Play

```
$ npm run dev
```

## Step 2: Add pages

Create `my-page.js` in `/pages/` folder to add pages server under `/my-page`
url.

```javascript
export default () => <div>My custom page.</div>;
```

## Step 3: Dynamic pages

```
$ npm i express next-routes
```

Create `routes` mapping

```javascript
const routes = require("next-routes")();

routes.add("index", "/").add("race", "/race/:name");

module.exports = routes;
```

Create a server (`src/server.js`) for our logic

```javascript
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

```javascript
import { Link } from "../src/routes";
<Link route="race" params={{ name: "Humans" }}>
  Humans
</Link>;
```

Create a target page `pages/race.js` and get info from url

```html
<h1>{props.url.query.name}</h1>
```

Change npm script

```json
"dev": "node src/server.js"
```

## Step 4: GraphQL

```
$ npm i next-apollo
```

Apollo config in `lib/apollo.js`

```javascript
import { withData } from "next-apollo";
import { HttpLink } from "apollo-link-http";

const config = {
  link: new HttpLink({
    uri: "https://api.graph.cool/simple/v1/cj8d1a6hi053j0165fzbf5o4b"
  })
};

export default withData(config);
```

Create queries in `src/queries.js`

```javascript
import gql from "graphql-tag";

export const race = gql`
  query Race($slug: String!) {
    Race(slug: $slug) {
      id
      name
      slug
      description
    }
  }
`;

export const allRaces = gql`...`;
```

Add data to pages

```javascript
import withData from "../lib/apollo";
export default withData(() => <main>...</main>);
```

Use data in components

```javascript
import { Component } from "react";
import { graphql } from "react-apollo";
import { race as raceQuery } from "../src/queries";

@graphql(raceQuery, {
  options: ({ slug }) => ({ variables: { slug } }),
  props: ({ data: { loading, Race = {} } }) => ({
    loading,
    race: Race
  })
})
export default class Race extends Component {
  render() {
    const { loading, race } = this.props;
    return ...
  }
}
```

And use components

```html
<Race slug={props.url.query.name} />
```
