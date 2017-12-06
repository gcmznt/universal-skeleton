# 👍 Hitchhiker's guide to the "Universal JS"

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

```jsx
export default () => <div>Don't panic!</div>;
```

Play

```shell
$ npm run dev
```

## Step 2: Add pages

Create `my-page.js` in `/pages/` folder to add pages server under `/my-page`
url.

```jsx
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

```jsx
import { Link } from "../src/routes";
<Link route="race" params={{ name: "Humans" }}>
  <a>Humans</a>
</Link>;
```

Create a target page `pages/race.js` and get info from url

```jsx
<h1>{props.url.query.name}</h1>;
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

export default withData({
  link: new HttpLink({
    uri: "https://api.graph.cool/simple/v1/cj8d1a6hi053j0165fzbf5o4b"
  })
});
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

```jsx
import withData from "../lib/apollo";
export default withData(() => <main>...</main>);
```

Use data in components

```jsx
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

```jsx
<Race slug={props.url.query.name} />;
```

## Step 5: Styles

Default with `styled-jsx`

```jsx
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
        ...;
      }
    `}</style>
  </header>
);
```

### Step 5.1: Change CSS-in-JS tool

You can use what you want like `styled-components`

```shell
$ npm i styled-components
```

```js
import styled from "styled-components";

const Cover = styled.header`
  background-color: #000;
  text-align: center;
  padding: 50px;
`;
```

Little setup for SSR in `pages/_document.js`

```jsx
import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <title>👍 Hitchhiker's guide to the "Universal JS"</title>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
```

a lot of examples here: https://github.com/zeit/next.js/tree/canary/examples

## Step 6: Test components with Storybook

```shell
$ npm i --save-dev @storybook/react
```

Add script to `package.json`

```json
  "storybook": "start-storybook -p 9001 -c .storybook"
```

Create the configuration file `.storybook/config.js`

```js
import { configure } from "@storybook/react";

configure(() => {
  require("../stories/cover.js");
}, module);
```

And create your stories like `stories/cover.js`

```jsx
import React from "react";
import { storiesOf } from "@storybook/react";
import Cover from "../components/Cover";

storiesOf("Cover", module).add("normal", () => <Cover />);
```

```shell
$ npm run storybook
```

## Step 7: Static files

Just create a `/static` folder and it will be served
