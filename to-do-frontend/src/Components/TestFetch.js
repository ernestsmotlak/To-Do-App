import React, { useState } from 'react'

const TestFetch = () => {
  const [error, setError] = useState('');
  const [taskName, setTaskName] = useState('');
  const [allTasks, setAllTasks] = useState(null);

  const fetchTaskFunction = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/fetchtest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      setAllTasks(data.allTasks);
      console.log(data.allTasks);

    } catch (error) {
      setError(error.message);
    }

  };

  return (
    <div>
      <h2>TestFetch</h2>
      <form onSubmit={fetchTaskFunction}>
        <div>
          <label>Task:</label>
          <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
        </div>
        <button type="submit">Show Tasks</button>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {allTasks && (
        <div>
          <p>Tasks for {taskName}:</p>
          <ul>
            {allTasks.map((task, index) => (
              <li key={index}>
                Task ID: {task.TaskId}, Task Name: {task.TaskName}, Task Time: {task.TaskTime}, Task Date: {task.TaskDate}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  )
}

export default TestFetch