import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import BookingCard from "./BookingCard";



const RequestedBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { reqestedBookings } = useContext(AppContext);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const response = await reqestedBookings();
        if (response?.data) {
          console.log(response)
          setBookings(response.data);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [reqestedBookings]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-gray-400 text-xl">Loading bookings...</p>
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-gray-400 text-xl">No bookings found</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900">
      <h1 className="text-2xl font-bold text-white mb-6">Requested Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} canChangeStatus={false} />
        ))}
      </div>
    </div>
  );
};

export default RequestedBookings;
