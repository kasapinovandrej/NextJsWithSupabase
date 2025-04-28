import { notFound } from "next/navigation";
import supabase from "./supabase";
import { eachDayOfInterval } from "date-fns";

export const getCabins = async () => {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .order("name");

  // await new Promise((resolve) => {
  //   setTimeout(resolve, 2000);
  // });

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
};

export const getCabin = async (id: string) => {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    notFound();
    // throw new Error("Cabins could not be loaded");
  }
  return data;
};

export const getSettings = async () => {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.log(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
};

export const getBookedDatesByCabinId = async (cabinId: string) => {
  let today: Date | string = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
};
