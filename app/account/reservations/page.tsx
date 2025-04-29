import ReservationList from "@/components/ReservationList";
import { BookingType } from "@/lib/apiTypes";
import { auth } from "@/lib/auth";
import { getBookings } from "@/lib/data-service";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Reservations",
};

const Reservations = async () => {
  const session = await auth();

  const bookings = session?.user && (await getBookings(session.user.guestId!));

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings?.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
};

export default Reservations;
