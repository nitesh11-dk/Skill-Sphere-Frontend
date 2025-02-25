import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import Booking from "./Booking";
import SkillsTemplate from '../SkillsTemplate';
import ReviewForm from './ReviewForm';

const SkillsCard = ({ skills, onEditClick, isEditing, onSkillsUpdate }) => {

  return (
    <div className="relative bg-gray-700 p-4 rounded-md">
      {isEditing && (
        <div className="absolute -top-4 right-0">
        <SkillsTemplate 
        initialSkills={skills}
        isEditMode={true}
        onSuccess={onSkillsUpdate}
        onCancel={() => onEditClick(false)}
      />
      </div>
      )
}

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-xl font-bold">Skills</h3>
        <button
          onClick={() => onEditClick(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 
            rounded-md text-sm transition-colors duration-200"
        >
          Edit Skills
        </button>
      </div>

      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill._id}
              className="bg-zinc-600 px-3 py-1 rounded-md text-yellow-400"
            >
              {skill.title}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No skills available.</p>
      )}
    </div>
  );
};

const UserDetails = () => {
  const { id } = useParams();
  const { getUserById } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const userData = await getUserById(id);
      setUser(userData.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [id]);

  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          <span key={index} className="text-yellow-400">★</span>
        ))}
        {halfStar && <span className="text-yellow-400">☆</span>}
      </div>
    );
  };

  const handleSkillsUpdate = async () => {
    setIsEditingSkills(false);
    await fetchUser();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-800">
        <p className="text-gray-400 text-xl">Loading user details...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-800">
        <p className="text-gray-400 text-xl">User not found</p>
      </div>
    );
  }

  const averageRating = user.reviews.length > 0
    ? user.reviews.reduce((acc, review) => acc + review.rating, 0) / user.reviews.length
    : 0;

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Information Section */}
        <div className="p-4 bg-gray-700 rounded-md">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold text-5xl">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
            <div className="ml-4">
              <p className="text-white uppercase text-lg font-bold">{user.fullName}</p>
              <p className="text-gray-300 text-md">{user.username}</p>
              <p className="text-gray-300">{user.email}</p>
            </div>
          </div>
          <button
            className="w-full bg-blue-500 text-white text-lg py-2 px-4 rounded-md 
              hover:bg-blue-600 transition-colors duration-200"
            onClick={() => setShowBookingForm(true)}
          >
            Learn
          </button>
        </div>

        {/* Skills and Rating Card */}
        <div className="bg-gray-700 p-4 rounded-md">
          <SkillsCard
            skills={user.skills}
            onEditClick={setIsEditingSkills}
            isEditing={isEditingSkills}
            onSkillsUpdate={handleSkillsUpdate}
          />
          <h3 className="text-white text-xl font-bold mt-6 mb-2">Overall Rating</h3>
          <div className="text-yellow-400 text-xl">
            {renderRating(averageRating)}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-xl font-bold">Reviews ({user.reviews.length})</h3>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 
                rounded-md text-sm transition-colors duration-200"
              onClick={() => setShowReviewForm(true)}
            >
              Add Review
            </button>
          </div>

          <div className="space-y-4">
            {user.reviews.length > 0 ? (
              user.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-700 p-4 rounded-md flex items-start"
                >
                  <div className="w-10 h-10 bg-green-500 text-white flex items-center justify-center rounded-full font-bold text-lg mr-4">
                    {review.reviewer.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-gray-300 font-bold">{review.reviewer}</p>
                    <div className="my-1">{renderRating(review.rating)}</div>
                    <p className="text-gray-300">{review.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No reviews available.</p>
            )}
          </div>
        </div>
      </div>

      {showBookingForm && (
        <Booking
          user_skills={user.skills}
          provider={id}
          onClose={() => setShowBookingForm(false)}
        />
      )}

      {showReviewForm && (
        <ReviewForm
          userId={id}
          onClose={() => setShowReviewForm(false)}
          onReviewAdded={fetchUser}
        />
      )}
    </div>
  );
};

export default UserDetails;
