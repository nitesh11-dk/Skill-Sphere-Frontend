import React, { useState, useEffect, useContext} from 'react';
import { useForm } from 'react-hook-form';
import { FaTimes } from "react-icons/fa";
import AppContext from "../../context/AppContext";

const TaskForm = ({ booking, onClose }) => {
const { createTask } = useContext(AppContext);
  const timeSlots = {
    morning: "8:00-11:00",
    afternoon: "12:00-16:00",
    evening: "16:00-19:00", 
    night: "20:00-23:00"
  };

  const [isAvailable, setIsAvailable] = useState(true);

  const { 
    register, 
    handleSubmit, 
    setValue, 
    formState: { errors },
    watch 
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      date: booking.availabilityDate || '',
      startTime: '',
      duration: '30',
      meetingId: ''
    }
  });

  // Set initial values when availability changes
  useEffect(() => {
    if (isAvailable) {
      setValue('date', booking.availabilityDate);
      setValue('title',`${booking.skillsToLearn} - ${booking.barterSkill}`)
      if (booking.availabilityTime) {
        const [start] = timeSlots[booking.availabilityTime].split('-');
        setValue('startTime', start);
      }
    }
  }, [isAvailable, booking, setValue]);

  // Update date when availability changes
  useEffect(() => {
    if (isAvailable) {
      setValue('date', booking.availabilityDate);
    }
  }, [isAvailable]);

  const onSubmit = (data) => {
    data.booking_id = booking._id;
    let res = createTask(data);
    if(res){
      onClose();
    }
    console.log('Form submitted:', data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold text-white mb-6">Schedule Meeting</h2>
      {/*  Top  */}

        <div className="bg-gray-700 p-4 rounded-md mb-4">
          <div className="text-gray-300 mb-2">{booking.requester.fullName} Avaliable Time and Date :</div>
          
          <div className="text-white font-medium">
            {booking.availabilityTime && (
              <>
                {booking.availabilityTime.charAt(0).toUpperCase() + booking.availabilityTime.slice(1)} ({
                  (() => {
                    const [start, end] = timeSlots[booking.availabilityTime].split('-');
                    const formatTime = (time) => {
                      const [hours, minutes] = time.split(':');
                      const ampm = hours >= 12 ? 'PM' : 'AM';
                      const formattedHours = hours % 12 || 12;
                      return `${formattedHours}:${minutes}${ampm}`;
                    };
                    return `${formatTime(start)}-${formatTime(end)}`;
                  })()
                })
              </>
            )}
            <div>
              {booking.availabilityDate && new Date(booking.availabilityDate).toLocaleDateString()}
            </div>
          </div>
        </div>

        

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Availability Toggle */}
          <div className="bg-gray-700 p-4 rounded-md mb-4">
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={(e) => {
                  setIsAvailable(e.target.checked);
                  if (e.target.checked) {
                    setValue('date', booking.availabilityDate);
                  }
                }}
                className="mr-2"
              />
              Use Available Time Slot
            </label>
          </div>

          {/* Title */}
          <div>
            <label className="text-gray-300 block mb-1">Title</label>
            <input
              {...register("title", { 
                required: "Title is required",
                minLength: { value: 3, message: "Title must be at least 3 characters" },
                value: `${booking.skillsToLearn} - ${booking.skillsToExchange}`
              })}
              className="w-full bg-gray-600 text-white p-2 rounded"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">{errors.title.message}</span>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-300 block mb-1">Description</label>
            <textarea
              {...register("description", { 
                required: "Description is required",
                minLength: { value: 10, message: "Description must be at least 10 characters" }
              })}
              className="w-full bg-gray-600 text-white p-2 rounded"
              rows="3"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">{errors.description.message}</span>
            )}
          </div>

          {/* Date */}
          {!isAvailable && (
            <div>
              <label className="text-gray-300 block mb-1">Date</label>
              <input
                type="date"
                {...register("date", { 
                  required: "Date is required"
                })}
                className="w-full bg-gray-600 text-white p-2 rounded"
              />
              {errors.date && (
                <span className="text-red-500 text-sm">{errors.date.message}</span>
              )}
            </div>
          )}

          {/* Start Time */}
          <div>
            <label className="text-gray-300 block mb-1">Start Time</label>
            {isAvailable ? (
              <select
                {...register("startTime", {
                  required: "Start time is required"
                })}
                className="w-full bg-gray-600 text-white p-2 rounded"
              >
                {booking.availabilityTime && (() => {
                  const [start, end] = timeSlots[booking.availabilityTime].split('-');
                  const startHour = parseInt(start.split(':')[0]);
                  const endHour = parseInt(end.split(':')[0]);
                  const timeOptions = [];
                  
                  for(let hour = startHour; hour < endHour; hour++) {
                    const period = hour >= 12 ? 'PM' : 'AM';
                    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
                    
                    timeOptions.push(
                      <option key={`${hour}:00`} value={`${hour}:00`}>
                        {`${displayHour}:00 ${period}`}
                      </option>
                    );
                    timeOptions.push(
                      <option key={`${hour}:30`} value={`${hour}:30`}>
                        {`${displayHour}:30 ${period}`}
                      </option>
                    );
                  }
                  return timeOptions;
                })()}
              </select>
            ) : (
              <input
                type="time" 
                {...register("startTime", {
                  required: "Start time is required"
                })}
                className="w-full bg-gray-600 text-white p-2 rounded"
              />
            )}
            {errors.startTime && (
              <span className="text-red-500 text-sm">{errors.startTime.message}</span>
            )}
          </div>

          {/* Duration */}
          <div>
            <label className="text-gray-300 block mb-1">Duration (minutes)</label>
            <select
              {...register("duration", { required: "Duration is required" })}
              className="w-full bg-gray-600 text-white p-2 rounded"
            >
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">60 minutes</option>
            </select>
            {errors.duration && (
              <span className="text-red-500 text-sm">{errors.duration.message}</span>
            )}
          </div>

          {/* Meeting ID */}
          <div>
            <label className="text-gray-300 block mb-1">Meeting ID (Optional)</label>
            <input
              {...register("meetingId")}
              className="w-full bg-gray-600 text-white p-2 rounded"
              placeholder="Enter meeting ID if any"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-6"
          >
            Schedule Meeting
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;