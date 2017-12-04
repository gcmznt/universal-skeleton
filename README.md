# Universal tutorial

## Step 1: Next.js

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
