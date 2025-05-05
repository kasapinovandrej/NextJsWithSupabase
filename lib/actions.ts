"use server";

import { revalidatePath } from "next/cache";
import supabase from "./supabase";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";

export async function createBooking(bookingData: any, formData: FormData) {
  console.log(bookingData);
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session?.user?.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
    // id: bookingData.cabinId,
  };

  const { error } = await supabase
    .from("bookings")
    .insert([newBooking])
    .select();

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/account/reservations");
}

export const signInAction = async () => {
  await signIn("google", { redirectTo: "/account" });
};

export const signOutAction = async () => {
  await signOut({ redirectTo: "/" });
};

export const updateGuest = async (formData: FormData) => {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData
    .get("nationality")
    ?.toString()!
    .split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID!.toString()))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user!.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
};

export const deleteReservation = async (bookingId: string) => {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // OVAKO STITIM DA NE AUTENTIFIKOVANI USER MOZE DA BRISE BOOKINGS U TERMINALU
  const guestBookings = await getBookings(session?.user?.guestId);
  const guestBookingIds = guestBookings.map((el) => el.id);
  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You are not allowed to delete this booking");
  }
  // ////////////////////////////////////////////////////////////////////////////
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);
  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
};

export const updateReservation = async (formData: FormData) => {
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     return resolve;
  //   }, 2000);
  // });
  const id = Number(formData.get("id"));
  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 2) Authorization
  // OVAKO STITIM DA NE AUTENTIFIKOVANI USER MOZE DA BRISE BOOKINGS U TERMINALU
  const guestBookings = await getBookings(session?.user?.guestId);
  const guestBookingIds = guestBookings.map((el) => el.id);

  if (!guestBookingIds.includes(id)) {
    throw new Error("You are not allowed to update this booking");
  }
  // ////////////////////////////////////////////////////////////////////////////
  // 3) Building update data

  const updateData = {
    observations: formData.get("observations")?.slice(0, 1000),
    numGuests: Number(formData.get("numGuests")),
  };

  // 4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();
  // 5) Error handleing
  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  // 7) Revalidation
  revalidatePath("/account/reservations");
  // 6) Redirecting
  redirect("/account/reservations");
};
