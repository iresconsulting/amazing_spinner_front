# DFON Canvas

# User Stories

- 1.0. Synchronized with Facebook, Instagram, Twitter
- 2.0 Once a User Follows, likes or shares our FB or Instagram,Twitter a random colored pixel will get generated on the White square frame on the Godaddy Website.
- 3.0 Once canvas is full; it will get saved on our webspace storage, - email notification to chris@defon.io (canvas nr. 1 has been completed, time,date) and new canvas gets created.
- 4.0 Once a canvas is created we are minting them and each of our followers has a randomly generated chance to win the minted randomized canvas)

### Distribution of pixels:

- FOLLOW: 1x2 px colored randomized
- LIKE: 2x2 px colored randomized
- COMMENT: 3x3 px colored randomized
- SHARE: 4x4 px colored randomized

## Stack

- Environment
  - Node v12.18.3
- Server Framework
  - Express
- Bundler
  - Webpack 4
- CSS Preprocessor
  - Sass/Scss
- CSS Postprocessor
  - PostCSS
- Frontend Frameworks
  - Vue v2.6.12
  - Nuxt v2.14.5
- Frontend Compiler
  - Typescript 2
- Frontend Transpiler
  - Babel 7
- Unit/Integration Test
  - Jest
- Other Information
  - Http Client
    - @nuxtjs/axios
  - PWA Integration with @nuxt/pwa
  - Typescript Integration with @nuxt/typescript
    - Syntax: Class Style
  - Typescript Integration on Vuex with nuxt-property-decorator

## Build Setup

### Production

```bash
# install dependencies
$ npm install
# build for production and launch server
$ npm run build
$ npm run start
```

### Bundle Analyzer

```bash
# install dependencies
$ npm install
# launch Webpack Analyzer in browser
$ npm run build:dev
```

### Development

```bash
# install dependencies
$ npm install
# serve with hot reload at http://localhost:3000
$ npm run dev
```
