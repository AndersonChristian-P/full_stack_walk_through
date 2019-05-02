const express = require("express")
require("dotenv").config()
const app = express()
const massive = require("massive")
const session = require("express-session")
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env
const ctrl = require("./controller")

// -- MIDDLEWARE -- //

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false, // if it is set to true | if a user leaves and comes back it resets the session
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  } // always set maxAge | the maxAge above is set to 1 day
}))
// we use sessions to save information about a user


// -- MASSIVE -- //
massive(CONNECTION_STRING).then((database) => {
  app.set("db", database)
  console.log("database set!")
  console.log(database.listTables())
  app.listen(SERVER_PORT, () => {
    console.log(`listening on port ${SERVER_PORT}`)
  })
})

// -- ENDPOINTS -- //
app.get("/api/users", ctrl.getUsers)
app.post("/auth/register", ctrl.register)
app.post("/auth/login", ctrl.login)