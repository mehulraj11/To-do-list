import express from "express"

// controllers
import { create, getAll, deleteTask, updateTask } from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.post("/", create);
taskRouter.get("/", getAll);
taskRouter.delete("/:id", deleteTask);
taskRouter.patch("/:id", updateTask)
// taskRouter.getAll("/", create);
// taskRouter.update("/", create);
// taskRouter.delete("/", create);

export default taskRouter