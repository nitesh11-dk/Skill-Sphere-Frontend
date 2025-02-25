import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AppContext from "../../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AppContext);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data) => {
    const success = await loginUser(data.email, data.password);
    if (success) {
      navigate("/select-skills");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  required: "Password is required"
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
              Login
            </button>

            <p className="text-center text-gray-400 mt-4">
              Don't have an account?{" "}
              <Link 
                to="/register" 
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
