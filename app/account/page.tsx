import { auth } from "@/lib/auth";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Guest area",
};

const AccountPage = async () => {
  const session = await auth();
  console.log(session);
  const firstName = session?.user?.name?.split(" ")[0];
  return <div>Welcome, {firstName}</div>;
};

export default AccountPage;
