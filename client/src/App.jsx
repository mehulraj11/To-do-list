import { useState } from "react";
import Task from "./Task";
import "./task.css";

export default function App() {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [taskArray, setTaskArray] = useState([]);
  const [task, setTask] = useState("");

  const handleTaskInput = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (task) {
      setTaskArray([...taskArray, task]);
      setTask("");
    } else {
      alert(`Enter task`);
    }
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
    <div className="container">
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
        {renderTask}
      </div>
      <p>{`${completedTasks} / ${taskArray.length}`}</p>
    </div>
  );
}
