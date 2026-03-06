"use client";

import type { CarFilters } from "@/types/Car";
import type { Category } from "@/types/Category";

interface FilterSidebarProps {
  filters: CarFilters;
  onFilterChange: (filters: CarFilters) => void;
  categories: Category[];
}

const FUEL_OPTIONS = ["Petrol", "Diesel", "Electric", "Hybrid"];
const TRANSMISSION_OPTIONS = ["Automatic", "Manual"];

const selectClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200";

const FilterSidebar = ({ filters, onFilterChange, categories }: FilterSidebarProps) => {
  const handleChange = (key: keyof CarFilters, value: string | number | undefined) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  return (
    <aside className="card space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-800">
          Clear all
        </button>
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
        <select
          value={filters.categoryId ?? ""}
          onChange={(e) =>
            handleChange("categoryId", e.target.value ? Number(e.target.value) : undefined)
          }
          className={selectClass}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Fuel */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Fuel Type</label>
        <select
          value={filters.fuel ?? ""}
          onChange={(e) => handleChange("fuel", e.target.value || undefined)}
          className={selectClass}
        >
          <option value="">All Fuel Types</option>
          {FUEL_OPTIONS.map((fuel) => (
            <option key={fuel} value={fuel}>
              {fuel}
            </option>
          ))}
        </select>
      </div>

      {/* Transmission */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Transmission</label>
        <select
          value={filters.transmission ?? ""}
          onChange={(e) => handleChange("transmission", e.target.value || undefined)}
          className={selectClass}
        >
          <option value="">All Transmissions</option>
          {TRANSMISSION_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Max Price */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Max Price ($/day)</label>
        <input
          type="number"
          value={filters.maxPrice ?? ""}
          onChange={(e) =>
            handleChange("maxPrice", e.target.value ? Number(e.target.value) : undefined)
          }
          placeholder="No limit"
          min={0}
          className={selectClass}
        />
      </div>
    </aside>
  );
};

export default FilterSidebar;
