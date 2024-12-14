// Definisi Library yang digunakan
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const flash = require("req-flash");
const app = express();

const port  = 5050;

// Definisi lokasi file router
const loginRoutes = require("./src/routes/router_login");
const registerRoutes = require("./src/routes/router_register");
const appRoutes = require("./src/routes/router_app");
const contactRoutes = require("./src/routes/router_contact");
const todoRoutes = require("./src/routes/router_ToDo");

// Untuk melayani gambar dari folder 'public/images'
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));



// Configurasi library session
app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: "t@1k0ch3ng",
      name: "secretName",
      cookie: {
        sameSite: true,
        maxAge: 60000,
      },
    })
  );

// Configurasi dan gunakan library
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

app.use(function (req, res, next) {
  res.setHeader(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  res.setHeader("Pragma", "no-cache");
  next();
});

// Setting folder views
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

// Gunakan routes yang telah didefinisikan
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/contact", contactRoutes);
app.use("/todo", todoRoutes);
app.use("/", appRoutes);

// Middleware untuk public folder
app.use(express.static(path.join(__dirname, "public")));


console.log(app._router.stack);

// Gunakan port server
app.listen(port, () => {
    console.log(`Server sedang berjalan di port : http://localhost:${port}`);
  });