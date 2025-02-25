import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import UserForm from "./Form";

const EditUser = () => {
  const { updateProfile, user } = useContext(AppContext);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-gray-400 text-xl">Loading user profile...</p>
      </div>
    );
  }

  const initialData = {
    fullName: user.fullName || "",
    email: user.email || "",
    username: user.username || "",
    password: ""
  };

  return (
    <UserForm
      initialData={initialData}
      onSubmit={updateProfile}
      buttonText="Update Profile"
    />
  );
};

export default EditUser;
