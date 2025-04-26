import taskModel from "../models/taskModel.js";

const create = async (req, res) => {
    try {
        const data = await taskModel.create(req.body);
        res.status(201).json(data);
    } catch (err) {
        console.log(`${err} while POST METHOD`);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const getAll = async (req, res) => {
    try {
        const data = await taskModel.find();
        res.status(200).json(data)
    } catch (err) {
        res.sendStatus(404).json();

    }
}

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const result = await taskModel.deleteOne({ taskId: taskId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error while deleting task:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateTask = async (req, res) => {
    try {
        const updated = await taskModel.updateOne(
            { taskId: req.params.id },
            { $set: req.body }
        );

        if (updated.matchedCount === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(req.body); // 👈 Send updated task back
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};


const putMethod = async (req, res) => {
    try {
        const updated = await taskModel.replaceOne(

            { taskId: req.params.id },
            req.body
        )
        if (updated.matchedCount === 0) {
            return res.status(400).json({ message: "Task not found" })
        }
        res.status(200).json({ message: "Task updated successfully", updatedFields: req.body });


    } catch (error) {
        console.log(error);
        res.sendStatus(500)


    }
}
export { create, getAll, deleteTask, updateTask, putMethod }