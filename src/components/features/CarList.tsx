import type { Car } from "@/types/Car";
import CarCard from "./CarCard";

interface CarListProps {
  cars: Car[];
  loading: boolean;
  error: string | null;
}

const CarList = ({ cars, loading, error }: CarListProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Loading cars...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="rounded-lg bg-gray-50 p-6 text-center">
        <p className="text-gray-500">No cars found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} categoryName={car.categoryName} />
      ))}
    </div>
  );
};

export default CarList;
