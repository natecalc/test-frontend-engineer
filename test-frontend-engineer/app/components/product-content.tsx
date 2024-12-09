"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { PaginationControls } from "./pagination-controls";
import { ProductCardList } from "./product-card-list";
import { Skeleton } from "./skeleton";
import { useProductList } from "../hooks/useProductList";
import { ascend, descend, filter, map, prop, sort, uniq } from "ramda";
import { ProductFilters } from "./product-filters";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import { HeartCrack } from "lucide-react";
import { Product } from "@/lib/types/products";

export const ProductContent = () => {
  const { productList, isLoading, isFetching } = useProductList();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "price-asc";
  const router = useRouter();

  if (isLoading || isFetching) {
    return (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-self-center items-center py-24 justify-items-center min-h-screen">
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="group h-60 w-48 rounded-none border-none" key={index}>
            <div className="h-2/3 items-center p-0">
              <Skeleton className="h-full w-full" />
            </div>
            <div className="h-1/3 p-2">
              <div className="flex w-full justify-between">
                <Skeleton className="mb-1 h-3 w-1/3" />
                <Skeleton className="mb-1 h-3 w-1/3" />
              </div>
              <Skeleton className="mb-1 h-3 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!productList) {
    return (
      <div className="grid min-h-screen items-center justify-items-center gap-16">
        <div className="flex flex-col items-center gap-4 text-destructive">
          <HeartCrack />
          <p>No products found. Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  const categories = uniq(
    map((product: Product) => product.category, productList)
  );

  let filteredProducts = productList;
  if (currentCategory !== "all") {
    filteredProducts = filter(
      (product) => product.category === currentCategory,
      productList
    );
  }

  filteredProducts =
    currentSort === "price-asc"
      ? sort(ascend(prop("price")), filteredProducts)
      : sort(descend(prop("price")), filteredProducts);

  const start = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedProducts = filteredProducts.slice(
    start,
    start + ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const handleCategoryChange = (category: string) => {
    router.push(`/?page=1&category=${category}&sort=${currentSort}`);
  };

  const handleSortChange = (sort: string) => {
    router.push(
      `/?page=${currentPage}&category=${currentCategory}&sort=${sort}`
    );
  };

  return (
    <div className="grid min-h-screen items-center justify-items-center gap-16 pb-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <ProductFilters
          categories={categories}
          selectedCategory={currentCategory}
          sortOrder={currentSort}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
        />
        <ProductCardList productList={paginatedProducts} />
        <PaginationControls totalPages={totalPages} currentPage={currentPage} />
      </main>
    </div>
  );
};
