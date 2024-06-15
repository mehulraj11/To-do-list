import { useState } from "react";
import Task from "./Task";
export default function App() {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [taskArray, setTaskArray] = useState([]);
  const [task, setTask] = useState("");
  const handleTaskInput = (e) => {
    setTask(e.target.value);
  };
  const handleAddTask = (e) => {
    e.preventDefault();
    setTaskArray([...taskArray, task]);
    setTask("");
    console.log(taskArray);
  };
  const renderTask = taskArray.map((item, index) => {
    return (
      <Task
        key={index}
        taskArray={taskArray}
        setTaskArray={setTaskArray}
        item={item}
        index={index}
        completedTasks={completedTasks}
        setCompletedTasks={setCompletedTasks}
      />
    );
  });
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Enter your task"
          value={task}
          onChange={handleTaskInput}
        />
        <button onClick={handleAddTask}>Add task</button>
      </form>
      <div>
        {/* <Task taskArray={taskArray}/> */}
        {renderTask}
      </div>
      {`${completedTasks} / ${taskArray.length}`}
    </div>
  );
}
