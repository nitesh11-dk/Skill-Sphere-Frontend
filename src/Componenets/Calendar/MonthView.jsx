import React, { useState, useRef } from 'react';
import { useTaskContext } from '../../context/TaskContext';

const MonthView = ({ onDateClick, onTaskClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { getTasksByDate, deleteTask } = useTaskContext();
  const [hoveredTask, setHoveredTask] = useState(null);
  const hoverTimeoutRef = useRef(null);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = new Array(firstDayOfMonth).fill(null); // Ensure proper alignment

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    // Ensure full rows in the grid (optional for UI consistency)
    while (days.length % 7 !== 0) {
      days.push(null);
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const formatTime = (time) => {
    if (!time) return "No time";
    
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleDateClick = (day, e) => {
    if (!day) return;
    
    const selectedDate = new Date(day);
    selectedDate.setHours(10, 0, 0, 0);
    
    onDateClick(selectedDate, e);
  };

  const handleTaskHover = (e, task, isEnter) => {
    e.stopPropagation();
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (isEnter) {
      const taskElement = e.currentTarget;
      const rect = taskElement.getBoundingClientRect();
      const tooltipWidth = 192;
      
      let left = rect.left;
      let top = rect.bottom + 4;
      
      if (left + tooltipWidth > window.innerWidth) {
        left = window.innerWidth - tooltipWidth - 16;
      }
      
      const tooltipHeight = 150;
      if (top + tooltipHeight > window.innerHeight) {
        top = rect.top - tooltipHeight - 4;
      }
      
      taskElement.style.zIndex = '50';
      setHoveredTask({
        id: task.id,
        position: { left, top }
      });
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        e.currentTarget.style.zIndex = '';
        setHoveredTask(null);
      }, 50);
    }
  };

  const handleTooltipHover = (isEnter) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    if (!isEnter) {
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredTask(null);
      }, 50);
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="space-x-2">
          <button
            onClick={handlePrevMonth}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            ←
          </button>
          <button
            onClick={handleNextMonth}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map(day => (
          <div key={day} className="text-center py-2 text-gray-400 font-medium">
            {day}
          </div>
        ))}
        
        {days.map((day, index) => (
          <div
            key={index}
            className={`min-h-[100px] p-1 border border-gray-800 ${
              day ? 'cursor-pointer hover:bg-gray-800' : 'bg-gray-900'
            }`}
            onClick={(e) => handleDateClick(day, e)}
          >
            {day && (
              <>
                <div className={`text-sm ${
                  day.toDateString() === new Date().toDateString()
                    ? 'text-blue-400 font-bold'
                    : 'text-gray-400'
                }`}>
                  {day.getDate()}
                </div>
                <div className="mt-1">
                  {getTasksByDate(day).map(task => (
                    <div
                      key={task.id}
                      className={`relative group cursor-pointer ${task.bgColor} text-white text-xs p-1 mb-1 rounded hover:ring-2 hover:ring-white hover:shadow-lg transition-all duration-150`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onTaskClick(task, e);
                      }}
                      onMouseEnter={(e) => handleTaskHover(e, task, true)}
                      onMouseLeave={(e) => handleTaskHover(e, task, false)}
                    >
                      <div className="truncate">
                        {task.time ? formatTime(task.time) : "No time"} {task.title}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {hoveredTask && (
        <div 
          className="fixed bg-gray-800 text-white p-2 rounded shadow-lg z-[100] w-48"
          style={{
            left: `${hoveredTask.position.left}px`,
            top: `${hoveredTask.position.top}px`
          }}
          onMouseEnter={() => handleTooltipHover(true)}
          onMouseLeave={() => handleTooltipHover(false)}
        >
          {(() => {
            const task = days.reduce((found, day) => 
              found || (day && getTasksByDate(day).find(t => t.id === hoveredTask.id)), null);
            
            return task ? (
              <>
                <div className="font-medium mb-1">{task.title}</div>
                <div className="text-gray-300 text-xs mb-2">{task.description}</div>
                <div className="text-gray-300 text-xs">{task.time ? formatTime(task.time) : "No time"}</div>
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTaskClick(task, e);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
};

export default MonthView;
