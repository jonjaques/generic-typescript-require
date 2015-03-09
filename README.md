# node-typescript
transparently require() typescript 1.4+ or jsx-typescript from node

Heavily inspired by Pete Hunt's [`node-jsx`](https://github.com/petehunt/node-jsx)

## Usage

### Default
```
require('node-typescript').install()
```

### Other options
```
> npm install --save jsx-typescript

// app.js
require('node-typescript')
  .install({ compiler: 'jsx-typescript', extension: '.tsx'})
```