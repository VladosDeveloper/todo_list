const { Router } = require("express");
const Todo = require("../models/toDo");
const router = Router();

router.get("/", async (req, res) => {
  const todo = await Todo.find({}).lean();
  res.render("index", {
    title: "ToDos list",
    isIndex: true,
    todo,
  });
});

router.get("/create", (req, res) => {
  res.render("create", {
    title: "Create ToDos",
    isCreate: true,
  });
});

router.post("/create", async (req, res) => {
  const todo = new Todo({
    titleName: req.body.titleName,
  });

  await todo.save();
  res.redirect("/");
});

router.post("/complete", async (req, res) => {
  const todo = await Todo.findById(req.body.id);
  todo.finished = !!req.body.completed;
  await todo.save();
  res.redirect("/");
});

module.exports = router;
