import supabase from "./supabase";

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

export async function getGuest(email: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export const createGuest = async (newGuest: {
  email: string;
  fullName: string;
}) => {
  const { data, error } = await supabase
    .from("guests")
    .insert([newGuest])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
};

export const getBookings = async (guestId: string) => {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      `id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins!bookings_cabinId_fkey(name, image)`
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.log(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
};

export async function deleteBooking(id: string) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
