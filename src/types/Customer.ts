import type { User } from "./User";

export interface CustomerProfile extends User {
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface UpdateCustomerPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
