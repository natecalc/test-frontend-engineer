export type Rating = {
  rate: number;
  count: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
  quantity?: number;
};

export type ProductFiltersProps = {
  categories: string[];
  selectedCategory: string;
  sortOrder: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (order: string) => void;
};

export type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
};
