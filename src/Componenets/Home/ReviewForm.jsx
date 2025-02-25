import React, { useState, useContext } from 'react';
import AppContext from '../../context/AppContext';

const ReviewForm = ({ userId, onClose, onReviewAdded }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [hover, setHover] = useState(0);
  const { addReview } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addReview({
        userId,
        rating: rating || 1,
        comment
      });
      
      if (response.success) {
        onReviewAdded();
        onClose();
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-700 p-6 rounded-lg w-96">
        <h2 className="text-white text-xl font-bold mb-4">Add Review</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="text-3xl focus:outline-none cursor-pointer"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  <span className={`${
                    (hover || rating) >= star 
                      ? 'text-yellow-400' 
                      : 'text-gray-400'
                  } transition-colors duration-200`}>
                    ★
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-gray-600 text-white rounded p-2"
              rows="4"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm; 