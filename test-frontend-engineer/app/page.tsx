'use client'
import { Skeleton } from './components/skeleton'
import { useProductList } from './hooks/useProductList'
import { Star } from 'lucide-react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/card'
import { Button } from './components/button'
import { Product } from './types/products'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// TODO: Add pagination
// TODO: Add filters/sorts/tags
// TODO: Add error state component
// TODO: Add loading state component

export default function Home() {
  const { productList, isLoading, isFetching } = useProductList()

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
    )
  }

  return (
    <div className="grid min-h-screen items-center justify-items-center gap-16 pb-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        {productList ? (
          <div className="grid grid-cols-1 gap-8 p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productList.map(({ id, title, price, image, rating }: Product) => (
              <Card
                key={id}
                className="group flex max-w-72 flex-col justify-between"
              >
                <div>
                  <CardHeader className="items-center p-4">
                    <div className="h-64 w-full items-center">
                      <Image
                        src={image}
                        alt={title}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        width={24}
                        height={24}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-md mb-2">{title}</CardTitle>
                    <div className="flex w-full justify-between">
                      <div className="mb-2 flex flex-row space-x-2">
                        <Star
                          width={14}
                          className={cn(
                            rating.rate >= 1 && 'text-yellow-400',
                            'fill-yellow-400 text-yellow-400'
                          )}
                        />
                        <p>{rating.rate}</p>
                        <p>({rating.count})</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold">${price.toFixed(2)}</p>
                  </CardContent>
                </div>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p>No products found</p>
        )}
      </main>
    </div>
  )
}
