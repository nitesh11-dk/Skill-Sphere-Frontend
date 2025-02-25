import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import AppContext from "../../context/AppContext";

const Booking = ({ user_skills, provider, onClose }) => {
  const { creatBooking} = useContext(AppContext);
  const skills = user_skills.map((s) => s.title);

  const timeSlots = {
    morning: "8:00-11:00",
    afternoon: "12:00-16:00",
    evening: "16:00-19:00", 
    night: "20:00-23:00"
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      provider,
      type: "requesting",
      skillsToLearn: "",
      availabilityDate: "",
      availabilityTime: "",
      isBarterExchange: false,
      inAvailabilityTime: true,
      barterSkill: ""
    }
  });

  const onSubmit = async (data) => {
    console.log(data)
    const response = await creatBooking(data);
    if (response?.success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg shadow-md w-full max-w-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <span className="text-2xl">&times;</span>
        </button>

        <h2 className="text-white text-2xl font-bold mb-6">Create Booking</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-lg mb-2">Skill to Learn:</label>
            <Controller
              name="skillsToLearn"
              control={control}
              rules={{ required: "Please select a skill" }}
              render={({ field }) => (
                <select
                  {...field}
                  className="block w-full text-lg p-2 bg-gray-700 text-white rounded-md"
                >
                  <option value="">Select a skill</option>
                  {skills.map((skill) => (
                    <option key={skill} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.skillsToLearn && (
              <p className="mt-2 text-sm text-red-500">{errors.skillsToLearn.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-300 text-lg mb-2">Availability Date:</label>
            <Controller
              name="availabilityDate"
              control={control}
              rules={{ required: "Availability date is required" }}
              render={({ field }) => (
                <input
                  type="date"
                  {...field}
                  min={new Date().toISOString().split("T")[0]} // Prevents past dates
                  className="block w-full text-lg p-2 bg-gray-700 text-white rounded-md"
                />
              )}
            />
            {errors.availabilityDate && (
              <p className="mt-2 text-sm text-red-500">{errors.availabilityDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-300 text-lg mb-2">Time Slot:</label>
            <Controller
              name="availabilityTime"
              control={control}
              rules={{ required: "Time slot is required" }}
              render={({ field }) => (
                <select
                  {...field}
                  className="block w-full text-lg p-2 bg-gray-700 text-white rounded-md"
                >
                  <option value="">Select a time slot</option>
                  {Object.entries(timeSlots).map(([key, value]) => (
                    <option key={key} value={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)} ({value})
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.availabilityTime && (
              <p className="mt-2 text-sm text-red-500">{errors.availabilityTime.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
