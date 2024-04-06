const express = require("express");
const methodOveride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
const bodyParser = require("body-parser");
const multer = require("multer");
require("dotenv").config();
//mongoose
const database = require("./config/database");
const systemConfig = require("./config/system");
const route = require("./Routes/Client/indexRoute");
const routeAdmin = require("./Routes/Admin/indexRouter");
database.connect();

const app = express();
const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOveride("_method"));
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// Flash
app.use(cookieParser("NGTRGTIN"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//END Flash
//App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static(`${__dirname}/public`));
//Routes
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
