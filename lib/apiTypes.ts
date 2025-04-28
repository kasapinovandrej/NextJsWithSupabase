export type CabinType = {
  id: string;
  created_at: Date;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
};

export type BookingType = {
  id: string;
  created_at: Date;
  startDate: Date;
  endDate: Date;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabins: CabinType;
  guestId: string;
};

export type GuestType = {
  id: string;
  created_at: Date;
  fullName: string;
  email: string;
  nationalID: string;
  nationality: string;
  countryFlag: string;
};

export type UserType = {
  email: string;
  name: string;
  image: string;
};
