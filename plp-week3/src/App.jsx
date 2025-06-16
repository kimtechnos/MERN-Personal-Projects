import { useState } from "react";
import Task from "./components/Task";
import TaskForm from "./components/TaskForm";
import { useEffect } from "react";

export default function App() {
  //Initializing state, loading from localStorage if data exists
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, title: "Write Lesson Plan", completed: false },
          { id: 2, title: "Review MongoDb Quiz", completed: true },
        ];
  });
  //persist task whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  //toggleTask
  const toggleTask = (id) => {
    setTasks((curr) =>
      curr.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  //add a new task at the beginning of the array
  const addTask = (title) => {
    setTasks((curr) => [{ id: Date.now(), title, completed: false }, ...curr]);
  };
  return (
    <div className="min-h-screen bg-yellow-400 p-6">
      <h1 className="text-3xl font-bold mb-4 ">Task Dashboard</h1>
      <TaskForm onAdd={addTask} />
      {tasks.length ? (
        tasks.map((task) => (
          <Task key={task.id} {...task} onToggle={toggleTask} />
        ))
      ) : (
        <p className="text-lg text-gray-600">No tasks yet! Add one above.</p>
      )}
    </div>
  );
}
