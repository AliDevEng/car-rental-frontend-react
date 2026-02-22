export interface Booking {
  id: number;
  customerId: number;
  carId: number;
  rentalDate: string;
  startDate: string;
  endDate: string;
  bookingNumber: string;
  status: "PENDING" | "ACTIVE" | "COMPLETED" | "CANCELLED";
  totalPrice: number;
}
