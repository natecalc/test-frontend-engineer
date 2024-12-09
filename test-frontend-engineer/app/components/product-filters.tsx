"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/select";
import { ProductFiltersProps } from "../../lib/types/products";

export function ProductFilters({
  categories,
  selectedCategory,
  sortOrder,
  onCategoryChange,
  onSortChange,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:px-0 py-4 mb-8 sm:flex-row sm:items-center w-full md:justify-start">
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="sm:w-[180px] w-full">
          <SelectValue placeholder="Category capitalize">
            <p className="capitalize">{selectedCategory}</p>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category} className="capitalize">
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={sortOrder} onValueChange={onSortChange}>
        <SelectTrigger className="sm:w-[180px] w-full">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
