# generic-typescript-require
transparently require() typescript 1.4+ or jsx-typescript from node

Heavily inspired by Pete Hunt's [`node-jsx`](https://github.com/petehunt/node-jsx)

## Usage

### Default
```
require('generic-typescript-require').install()
```

### Other options
```
> npm install --save jsx-typescript

// app.js
require('generic-typescript-require')
  .install({ compiler: 'jsx-typescript', extension: '.tsx'})
```