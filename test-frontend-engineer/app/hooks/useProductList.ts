"use client";
import { useQuery } from "@tanstack/react-query";
import getProductList from "../api/product-list";
import { Product } from "../../lib/types/products";
import { indexBy } from "ramda";

export const useProductList = () => {
  const { data: productList, ...helpers } = useQuery<Product[]>({
    queryKey: ["productList"],
    queryFn: getProductList,
    staleTime: 1000 * 60 * 5,
  });

  return {
    productList,
    productsById: indexBy((p) => p.id, productList ?? []),
    ...helpers,
  };
};
