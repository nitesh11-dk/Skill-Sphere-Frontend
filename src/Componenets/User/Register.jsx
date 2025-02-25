import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AppContext from "../../context/AppContext";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      username: ""
    }
  });

  const onSubmit = async (data) => {
    const success = await registerUser(data);
    if (success) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Register</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Username
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 rounded-md bg-gray-700 text-white border 
                  ${errors.username ? 'border-red-500' : 'border-gray-600'} 
                  focus:outline-none focus:ring-2 focus:ring-blue-500`}
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters"
                  }
                })}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 rounded-md bg-gray-700 text-white border 
                  ${errors.fullName ? 'border-red-500' : 'border-gray-600'} 
                  focus:outline-none focus:ring-2 focus:ring-blue-500`}
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Full name must be at least 2 characters"
                  }
                })}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className={`w-full px-3 py-2 rounded-md bg-gray-700 text-white border 
                  ${errors.email ? 'border-red-500' : 'border-gray-600'} 
                  focus:outline-none focus:ring-2 focus:ring-blue-500`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                className={`w-full px-3 py-2 rounded-md bg-gray-700 text-white border 
                  ${errors.password ? 'border-red-500' : 'border-gray-600'} 
                  focus:outline-none focus:ring-2 focus:ring-blue-500`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md
                transition-colors duration-200"
            >
              Register
            </button>

            <p className="text-center text-gray-400 mt-4">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
