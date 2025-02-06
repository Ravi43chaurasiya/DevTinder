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

## Route handlers
You can provide multiple callback functions that behave like middleware to handle a request. The only exception is that these callbacks might invoke next('route') to bypass the remaining route callbacks. You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there’s no reason to proceed with the current route.

Route handlers can be in the form of a function, an array of functions, or combinations of both, as shown in the following examples.

+ A single callback function can handle a route. For example:
```javascript
app.get('/example/a', (req, res) => {
  res.send('Hello from A!')
})
```
+ More than one callback function can handle a route (make sure you specify the next object). For example:
```javascript
app.get('/example/b', (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from B!')
})
```
+ An array of callback functions can handle a route. For example:
```javascript
const cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

const cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

const cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])
```
+ A combination of independent functions and arrays of functions can handle a route. For example:
```javascript
const cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

const cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

app.get('/example/d', [cb0, cb1], (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from D!')
})
```

# difference Between app.use and app.all in express
  + to know more in detail search in chatGPT.

# Error handling using app.use , try and catch block.

# Database , Schema and models

- create a free cluster on MongoDB Atlas
- install mongoose library
```javascript
npm i mongoose
```
- connect your Application to the database
```javascript
const mongoose=require("mongoose");


const connectDB=async()=>{
await mongoose.connect("mongodb+srv://ravi8601150552:A09rkXvro3piYine@cluster0.tzrlbey.mongodb.net/devTinder");
}

module.exports=connectDB;
```
- call the connectDB function and connect the DB before starting the application, example:
```javascript
const express = require("express");
const connectDB=require("./config/database")

const app = express();

connectDB().then(()=>{
  console.log("Database connection is successfull")
  app.listen(3000, () => {
    console.log("server is running successfully on port 3000...");
  });
})
.catch((err)=>{
  console.error("database can not be connected");
})
```
- creating User Schema and Model
```javascript
const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
  firstName:{
    type:String
  },
  lastName:{
    type:String
  },
  emailId:{
    type:String
  },
  password:{
    type:String
  },
  age:{
    type:Number
  },
  gender:{
    type:String
  }
});

const User=mongoose.model("User",userSchema);

module.exports=User;
```
- Creating post /signup api, to add data to database
```javascript
const User=require("./models/user");
app.post("/signup",async(req,res)=>{
  const userObj={
    firstName:"Rahul",
    lastName:"Chaurasiya",
    emailId:"rahul@chaurasiya.com",
    password:"rahul@321"
  }
  const user=new User(userObj);
  try{
    await user.save();
    res.send(user);
  }
  catch(err){
    res.status(400).send("error saving database");
  }
 
})
```
- making post /signup api dynamic , use of express.jason() middleware.
```javascript
app.use(express.json())
app.post("/signup",async(req,res)=>{
  console.log(req.body);
  const user=new User(req.body);
  try{
    await user.save();
    res.send(user);
  }
  catch(err){
    res.status(400).send("error saving database");
  }
 
})
```
- model.findOne with duplicate emailIDs, which object is returned.
+ to know more about it search in chatgpt.
- API- get user by email
```javascript
app.get("/user",async(req,res)=>{
  const userEmail=req.body.emailId;
  try{
    
    const users= await User.findOne({emailId:userEmail});
    if(users.length===0){
      res.status(404).send("User not found");
    }
    else{
      res.send(users);
    }
  }
  catch(err){
    res.status(404).send("Something went wrong!");
  }

})
```
- API - feed API- get/feed- get all the users from the database
```javascript
app.get("/feed",async(req,res)=>{

  try{
    const users=await User.find({});
    res.send(users);
  }
  catch(err){
    res.status(404).send("Something went wrong!");
  }
})
```

- find user by Id
```javascript
app.get("/userById",async(req,res)=>{
  try{
    const user=await User.findById(req.body._id);
    res.send(user);
  }
  catch(err){
    res.status(404).send("Something went wrong!");
  }
})
```
- create a delete user API
```javascript
app.delete("/user",async(req,res)=>{
  const userId=req.body._id;
  try{
    await User.findByIdAndDelete(userId);
    res.send("user has been deleted")
  }
  catch(err)
  {
    res.status(404).send("Something went wrong!");
  }
})
```
- explore about patch vs put
- API - update a user
```javascript
app.patch("/user",async(req,res)=>{
  const userId=req.body._id;
  try{
    await User.findByIdAndUpdate(userId,req.body);
    res.send("user has been updated");
  }
  catch(err)
  {
    res.status(404).send("Something went wrong!");
  }
})
```
- explore the mongoose documentation to learn more.

# Data Sanitization & Schema Validations

```javascript
const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
  firstName:{
    type:String,
    required: true,
    minLength: 4 ,
    maxLength: 100

  },
  lastName:{
    type:String
  },
  emailId:{
    type:String,
    required:true,
    unique: true,
    lowercase: true,
    trim: true

  },
  password:{
    type:String,
    required:true
  },
  age:{
    type:Number,
    min: 18
  },
  gender:{
    type:String,
    validate(value){
      if(!["male","female","oyhers"].includes(value)){
        throw new Error("Gender data is not valid"); 
      }
    }
  },
  photoUrl:{
    type: String,
    default: "https://weimaracademy.org/dummy-user/"
  },
  about:{
    type: String,
    default: "this is the default about."
  },
  skills:{
    type: [String]
  }
});

const User=mongoose.model("User",userSchema);

module.exports=User;
```


```markdown
# Mongoose `findByIdAndUpdate`

## What is `findByIdAndUpdate`?

`findByIdAndUpdate` is a Mongoose method used to:
1. Find a document in the database by its `_id`.
2. Update the document with the provided data.
3. Return either the **original document** or the **updated document** based on options.

---

## Usage

```javascript
Model.findByIdAndUpdate(id, update, options);
```

### Parameters:
- **`id`**: The `_id` of the document you want to update.
- **`update`**: The changes you want to apply to the document. Example: `{ name: 'John Doe' }`.
- **`options`**: Additional settings to control how the method behaves (explained below).

---

## Key Options

| Option Name                  | Description                                                                                      | Default Value      |
|------------------------------|--------------------------------------------------------------------------------------------------|--------------------|
| **`returnDocument`**         | Whether to return the document **before** or **after** the update.                              | `'before'`         |
| **`new`**                    | If `true`, returns the **updated document** instead of the original.                            | `false`            |
| **`runValidators`**          | If `true`, validates the update against the schema rules.                                       | `false`            |
| **`upsert`**                 | If `true`, inserts a new document if no matching document is found.                             | `false`            |
| **`lean`**                   | If `true`, returns the document as a plain JavaScript object instead of a Mongoose document.    | `false`            |
| **`timestamps`**             | If `false`, skips updating the `createdAt` and `updatedAt` fields (if your schema uses timestamps). | `true`             |
| **`sort`**                   | Sort the documents (if multiple exist) before updating.                                         | `undefined`        |

---

## Examples

### 1. Basic Usage
```javascript
const updatedDoc = await Model.findByIdAndUpdate(
    '123456',                          // The ID of the document to update
    { name: 'John Doe' },              // The fields to update
    { new: true }                      // Return the updated document
);
console.log(updatedDoc);
```

### 2. Using Validators
```javascript
const updatedDoc = await Model.findByIdAndUpdate(
    '123456',
    { email: 'invalid-email' },        // Invalid email
    { runValidators: true }            // Ensures the email follows schema validation
);
```

### 3. Insert a Document if Not Found (Upsert)
```javascript
const doc = await Model.findByIdAndUpdate(
    'nonexistent_id',
    { name: 'New User', email: 'new@example.com' },
    { upsert: true, new: true }       // Insert the document if not found
);
console.log(doc);
```

### 4. Using `lean` to Get Plain JavaScript Object
```javascript
const plainObject = await Model.findByIdAndUpdate(
    '123456',
    { age: 25 },
    { lean: true, new: true }         // Returns a plain JS object
);
console.log(plainObject);
```

---

## How It Works Internally
1. **Find the Document**: Looks for a document with the given `_id`.
2. **Update the Document**:
   - If the update doesn't contain special operators like `$set`, Mongoose automatically adds `$set` to it.
   - Example:
     ```javascript
     Model.findByIdAndUpdate(id, { name: 'John' });
     // Internally sent as:
     Model.findByIdAndUpdate(id, { $set: { name: 'John' } });
     ```
3. **Return the Document**:
   - Based on the `new` or `returnDocument` option, it either returns the original or the updated document.

---

## Important Notes
1. **Validation**:
   - By default, Mongoose does **not** run schema validation on updates.
   - Use `runValidators: true` to validate the update.

2. **When to Use `findByIdAndUpdate`**:
   - Use it for simple updates where you don’t need to fetch the document first.
   - For complex updates (e.g., conditional logic), retrieve the document first using `findById`, modify it, and save it.

3. **Upserts**:
   - If you enable `upsert: true`, Mongoose will create a new document if the `_id` is not found.

---

## Summary
- `findByIdAndUpdate()` combines finding a document and updating it in one step.
- You can customize the behavior with options like:
  - **`new`**: Return the updated document.
  - **`runValidators`**: Validate the update.
  - **`upsert`**: Insert a new document if not found.

---


```
### What Are Timestamps in Mongoose?
Timestamps is a Mongoose feature that automatically adds two date fields to your documents:

- createdAt: When the document was first created.
- updatedAt: When the document was last updated.
- To enable timestamps, set timestamps: true in your schema:

```javascript

const userSchema = new Schema({ name: String }, { timestamps: true });
```
## API level data sanitization

## NPM validator Library

- A library of string validators and sanitizers.

## Strings only
### This library validates and sanitizes strings only.
- If you're not sure if your input is a string, coerce it using input + ''. Passing anything other than a string will result in an error.

### Installation and Usage
- Install the library with
```javascript
 npm install validator
 ```
 ```javascript
 var validator = require('validator');

validator.isEmail('foo@bar.com');
```
- example to understand validator.isEmail
```javascript
 emailId:{
    type:String,
    required:true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid email address!");
      }
    }

  }
  ```
# encrypting Password 

## npm bcrypt package
```javascript
npm install bcrypt
```
- import the package
```javascript
const bcrypt=require("bcrypt");
```
- generate the password hash
```javascript
  const {password}=req.body;
  // Encrypt the Password
  const passwordHash=await bcrypt.hash(password,10)
  console.log(passwordHash);
  ```
  - To check a password:
  ```javascript
  // Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // result == true
});
```
- example:
```javascript
// Login Api
app.post("/login",async(req,res)=>{
  try{
    const {emailId,password}=req.body;
    const user=await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Invalid credential!");
    }
    const isPasswordValid=await bcrypt.compare(password,user.password);

    if(isPasswordValid){
      res.send("Login Successfull");
    }
    else{
      throw new Error("invalid credential!");
    }
  }
  catch(err){
    res.status(400).send("error: "+ err.message);
  }
})
```
---
# Authentication, JWT & Cookies
- while login , if login successfull, send the cookies.
```javascript
     //Create a JWT Token

      //Add the token to cokkie and  send the respose back to the user.
      res.cookie("token","adghlfddhglfgj;");
 ```
- in the subsequent request
```javascript
app.get("/profile",async(req,res)=>{
  const cookies=req.cookies;
  console.log(cookies);
  res.send("reading cookies");
})
```
- but console.log(cookies) will give undefined. to read the cookies we need a middleware named cookie-parser.

```javascript
npm i cookie-parser
// require
const cookieParser=require("cookie-parser");
// use the middleware
app.use(cookieParser());
```
- now you will be read the cookies.

## JWT 
- for more visit: https://jwt.io/
- we will use npm package jsonwebtoken to generate JWT(json web tokens).

```javascript
npm install jsonwebtoken
```

```javascript
const jwt=require("jsonwebtoken");
//Create a JWT Token in login API
  const token=await jwt.sign({_id:user._id},"dev@tinder$secretKey");
// validate my token in subsequent request exp- profile API
  const decodedMessage=await jwt.verify(token,"dev@tinder$secretKey");
  console.log(decodedMessage);
  ```

  - to make the token expire, we use expiresIn  attribute.
  - example:
```javascript
 const token=await jwt.sign({_id:user._id},"dev@tinder$secretKey",{expiresIn:"1d"});
 ```
 - to make the cookies expire we use expires attribute.
 - example:
 ```javascript
  res.cookie("token",token,{expires:new Date(Date.now()+ 8* 36000)});
  ```
  - schema methods
  ```javascript
  userSchema.methods.getJWT=async function(){
  const user=this;
  const token=await jwt.sign({_id:user._id},"dev@tinder$secretKey",{expiresIn:"1d"});
  return token;
}
```
```javascript
userSchema.methods.validatePassword=async function(passwordInputByUser){
  const user=this;
  const isPasswordValid=await bcrypt.compare(passwordInputByUser,user.password);

  return isPasswordValid;
  
}
```
# express Router

```javascript
const express = require("express");

const authRouter=express.Router();

module.exports=authRouter;
```

## logout API and profile/edit API has been Implemented.

# Logical DB Query & Compound Indexes

## connectionRequest collection
```javascript

const { type } = require("express/lib/response");
const mongoose=require("mongoose");

const connectionRequestSchema=new mongoose.Schema({
  fromUserId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },
  toUserId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },
  status:{
    type:String,
    enum:{
      values:["interested","ignored","accepted","rejected"],
      message:"incorrect status value"
    },
    required:true
  }

},{
  timestamps:true
})

const ConnectionRequest=new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports=ConnectionRequest;
```
## /request/send/status(ignored,interested)/userId

```javascript
requestsRouter.post("/request/send/:status/:userId",userAuth,async(req,res)=>{
  try {
    const allowedStatus=["interested","ignored"];
    const fromUserId=req.user._id; // from the userAuth middleware
    const toUserId=req.params.userId;
    const status=req.params.status;

    // check if toUserId exist in user collection

    const isToUserExist=await User.findById(toUserId);

    if(!isToUserExist){
      return res.json({message:`${toUserId} does not exist in the database!`})
    }

    if(!allowedStatus.includes(status)){
      return res.status(400).json({message:`${status} is an invalid status`})
    }
    
    // A user can not send the connection request to himself/herself

    if(fromUserId==toUserId){
      return res.json({message:"you cant send connection request to yourself!"})
    }
    

    const connectionRequest= new ConnectionRequest({
      fromUserId:fromUserId,
      toUserId:toUserId,
      status:status
    })
     // is connection already exist
    const isconnectionAlreadyExist= await ConnectionRequest.findOne({
      $or:[
      {fromUserId:fromUserId,
        toUserId:toUserId
      },
      {
        fromUserId:toUserId,
        toUserId:fromUserId
      }
    ]})

    if(isconnectionAlreadyExist){
      return res.json({message:"connection already exist"
      })
    }

    const data=await connectionRequest.save();
    console.log(data);
    res.send("connection request is successfull");

    
  } catch (error) {
    res.status(400).send("error while sending connection requeest: "+ error);
  }
})
```
## explore index in moongose schema

## explore pre middleware in moongose schrma
```javascript
schema.pre('save', function(next) {
  const err = new Error('something went wrong');
  // If you call `next()` with an argument, that argument is assumed to be
  // an error.
  next(err);
});
```

## ref, Populate & Thought process of writing APIs

### post /request/review/:status/:requestId
```javascript
requestsRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
  try {
    const loggedInUser=req.user;
    const status=req.params.status;
    const requestId=req.params.requestId;

    // validate the status coming from request params, either it is ["accepted","rejected"] or not.

    const allowedStatus=["accepted","rejected"];
    if(!allowedStatus.includes(status)){
      return res.json({message:"invalid Status!"});
    }
    // loggedInUser = toUserId
    // status of the connection request should be "interested" only then we can accept or reject the request.
    // requestId should be valid i.e it should be present in the DB.

    const connectionRequest=await ConnectionRequest.findOne({
      _id:requestId,
      toUserId:loggedInUser._id,
      status:"interested"
    })

    if(!connectionRequest){
      return res.json({message:"connection does not found!"});
    }

    connectionRequest.status=status;

    const data=await connectionRequest.save();

    res.json({message:"request is "+ status,data});

  } catch (error) {
    res.status(400).send("Error "+ error.message);
  }
})
```
### get /user/requests/received
```javascript
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
  try {
    const loggedInUser=req.user;
    const safeData="firstName lastName photoUrl age gender about skills";
    const connectionRequests=await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",

        }).populate("fromUserId", safeData);

    res.json({
      message:"Data fetched successfully",
      data: connectionRequests
    })    
    
  } catch (error) {
    res.status(400).send("Error : "+ error.message);
    
  }
})
```
### get /user/connections
```javascript
userRouter.get("/user/connections",userAuth,async(req,res)=>{
  try {
    const loggedInUser=req.user;
    const safeData="firstName lastName photoUrl age gender about skills";
    const connections=await ConnectionRequest.find({
      $or:[
        {
          toUserId:loggedInUser._id,status:"accepted"
        },
        {
          fromUserId:loggedInUser._id,
          status:"accepted"
        }
      ]

    }).populate("fromUserId",safeData)
    .populate("toUserId",safeData);

    const data=connections.map((row)=>{
      if(row.fromUserId._id==loggedInUser._id){
        return row.toUserId;
      }

      return row.fromUserId;
    })

    res.json({data:data});
    
  } catch (error) {
    res.status(400).send("Error : "+ error.message);
  }
})
```
## Building Feed APi and Pagination
---

For more detailed information, refer to the [Express documentation](https://expressjs.com/).

