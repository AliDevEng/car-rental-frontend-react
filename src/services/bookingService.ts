import api from "./api";
import type { Booking } from "@/types/Booking";

interface ApiRentalCar {
  id?: number;
  brand?: string;
  model?: string;
  regNr?: string;
  registrationNumber?: string;
}

interface ApiRental {
  id?: number;
  customerId?: number;
  customer_id?: number;
  carId?: number;
  car_id?: number;
  rentalDate?: string;
  rental_date?: string;
  startDate?: string;
  start_date?: string;
  endDate?: string;
  end_date?: string;
  bookingNumber?: string;
  booking_number?: string;
  status?: string;
  totalPrice?: number;
  total_price?: number;
  carBrand?: string;
  car_brand?: string;
  carModel?: string;
  car_model?: string;
  carRegNr?: string;
  car_reg_nr?: string;
  registrationNumber?: string;
  car?: ApiRentalCar;
}

interface ApiRentalsResponse {
  items?: ApiRental[];
  rentals?: ApiRental[];
}

const normalizeBooking = (rental: ApiRental): Booking => ({
  id: rental.id ?? 0,
  customerId: rental.customerId ?? rental.customer_id ?? 0,
  carId: rental.carId ?? rental.car_id ?? rental.car?.id ?? 0,
  rentalDate:
    rental.rentalDate ?? rental.rental_date ?? rental.startDate ?? rental.start_date ?? "",
  startDate: rental.startDate ?? rental.start_date ?? "",
  endDate: rental.endDate ?? rental.end_date ?? "",
  bookingNumber: rental.bookingNumber ?? rental.booking_number ?? `BOOK-${rental.id ?? "N/A"}`,
  status: (rental.status?.toUpperCase() as Booking["status"]) ?? "PENDING",
  totalPrice: rental.totalPrice ?? rental.total_price ?? 0,
  carBrand: rental.carBrand ?? rental.car_brand ?? rental.car?.brand ?? "",
  carModel: rental.carModel ?? rental.car_model ?? rental.car?.model ?? "",
  carRegNr:
    rental.carRegNr ??
    rental.car_reg_nr ??
    rental.registrationNumber ??
    rental.car?.regNr ??
    rental.car?.registrationNumber ??
    "",
});

const mapRentalsResponse = (data: ApiRental[] | ApiRentalsResponse): Booking[] => {
  if (Array.isArray(data)) {
    return data.map(normalizeBooking);
  }

  const items = data.items ?? data.rentals ?? [];
  return items.map(normalizeBooking);
};

export const bookingService = {
  async getMyBookings(): Promise<Booking[]> {
    const response = await api.get<ApiRental[] | ApiRentalsResponse>("/rentals/my");
    return mapRentalsResponse(response.data);
  },

  async cancelBooking(id: number): Promise<Booking> {
    const response = await api.put<ApiRental>(`/rentals/${id}/cancel`);
    return normalizeBooking(response.data);
  },
};
