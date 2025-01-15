# Express

Express is a fast, unopinionated, minimalist web framework for Node.js.

## To Install Express
Run the following command:
```bash
npm install express
```

### Example
```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

---

# Nodemon

Nodemon is a tool that helps develop Node.js-based applications by automatically restarting the application when file changes in the directory are detected.

### Features
- Automatically restarts the application on file changes.
- No additional code changes required.
- Acts as a replacement wrapper for `node`.

### Installation
To install Nodemon globally, run the following command:
```bash
npm install -g nodemon
```

### Usage
To use Nodemon, replace `node` with `nodemon` when starting your application:
```bash
nodemon app.js
```

---

# Routing

Express provides routing methods to define endpoints for different HTTP methods.

## Route Methods
The commonly used HTTP methods are:
- `GET`
- `POST`
- `PATCH`
- `PUT`
- `DELETE`

### Example
```javascript
// GET method route
app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage')
})
```

---

## Route Paths

### Route Paths Based on Strings
1. **Root Route (`/`)**
   ```javascript
   app.get('/', (req, res) => {
     res.send('root')
   })
   ```
   This route matches requests to the root path (`/`).

2. **About Route (`/about`)**
   ```javascript
   app.get('/about', (req, res) => {
     res.send('about')
   })
   ```
   This route matches requests to `/about`.

3. **Random Text Route (`/random.text`)**
   ```javascript
   app.get('/random.text', (req, res) => {
     res.send('random.text')
   })
   ```
   This route matches requests to `/random.text`.

### Route paths based on string patterns
 This route path will match acd and abcd.
```javascript
app.get('/ab?cd', (req, res) => {
  res.send('ab?cd')
})
```
This route path will match abcd, abbcd, abbbcd, and so on.
```javascript
app.get('/ab+cd', (req, res) => {
  res.send('ab+cd')
})
```
This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on.
```javascript
app.get('/ab*cd', (req, res) => {
  res.send('ab*cd')
})
```
 This route path will match /abe and /abcde.
```javascript
app.get('/ab(cd)?e', (req, res) => {
  res.send('ab(cd)?e')
})
```
### Route paths based on regular expressions
This route path will match anything with an “a” in it.
```javascript
app.get(/a/, (req, res) => {
  res.send('/a/')
})
```
This route path will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.
```javascript
app.get(/.*fly$/, (req, res) => {
  res.send('/.*fly$/')
})
```
---

For more detailed information, refer to the [Express documentation](https://expressjs.com/).

