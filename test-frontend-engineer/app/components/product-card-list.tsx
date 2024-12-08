import { Star } from 'lucide-react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'
import { Button } from './button'
import { Product } from '../types/products'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export const ProductCardList = ({ productList }: { productList: Product[] }) => {
  const router = useRouter()

  return (
    <div className="grid grid-cols-1 gap-8 p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {productList.map(({ id, title, price, image, rating }: Product) => (
        <div onClick={() => router.push(`/product/${id}`)}
        key={id}
        >
      <Card
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
          </div>
    ))}
  </div>
  )
}