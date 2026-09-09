import { useState } from "react";
import PageTransition from "../../../Providers/AnimationProvider/PageTransition";
import { toast } from "react-toastify";

const TimeManagement = () => {
  const [routines, setRoutines] = useState([
    { id: 1, time: "06:00 AM", task: "Wake up & Exercise", completed: false },
    { id: 2, time: "08:00 AM", task: "Breakfast & Planning", completed: false },
    { id: 3, time: "09:00 AM", task: "Deep Work Session 1", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [newTime, setNewTime] = useState("");

  const handleAddRoutine = (e) => {
    e.preventDefault();
    if (!newTask || !newTime) {
      toast.error("Please enter both time and task!");
      return;
    }
    const newRoutine = {
      id: Date.now(),
      time: newTime,
      task: newTask,
      completed: false,
    };
    setRoutines([...routines, newRoutine].sort((a, b) => a.time.localeCompare(b.time)));
    setNewTask("");
    setNewTime("");
    toast.success("Routine added successfully!");
  };

  const toggleCompletion = (id) => {
    setRoutines(
      routines.map((r) =>
        r.id === id ? { ...r, completed: !r.completed } : r
      )
    );
  };

  const deleteRoutine = (id) => {
    setRoutines(routines.filter((r) => r.id !== id));
    toast.info("Routine deleted.");
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          📅 Daily Routine Builder
        </h2>

        {/* Add New Routine Form */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
          <form onSubmit={handleAddRoutine} className="flex flex-col sm:flex-row gap-4">
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="input input-bordered w-full sm:w-1/3"
            />
            <input
              type="text"
              placeholder="What to do?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="input input-bordered w-full sm:w-2/3"
            />
            <button type="submit" className="btn btn-primary w-full sm:w-auto">
              Add Task
            </button>
          </form>
        </div>

        {/* Routine List */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Your Schedule</h3>
          {routines.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No tasks scheduled yet. Enjoy your free time!</p>
          ) : (
            <ul className="space-y-3">
              {routines.map((routine) => (
                <li
                  key={routine.id}
                  className={`flex flex-col sm:flex-row justify-between items-center p-4 rounded-lg border transition-all ${
                    routine.completed ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto mb-2 sm:mb-0">
                    <input
                      type="checkbox"
                      checked={routine.completed}
                      onChange={() => toggleCompletion(routine.id)}
                      className="checkbox checkbox-primary"
                    />
                    <div>
                      <p className={`font-bold ${routine.completed ? "text-gray-400 line-through" : "text-gray-800"}`}>
                        {routine.time}
                      </p>
                      <p className={`text-lg ${routine.completed ? "text-gray-400 line-through" : "text-gray-700"}`}>
                        {routine.task}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteRoutine(routine.id)}
                    className="btn btn-sm btn-error btn-outline"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default TimeManagement;
