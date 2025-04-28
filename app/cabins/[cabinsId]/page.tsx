import Cabin from "@/components/Cabin";
import Reservation from "@/components/Reservation";
import Spinner from "@/components/Spinner";
import { getCabin, getCabins } from "@/lib/apiCabins";
import React, { Suspense } from "react";

type SingleCabinParams = {
  params: Promise<{ cabinsId: string }>;
};

// export const metadata = {
//   title: "Cabin",
// };

export const generateStaticParams = async () => {
  const cabins = await getCabins();
  const ids = cabins.map((el) => ({ cabinId: el.id }));

  return ids;
};

export const generateMetadata = async ({ params }: SingleCabinParams) => {
  const { cabinsId } = await params;
  const { name } = await getCabin(cabinsId);

  return { title: `Cabin ${name}` };
};

const SingleCabin = async ({ params }: SingleCabinParams) => {
  const { cabinsId } = await params;
  const cabin = await getCabin(cabinsId);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(cabinsId);

  // const [cabin, settings, bookedDates] = await Promise.all([
  //   getCabin(cabinsId),
  //   getSettings(),
  //   getBookedDatesByCabinId(cabinsId),
  // ]);

  return (
    <>
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
      </div>
      <Suspense fallback={<Spinner />}>
        <Reservation cabin={cabin} />
      </Suspense>
    </>
  );
};

export default SingleCabin;
