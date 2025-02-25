import React, { useState } from "react";
import { FaUser, FaExchangeAlt, FaBookReader, FaClock, FaGraduationCap } from "react-icons/fa";
import TaskForm from './TaskForm';

const StatusBadge = ({ status }) => {
  const colors = {
    pending: "bg-yellow-500",
    accept: "bg-green-500",
    reject: "bg-red-500"
  };

  return (
    <span className={`${colors[status]} text-white px-3 py-1 rounded-full text-sm font-medium`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const BookingCard = ({ booking, onStatusChange }) => {
  const [showBarterSelect, setShowBarterSelect] = useState(false);
  const [selectedBarterSkill, setSelectedBarterSkill] = useState("");
  const [showTaskForm, setShowTaskForm] = useState(false);

  const handleStatusSelect = (e) => {
    const action = e.target.value;
    if (action === "accept") {
      setShowBarterSelect(true);
    } else if (action === "reject") {
      onStatusChange(booking._id, "reject");
    }
  };

  const handleConfirmBooking = () => {
    onStatusChange(booking._id, "accept", selectedBarterSkill);
    setShowBarterSelect(false);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-colors duration-200">
      {showTaskForm && (
        <TaskForm
          booking={booking}
          onClose={() => setShowTaskForm(false)}
        />
      )}
      
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-white capitalize">
            {booking.type} Session
          </h3>
          <StatusBadge status={booking.status} />
        </div>


        {booking.status === "pending" && !showBarterSelect && (
          <div className="flex items-center space-x-2">
            <select
              value={booking.status}
              onChange={handleStatusSelect}
              className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="pending">Select</option>
              <option value="accept">Accept</option>
              <option value="reject">Reject</option>
            </select>
          </div>
        )}

        {/* Barter Skill Selection */}
        {showBarterSelect && (
          <div className="space-y-3 bg-gray-700 p-4 rounded-md">
            <label className="block text-gray-300">Select Barter Skill:</label>
            <select
              value={selectedBarterSkill}
              onChange={(e) => setSelectedBarterSkill(e.target.value)}
              className="w-full bg-gray-600 text-white border border-gray-500 rounded-md px-3 py-2"
            >
              <option value="">Choose a skill</option>
              {booking.barterSkillOptions?.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2 mt-3">
              <button
                onClick={() => setShowBarterSelect(false)}
                className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                disabled={!selectedBarterSkill}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm
              </button>
            </div>
          </div>
        )}

        {/* Booking Details */}
        <div className="space-y-3">
          <div className="flex items-center text-gray-300">
            <FaUser className="w-5 h-5 mr-2" />
            <div>
              <p className="text-sm text-gray-400">Provider</p>
              <p className="text-white">{booking.provider.fullName}</p>
            </div>
          </div>

          <div className="flex items-center text-gray-300">
            <FaBookReader className="w-5 h-5 mr-2" />
            <div>
              <p className="text-sm text-gray-400">Requester</p>
              <p className="text-white">{booking.requester.fullName}</p>
            </div>
          </div>

          <div className="flex items-center text-gray-300">
            <FaGraduationCap className="w-5 h-5 mr-2" />
            <div>
              <p className="text-sm text-gray-400">Skills to Learn</p>
              <p className="text-white">{booking.skillsToLearn}</p>
            </div>
          </div>


          {booking.barterSkill && (
            <div className="flex items-center text-gray-300">
              <FaExchangeAlt className="w-5 h-5 mr-2" />
              <div>
                <p className="text-sm text-gray-400">Selected Barter Skill</p>
                <p className="text-white">{booking.barterSkill}</p>
              </div>
            </div>
          )}
          
        {booking.status == "accepted" && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <button
              onClick={() => setShowTaskForm(true)}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 
                transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <FaClock className="w-4 h-4" />
              <span>Schedule Lecture</span>
            </button>
          </div>
        )}
  
         
        </div>
      </div>
    </div>
  );
};

export default BookingCard; 