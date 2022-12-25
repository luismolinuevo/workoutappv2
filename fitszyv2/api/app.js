require('dotenv').config();     //this makes you able to use .env files
const express = require("express");
const expressSession = require("express-session");
const passport = require("./middleware/passport-config");
const cors = require("cors");
const { sequelize, user } = require("./models");
const app = express();
// const session = require('express-session');

const PORT = process.env.PORT;
const secret = process.env.SESSION_SECRET;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName= process.env.DB_NAME;
const frontEnd = process.env.FRONTEND_URL;

const pgSession = require('connect-pg-simple')(expressSession);
const sessionPool = require('pg').Pool;

const conObject = new sessionPool({
  user: dbUser,
  password: dbPass,
  host: dbHost,
  port: dbPort,
  database: dbName
})

app.use(express.json());

//Middlewares

app.use(     //protects from attacks. And makes things safer.
    cors({
      origin: frontEnd, // <-- location of the react app were connecting to
      methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
      credentials: true,
      
    })
);

// setup passport and session cookies
app.use(
    expressSession({
      secret: process.env.SESSION_SECRET,
      credentials: true,
      resave: false,
      saveUninitialized: false,   //was true
      store: new pgSession({
        // tableName : 'test',   // Use another table-name than the default "session" one
        // pgPromise: 'postgres://ctp_user:ctp_pass@localhost:5432/fitszy_db',
        pool: conObject,
        ttl: 3600,
        createTableIfMissing: true,  //this will only work if the table name part isnt there.
      }),
      cookie: {
        maxAge: 3600000,
        // secure : true       uncomment when its in production
      }
})
);

app.use(passport.initialize());
app.use(passport.session());

// this mounts controllers/index.js at the route `/api`
app.use("/api", require("./controllers"));

app.listen(process.env.PORT || 5000, async () => {
    console.log('Sever up on http://localhost:5000');
    await sequelize.authenticate()
    console.log('Database connected!')
})

