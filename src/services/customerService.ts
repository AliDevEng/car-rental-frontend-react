import api from "./api";
import type { CustomerProfile, UpdateCustomerPayload } from "@/types/Customer";
import type { User } from "@/types/User";

interface ApiCustomer {
  id?: number;
  email?: string;
  firstName?: string;
  first_name?: string;
  lastName?: string;
  last_name?: string;
  role?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  postal_code?: string;
  country?: string;
}

const normalizeRole = (role?: string): User["role"] =>
  role?.toLowerCase() === "admin" ? "admin" : "customer";

const normalizeCustomer = (customer: ApiCustomer): CustomerProfile => ({
  id: customer.id ?? 0,
  email: customer.email ?? "",
  firstName: customer.firstName ?? customer.first_name ?? "",
  lastName: customer.lastName ?? customer.last_name ?? "",
  role: normalizeRole(customer.role),
  phone: customer.phone ?? "",
  address: customer.address ?? "",
  city: customer.city ?? "",
  postalCode: customer.postalCode ?? customer.postal_code ?? "",
  country: customer.country ?? "",
});

export const customerService = {
  async getById(id: number): Promise<CustomerProfile> {
    const response = await api.get<ApiCustomer>(`/customers/${id}`);
    return normalizeCustomer(response.data);
  },

  async updateById(id: number, payload: UpdateCustomerPayload): Promise<CustomerProfile> {
    const response = await api.put<ApiCustomer>(`/customers/${id}`, payload);
    return normalizeCustomer(response.data);
  },
};
