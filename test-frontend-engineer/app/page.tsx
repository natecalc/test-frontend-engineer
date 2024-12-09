"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { PaginationControls } from "./components/pagination-controls";
import { ProductCardList } from "./components/product-card-list";
import { Skeleton } from "./components/skeleton";
import { useProductList } from "./hooks/useProductList";
import { ascend, descend, filter, map, prop, sort, uniq } from "ramda";
import { ProductFilters } from "./components/product-filters";
import { Product } from "../lib/types/products";
import { ITEMS_PER_PAGE } from "@/lib/constants";

export default function Home() {
  const { productList, isLoading, isFetching } = useProductList();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "price-asc";
  const router = useRouter();

  // TODO finish loading state
  if (isLoading || isFetching) {
    return (
      <div className="grid min-h-screen grid-cols-1 place-items-center gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="group h-80 w-72 rounded-none border-none" key={index}>
            <div className="h-2/3 items-center p-0">
              <Skeleton className="h-full w-full" />
            </div>
            <div className="h-1/3 p-4">
              <div className="flex w-full justify-between">
                <Skeleton className="mb-2 h-4 w-1/3" />
                <Skeleton className="mb-2 h-4 w-1/3" />
              </div>
              <Skeleton className="mb-2 h-4 w-2/3" />
              <Skeleton className="h-6 w-1/2" />
            </div>
            <div className="p-4 pt-0">
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // TODO finish error state
  if (!productList) {
    return (
      <div className="grid min-h-screen items-center justify-items-center gap-16">
        <p>No products found</p>
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
}
