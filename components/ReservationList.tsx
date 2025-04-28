"use client";

import React from "react";
import { BookingType } from "@/lib/apiTypes";
import ReservationCard from "./ReservationCard";
import { deleteBooking } from "@/lib/data-service";

const ReservationList = ({
  bookings,
}: {
  bookings: BookingType[] | undefined;
}) => {
  const handleDelete = async (bookingId: string) => {
    await deleteBooking(bookingId);
  };

  return (
    <ul className="space-y-6">
      {bookings &&
        bookings.map((booking) => (
          <ReservationCard
            booking={booking}
            onDelete={handleDelete}
            key={booking.id}
          />
        ))}
    </ul>
  );
};

export default ReservationList;
