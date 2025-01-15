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
## Route parameters
Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.
```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```

To define routes with route parameters, simply specify the route parameters in the path of the route as shown below.
```
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})
```
Since the hyphen (-) and the dot (.) are interpreted literally, they can be used along with route parameters for useful purposes.
```
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }
```
```
Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }
```
To have more control over the exact string that can be matched by a route parameter, you can append a regular expression in parentheses (()):
```
Route path: /user/:userId(\d+)
Request URL: http://localhost:3000/user/42
req.params: {"userId": "42"}
```
To ensure that only certain kinds of values (like digits) can match the route, you can append a regular expression in parentheses right after the parameter name.
```javascript
app.get('/user/:userId(\\d+)', (req, res) => {
  res.send(`User ID: ${req.params.userId}`);
});
```
```
Here’s what’s happening:
:userId defines a route parameter named userId.
(\\d+) is a regular expression that restricts the parameter to one or more digits (\\d+).
\\d matches any digit (0-9).
+ means "one or more occurrences".
This means only URLs like /user/42 or /user/123 will match the route.
```
```
Request URL: http://localhost:3000/user/42
Output: User ID: 42
Request URL: http://localhost:3000/user/abc
This request will not match the route, because abc is not a digit, and the regular expression \\d+ only allows digits.
```
+ More Examples
Alphanumeric Usernames

```javascript
app.get('/profile/:username([a-zA-Z0-9_]+)', (req, res) => {
  res.send(`Username: ${req.params.username}`);
});
```

This route will only match if the username contains letters, digits, or underscores.

+ Date Format (YYYY-MM-DD)

```javascript
app.get('/date/:date(\\d{4}-\\d{2}-\\d{2})', (req, res) => {
  res.send(`Date: ${req.params.date}`);
});
```
This route will match dates in the YYYY-MM-DD format, such as /date/2025-01-15.

---

For more detailed information, refer to the [Express documentation](https://expressjs.com/).

