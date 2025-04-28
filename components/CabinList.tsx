import React from "react";
import CabinCard from "./CabinCard";
import { getCabins } from "@/lib/apiCabins";
// import { unstable_noStore as noStore } from "next/cache";

const CabinList = async ({ filter }: { filter: string | string[] }) => {
  // noStore();
  const data = await getCabins();

  if (!data.length) return null;

  let displayCabins;
  if (filter === "all") {
    displayCabins = data;
  }

  if (filter === "small") {
    displayCabins = data.filter((el) => el.maxCapacity <= 3);
  }
  if (filter === "medium") {
    displayCabins = data.filter(
      (el) => el.maxCapacity >= 4 && el.maxCapacity <= 7
    );
  }
  if (filter === "large") {
    displayCabins = data.filter((el) => el.maxCapacity >= 8);
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg-gap-12 xl:gap-14">
      {displayCabins?.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
};

export default CabinList;
