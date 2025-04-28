import CabinList from "@/components/CabinList";
import Filter from "@/components/Filter";
import ReservationReminder from "@/components/ReservationReminder";
import Spinner from "@/components/Spinner";
import { Metadata } from "next";
import { Suspense } from "react";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Cabins",
};

const Cabins = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) => {
  const params = await searchParams;
  const filter = params?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-500 font-medium">
        Our Luxary Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine walking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub wnder the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      <Suspense
        fallback={<Spinner />}
        // key={filter}
      >
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
};

export default Cabins;
