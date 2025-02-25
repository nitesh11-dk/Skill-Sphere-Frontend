import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock, FaUserCircle } from "react-icons/fa";

const FormInput = ({ label, icon: Icon, error, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        className={`w-full pl-10 pr-3 py-2 rounded-md bg-gray-700 text-white border 
          ${error ? 'border-red-500' : 'border-gray-600'} 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        {...props}
      />
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-500">
        {error.message}
      </p>
    )}
  </div>
);

const UserForm = ({ initialData, onSubmit: submitHandler, buttonText }) => {
  const navigate = useNavigate();
  const isRegister = buttonText === "Register";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: initialData
  });

  const onSubmit = async (data) => {
    const success = await submitHandler(data);
    if (success) {
      if (isRegister) {
        navigate("/login");
      } else {
        navigate("/profile");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">
              {isRegister ? "Create Account" : "Edit Profile"}
            </h2>
            {isRegister && (
              <p className="mt-2 text-gray-400">
                Please fill in the information below
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              label="Username"
              type="text"
              icon={FaUser}
              error={errors.username}
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters"
                }
              })}
            />

            <FormInput
              label="Full Name"
              type="text"
              icon={FaUserCircle}
              error={errors.fullName}
              {...register("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Full name must be at least 2 characters"
                }
              })}
            />

            <FormInput
              label="Email Address"
              type="email"
              icon={FaEnvelope}
              error={errors.email}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />

            <FormInput
              label="Password"
              type="password"
              icon={FaLock}
              error={errors.password}
              {...register("password", {
                ...(isRegister && {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })
              })}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md
                transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : buttonText}
            </button>

            {isRegister && (
              <p className="text-center text-gray-400">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  Sign in
                </Link>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
