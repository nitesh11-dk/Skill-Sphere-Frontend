import React, { useRef, useEffect } from 'react';

const TaskDetails = ({ task, onClose }) => {
  const detailsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!task) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div ref={detailsRef} className="bg-gray-900 p-8 rounded-xl shadow-2xl w-96 text-white relative border border-gray-700">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-500 transition"
        >
          <span className="text-3xl font-bold">×</span>
        </button>

        {/* Task Details */}
        <h3 className="text-3xl font-extrabold text-center text-blue-400 mb-6">Task Details</h3>
        <div className="space-y-6">
          <div>
            <p className="text-lg font-bold text-gray-400">Title:</p>
            <p className="text-xl font-semibold text-yellow-400">{task.title}</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-400">Description:</p>
            <p className="text-lg text-gray-300">{task.description || 'No description provided.'}</p>
          </div>
          <div className="flex justify-between text-lg font-medium text-green-400">
            <span className="font-bold text-gray-400">Date & Time:</span>
            <span>{new Date(task.date).toLocaleDateString()}  - {task.startTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
