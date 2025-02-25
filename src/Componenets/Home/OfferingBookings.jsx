import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import BookingCard from "./BookingCard";


const OfferingBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { offeringBookings, setBookingStatus } = useContext(AppContext);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const response = await offeringBookings();
        if (response?.data) {
          setBookings(response.data);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [offeringBookings]);

  const handleStatusChange = async (bookingId, action, barterSkill = null) => {
    console.log('Status Change:', { action, bookingId, barterSkill }); // Debug log
    const response = await setBookingStatus({ 
      bookingId, 
      action,
      barterSkill: action === "accept" ? barterSkill : null 
    });
    
    if (response?.success) {
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === bookingId
            ? { ...booking, status: action, barterSkill: barterSkill }
            : booking
        )
      );
    }
  };

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
      <h1 className="text-2xl font-bold text-white mb-6">Offering Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export default OfferingBookings;
