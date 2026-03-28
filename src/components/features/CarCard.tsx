"use client";

import Link from "next/link";
import { Car as CarIcon, Fuel, Users, Settings, Calendar, CheckCircle } from "lucide-react";
import type { Car } from "@/types/Car";
import { formatCurrency } from "@/utils/formatters";
import Button from "@/components/ui/Button";

interface CarCardProps {
  car: Car;
  categoryName?: string;
  rentalDays?: number;
  onBook?: () => void;
}

const CarCard = ({ car, categoryName, rentalDays, onBook }: CarCardProps) => {
  const hasPeriod = typeof rentalDays === "number" && rentalDays > 0;
  const totalPrice = hasPeriod ? car.price * rentalDays : null;

  return (
    <Link href={`/car/${car.id}`} className="block group">
      <article className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
        {/* Image placeholder */}
        <div className="flex h-48 items-center justify-center bg-gray-100">
          <CarIcon className="h-20 w-20 text-gray-300" />
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900">
            {car.brand} {car.model}
          </h3>

          <div className="mt-1 flex items-center gap-2">
            {categoryName && (
              <span
                className={
                  "rounded-full px-2.5 py-0.5 text-xs font-semibold " +
                  (categoryName === "Budget"
                    ? "bg-yellow-100 text-yellow-800"
                    : categoryName === "Economy"
                      ? "bg-blue-100 text-blue-800"
                      : categoryName === "SUV"
                        ? "bg-green-100 text-green-800"
                        : categoryName === "Transport"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-700")
                }
              >
                {categoryName}
              </span>
            )}
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="h-3.5 w-3.5" /> {car.year}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Fuel className="h-4 w-4 text-amber-600" /> {car.fuel}
            </span>
            <span className="flex items-center gap-1">
              <Settings className="h-4 w-4 text-amber-600" /> {car.transmission}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4 text-amber-600" /> {car.seats} seats
            </span>
          </div>

          {car.description && (
            <p className="mt-3 text-sm text-gray-500 line-clamp-2">{car.description}</p>
          )}

          <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-3">
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(car.price)}</p>
              <p className="text-xs font-medium text-amber-600">
                From {formatCurrency(car.price)} / day
              </p>
              {hasPeriod && totalPrice !== null && (
                <p className="mt-1 text-sm font-semibold text-navy">
                  Total for {rentalDays} day{rentalDays === 1 ? "" : "s"}: {formatCurrency(totalPrice)}
                </p>
              )}
            </div>
            <span
              className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                car.status === "Available"
                  ? "bg-green-50 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {car.status === "Available" && <CheckCircle className="h-3.5 w-3.5" />}
              {car.status}
            </span>
          </div>

          {onBook && hasPeriod && (
            <div className="mt-4 border-t border-gray-100 pt-4">
              <Button
                type="button"
                className="w-full"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onBook();
                }}
                disabled={car.status !== "Available"}
              >
                {car.status === "Available" ? "Book" : "Not Available"}
              </Button>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default CarCard;
