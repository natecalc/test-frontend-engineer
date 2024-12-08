'use client'
import { useQuery } from '@tanstack/react-query'
import getProductList from '../api/product-list'
import { Product } from '../types/products'

export const useProductList = () => {
  const { data: productList, ...helpers } = useQuery<Product[]>({
    queryKey: ['productList'],
    queryFn: getProductList,
    staleTime: 1000 * 60 * 5,
  })

  return { productList, ...helpers }
}
