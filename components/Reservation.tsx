import React from "react";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { CabinType } from "@/lib/apiTypes";
import { getBookedDatesByCabinId, getSettings } from "@/lib/apiCabins";
import { auth } from "@/lib/auth";
import LoginMessage from "./LoginMessage";

const Reservation = async ({ cabin }: { cabin: CabinType }) => {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const session = await auth();

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-f-[400px]">
      <DateSelector
        settings={settings}
        cabin={cabin}
        bookedDates={bookedDates}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
};

export default Reservation;
