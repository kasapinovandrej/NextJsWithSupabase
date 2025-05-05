"use client";

import React, { useOptimistic } from "react";
import { BookingType } from "@/lib/apiTypes";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "@/lib/actions";

const ReservationList = ({
  bookings,
}: {
  bookings: BookingType[] | undefined;
}) => {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings, bookingId) => {
      return currentBookings?.filter((el) => el.id !== bookingId);
    }
  );

  const handleDelete = async (bookingId: string) => {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  };

  return (
    <ul className="space-y-6">
      {optimisticBookings &&
        optimisticBookings.map((booking) => (
          <ReservationCard
            booking={booking}
            key={booking.id}
            onDelete={handleDelete}
          />
        ))}
    </ul>
  );
};

export default ReservationList;
