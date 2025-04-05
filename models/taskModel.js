import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
});

taskSchema.plugin(AutoIncrement, { inc_field: "taskId" });

const taskModel = mongoose.model("taskData", taskSchema);

export default taskModel;
