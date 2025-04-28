"use client";
import { updateGuest } from "@/lib/actions";
import { GuestType } from "@/lib/apiTypes";
import React, { ReactNode, useState } from "react";
import SubmitButton from "./SubmitButton";
import Image from "next/image";
import { useFormStatus } from "react-dom";

type UpdateProfileFormProps = {
  guest: GuestType;
  children: ReactNode;
};

const UpdateProfileForm = ({ guest, children }: UpdateProfileFormProps) => {
  // const [count, setCount] = useState();
  const { fullName, email, nationality, nationalID, countryFlag } = guest;

  return (
    <form
      action={updateGuest}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          readOnly
          defaultValue={fullName}
          name="fullName"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm read-only:cursor-not-allowed read-only:bg-gray-600 read-only:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          readOnly
          defaultValue={email}
          name="email"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm read-only:cursor-not-allowed read-only:bg-gray-600 read-only:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <div className="relative w-8 h-5">
            <Image
              src={countryFlag}
              alt="Country flag"
              className="h-5 rounded-sm"
              fill
            />
          </div>
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={nationalID}
          name="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel="Updating...">Update profile</SubmitButton>
      </div>
    </form>
  );
};

export default UpdateProfileForm;
