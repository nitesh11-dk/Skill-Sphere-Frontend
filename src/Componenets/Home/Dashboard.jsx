import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";

const AVATAR_COLORS = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33"];

const UserCard = ({ user, colorIndex }) => (
  <Link 
    to={`/home/user/${user._id}`}
    className="block transition-transform duration-200 hover:scale-102"
  >
    <div className="flex items-center justify-between bg-gray-700 p-6 rounded-md hover:bg-gray-600 transition-colors duration-200">
      <div className="flex items-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ backgroundColor: AVATAR_COLORS[colorIndex % AVATAR_COLORS.length] }}
        >
          <span className="text-white text-xl font-bold">
            {user.fullName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="ml-4">
          <h3 className="text-white text-xl font-semibold">{user.fullName}</h3>
          <p className="text-gray-400">{user.email}</p>
          {user.skills?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {user.skills.slice(0, 3).map(skill => (
                <span 
                  key={skill._id}
                  className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                >
                  {skill.title}
                </span>
              ))}
              {user.skills.length > 3 && (
                <span className="text-xs text-gray-400">
                  +{user.skills.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  </Link>
);

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getAllUsers } = useContext(AppContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await getAllUsers();
        if (response?.success) {
          setUsers(response.data);
          console.log(response.data);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [getAllUsers]);

  if (isLoading) {
    return (
      <div className="bg-gray-800 p-8 rounded-lg min-h-screen flex items-center justify-center">
        <div className="text-gray-400 text-xl">Loading users...</div>
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="bg-gray-800 p-8 rounded-lg min-h-screen flex items-center justify-center">
        <div className="text-gray-400 text-xl">No users found</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-8 rounded-lg">
      <h2 className="text-white text-2xl font-bold mb-6">Available Mentors</h2>
      <div className="space-y-4">
        {users.map((user, index) => (
          <UserCard key={user._id} user={user} colorIndex={index} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
