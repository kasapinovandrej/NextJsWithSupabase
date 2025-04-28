import { getBookedDatesByCabinId, getCabin } from "@/lib/apiCabins";

export const GET = async (req: any, { params }: any) => {
  const { cabinId } = await params;
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Cabin not found" });
  }
};

// export const POST = async () => {};
