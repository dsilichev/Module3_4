const express = require("express");
const chalk = require("chalk");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth");
const { KEY } = require("./key");

const {
  addRequest,
  getRequests,
} = require("./requests-controller");

const { addUser, loginUser } = require("./users-controller");

const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/login", async (req, res) => {
  res.render("login", {
    title: "Login",
    error: undefined,
  });
});

app.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/requests");
  } catch (e) {
    res.render("login", {
      title: "Login",
      error: e.message,
    });
  }
});

app.get("/register", async (req, res) => {
  res.render("register", {
    title: "Express App",
    error: undefined,
  });
});

app.post("/register", async (req, res) => {
  try {
    await addUser(req.body.email, req.body.password);
    res.redirect("/login");
  } catch (e) {
    if (e.code === 11000) {
      res.render("register", {
        title: "Express App",
        error: "Email is already registered",
      });
      return;
    }
    res.render("register", {
      title: "Express App",
      error: e.message,
    });
  }
});

app.get("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true });
  res.redirect("/");
});

app.use(auth);

app.get("/requests", async (req, res) => {
  res.render("requests", {
    title: "Заявки с формы",
    requests: await getRequests(),
    userEmail: req.user.email,
    created: false,
    error: false,
  });
});

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Запись к врачу",
    //notes: await getRequests(),
    //userEmail: req.user.email,
    created: false,
    error: false,
  });
});

app.post("/", async (req, res) => {
  try {
    await addRequest(req.body.name, req.body.phone, req.body.description);
    res.render("index", {
      title: "Запись к врачу",
      created: true,
      error: false,
    });
  } catch (e) {
    console.error("Creation error", e);
    res.render("index", {
      title: "Запись к врачу",
      // notes: await getNotes(),
      // userEmail: req.user.email,
      created: false,
      error: true,
    });
  }
});

// app.delete("/:id", async (req, res) => {
//   try {
//     await removeNote(req.params.id, req.user.email);
//     res.render("index", {
//       title: "Express App",
//       notes: await getNotes(),
//       userEmail: req.user.email,
//       created: false,
//       error: false,
//     });
//   } catch (e) {
//     res.render("index", {
//       title: "Express App",
//       notes: await getNotes(),
//       userEmail: req.user.email,
//       created: false,
//       error: e.message,
//     });
//   }
// });

// app.put("/:id", async (req, res) => {
//   try {
//     await modifyNote(
//       { id: req.params.id, title: req.body.title },
//       req.user.email
//     );
//     res.render("index", {
//       title: "Express App",
//       notes: await getNotes(),
//       userEmail: req.user.email,
//       created: false,
//       error: false,
//     });
//   } catch (e) {
//     res.render("index", {
//       title: "Express App",
//       notes: await getNotes(),
//       userEmail: req.user.email,
//       created: false,
//       error: e.message,
//     });
//   }
// });

mongoose.connect(KEY).then(() => {
  app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}`));
  });
});
