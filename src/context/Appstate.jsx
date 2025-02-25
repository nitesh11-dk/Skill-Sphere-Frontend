import { useEffect, useState } from "react";
import AppContext from "./AppContext";
import { toast } from "react-toastify";
import { apiCall, tokenManager } from "../utils/utils";


const Appstate = (props) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [reload1, setReload1] = useState(false);

  // Check for token on mount and reload to persist login state
  useEffect(() => {
    const savedToken = tokenManager.getToken();
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
    }
  }, [reload1]);

  //  User
  const logoutUser = () => {
    setToken(null);
    setIsLoggedIn(false);
    setReload1(!reload1);
    localStorage.removeItem("token");
    tokenManager.removeToken();
    toast.success("You have been logged out successfully."); // Use navigate instead of history
  };

  const loginUser = async (email, password) => {
    const response = await apiCall({
      method: 'post',
      endpoint: '/user/login',
      data: { email, password },
      successMessage: 'Login successful'
    });

    if (response.success) {
      const { token } = response.data;
      setToken(token);
      setIsLoggedIn(true);
      setReload1(!reload1);
      tokenManager.setToken(token);
      return true;
    }
    return false;
  };

  const registerUser = async (formData) => {
    const response = await apiCall({
      method: 'post',
      endpoint: '/user/register',
      data: formData,
      successMessage: 'Registration successful'
    });
    return response.success;
  };

  const updateProfile = async (formData) => {
    const response = await apiCall({
      method: 'post',
      endpoint: '/user/editUser',
      data: formData,
      requiresAuth: true,
      successMessage: 'Profile updated successfully'
    });

    if (response.success) {
      setUser(response.data.user);
    }
    return response.success;
  };

  const handleDeleteUser = async (userId) => {
    return await apiCall({
      method: 'delete',
      endpoint: `/user/${userId}`,
      requiresAuth: true,
      successMessage: 'User deleted successfully'
    });
  };

  const handleAddSkills = async (formData) => {
    return await apiCall({
      method: 'post',
      endpoint: '/skills/add',
      data: formData,
      requiresAuth: true,
      successMessage: 'Skills added successfully'
    });
  };




  const getAllUsers = async () => {
    const response = await apiCall({
      endpoint: '/user/',
      successMessage: null
    });
    return response.data;
  };

  const getUserById = async (id) => {
    const response = await apiCall({
      endpoint: `/user/${id}`,
      successMessage: null
    });
    return response.data;
  };

  const addReview = async (formData) => {
    return await apiCall({
      method: 'post',
      endpoint: '/review/add',
      data: formData,
      requiresAuth: true,
      successMessage: null
    });
  };

  const creatBooking = async (formData) => {
    return await apiCall({
      method: 'post',
      endpoint: '/bookings/create',
      data: formData,
      requiresAuth: true,
      successMessage: 'Booking created successfully'
    });
  };

  const reqestedBookings = async () => {
    const response = await apiCall({
      endpoint: '/bookings/requested',
      requiresAuth: true,
      successMessage: null
    });
    return response.data;
  };

  const offeringBookings = async () => {
    const response = await apiCall({
      endpoint: '/bookings/offering',
      requiresAuth: true,
      successMessage: null
    });
    return response.data;
  };

  const setBookingStatus = async (formData) => {
    const response = await apiCall({
      method: 'post',
      endpoint: '/bookings/respond',
      data: formData,
      requiresAuth: true,
      successMessage: 'Booking status updated successfully'
    });
    return response.data;
  };

  
  const createTask = async (formData) => {
    const response = await apiCall({
      method: 'post',
      endpoint: '/task/create',
      data: formData,
      requiresAuth: true,
      successMessage: 'Schedule created successfully'
    });
    return response.data;
  };

  
  // const scheduleBookingDate = async (formData) => {
  //   try {
  //     if (localStorage.getItem("token")) {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.post(
  //         `${BASE_URL}/bookings/scheduleBookingDate`,
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Auth: token,
  //           },
  //           withCredentials: true,
  //         }
  //       );

  //       // console.log("Response from adding skills:", response.data); // Added console log
  //       if (response.data.success) {
  //         toast.success(response.data.message);
  //         return response.data;
  //       } else {
  //         toast.error(response.data.message);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error adding skills: ", error);
  //     toast.error("An error occurre feteching the requeste bookings.");
  //   }
  // };
  return (
    <AppContext.Provider
      value={{
        token,
        isLoggedIn,
        loginUser,
        registerUser,
        logoutUser,
        user,
        // userProfile,
        handleAddSkills,
        getAllUsers,
        getUserById,
        addReview,
        creatBooking,
        reqestedBookings,
        offeringBookings,
        logoutUser,
        setBookingStatus,
        createTask
        // scheduleBookingDate,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default Appstate;
