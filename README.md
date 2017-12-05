# Universal tutorial

## Step 1: Next.js + React

Install dependencies

```shell
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

```js
export default () => <div>Don't panic!</div>;
```

Play

```shell
$ npm run dev
```

## Step 2: Add pages

Create `my-page.js` in `/pages/` folder to add pages server under `/my-page`
url.

```js
export default () => <div>My custom page.</div>;
```

## Step 3: Dynamic pages

```shell
$ npm i express next-routes
```

Create `routes` mapping

```js
const routes = require("next-routes")();

routes.add("index", "/").add("race", "/race/:name");

module.exports = routes;
```

Create a server (`src/server.js`) for our logic

```js
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

```js
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

```shell
$ npm i next-apollo
```

Apollo config in `lib/apollo.js`

```js
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

```js
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

```js
import withData from "../lib/apollo";
export default withData(() => <main>...</main>);
```

Use data in components

```js
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

## Step 5: Styles

Default with `styled-jsx`

```js
export default () => (
  <header>
    <h1>
      Don't<br />panic!
    </h1>

    <style jsx>{`
      header {
        background-color: #000;
        text-align: center;
        padding: 50px;
      }
      h1 {
        color: #b90003;
        font-family: "Arial black";
        font-size: 120px;
        font-weight: 900;
        letter-spacing: -10px;
        line-height: 0.9em;
        text-transform: uppercase;
        -webkit-text-stroke: 6px #e79705;
      }
    `}</style>
  </header>
);
```
