"use server";

import { revalidatePath } from "next/cache";
import supabase from "./supabase";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "./auth";

export async function createBooking(bookingData: any, formData: FormData) {
  // const session = await auth();
  // if (!session) throw new Error("You must be logged in");

  // const newBooking = {
  //   ...bookingData,
  //   guestId: session.user.guestId,
  //   numGuests: Number(formData.get("numGuests")),
  //   observations: formData.get("observations").slice(0, 1000),
  //   extrasPrice: 0,
  //   totalPrice: bookingData.cabinPrice,
  //   isPaid: false,
  //   hasBreakfast: false,
  //   status: "unconfirmed",
  // };

  // const { error } = await supabase.from("bookings").insert([newBooking]);

  // if (error) throw new Error("Booking could not be created");

  // revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
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
  console.log(updateData);

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user!.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
};
