const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const expressHandlebars = require("express-handlebars");
const toDoRoutes = require("./routes/toDos");
const port = process.env.PORT || 3000;
const app = express();

const hbs = expressHandlebars.create({
  defaultLayout: "main",
  extname: "hbs",
  allowProtoProperties: {
    __proto__: true,
    allowedProtoProperties: true,
  },
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(toDoRoutes);

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://vladDb:vladDb@cluster0.yeizw.mongodb.net/tutorial?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
    app.listen(port, () => {
      console.log(`server has been started on port ${port}`);
    });
  } catch (e) {
    console.log(e.message);
  }
}

start();
