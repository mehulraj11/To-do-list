import express from "express"

// controllers
import { create, getAll, deleteTask, updateTask, putMethod } from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.post("/", create);
taskRouter.get("/", getAll);
taskRouter.delete("/:id", deleteTask);
taskRouter.patch("/:id", updateTask)
taskRouter.put("/:id", putMethod);
// taskRouter.update("/", create);
// taskRouter.delete("/", create);

export default taskRouter