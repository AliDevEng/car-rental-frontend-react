"use client";

import Link from "next/link";
import { Folder } from "lucide-react";
import type { Category } from "@/types/Category";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link href={`/cars?category=${category.id}`} className="block">
      <article className="card hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-100 p-3">
            <Folder className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{category.name}</h3>
            <p className="text-sm text-gray-500">
              {category.cars.length} {category.cars.length === 1 ? "car" : "cars"} available
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CategoryCard;
