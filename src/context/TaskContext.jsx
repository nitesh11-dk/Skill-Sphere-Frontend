import React, { createContext, useEffect, useContext, useState } from 'react';
import { apiCall } from '../utils/utils';

const TaskContext = createContext();

const getAllTask = async () => {
  const response = await apiCall({
    method: 'get',
    endpoint: '/task/all',
    requiresAuth: true,
    successMessage: 'Tasks retrieved successfully'
  });
  return response.data;
};

// Random background colors for tasks
const backgroundColors = [
  'bg-green-500', 'bg-blue-500', 'bg-purple-500',
  'bg-yellow-500', 'bg-red-500', 'bg-pink-500'
];

const getRandomBgColor = () => {
  return backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await getAllTask();
        if (res?.success) {
          const formattedTasks = res.data.map(task => ({
            ...task,
            id: task._id, // Use MongoDB _id as id
            bgColor: getRandomBgColor() // Assign random background color
          }));
          setTasks(formattedTasks);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchData();
  }, []);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: newTask._id, bgColor: getRandomBgColor() }]);
  };

  const updateTask = (taskId, updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updatedTask } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getTasksByDate = (date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.date).toDateString();
      const compareDate = new Date(date).toDateString();
      return taskDate === compareDate;
    });
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      deleteTask,
      getTasksByDate
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}; 
