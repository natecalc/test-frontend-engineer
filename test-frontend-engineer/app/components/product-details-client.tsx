'use client';;
import { useProductList } from "@/app/hooks/useProductList";
import { Skeleton } from "@/app/components/skeleton";
import { Card, CardContent } from "./card";
import { ChevronsLeft, RefreshCw, Shield, Star, Truck } from "lucide-react";
import { Button } from "./button";
import { Product } from "../types/products";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";

export default function ProductDetailsClient({ selectedProductId }: { selectedProductId: number }) {
  const { productsById, productList, isLoading, isFetching } = useProductList()
  const router = useRouter()

  const selectedProduct = productsById?.[selectedProductId]

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

  if (!selectedProduct) {
    return <p>No product found</p>
  }

  return (
    <div className="container mx-auto px-4 py-2 sm:py-8">
      <Button size="lg" className="mb-8" variant='outline' onClick={() => window.history.back()}>
      <ChevronsLeft />
      </Button>
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <Card className="overflow-hidden border-0">
          <CardContent className="p-0">
            <div className="aspect-square relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="h-full w-full object-contain p-8"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase">
            {selectedProduct.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {selectedProduct.title}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  selectedProduct &&  i < Math.floor(selectedProduct.rating.rate)
                    ? 'fill-primary text-primary'
                    : 'fill-muted text-muted'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {selectedProduct.rating.count} reviews
          </p>
        </div>
        <div>
          <p className="text-3xl font-bold">
            ${selectedProduct.price.toFixed(2)}
          </p>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          {selectedProduct.description}
        </p>
        <div className="pt-4">
          <Button size="lg" className="w-full">
            Add to Cart
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 pt-8 sm:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">Free Delivery</p>
                <p className="text-muted-foreground">On orders over $50</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <RefreshCw className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">Easy Returns</p>
                <p className="text-muted-foreground">30 day return policy</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">Secure Payment</p>
                <p className="text-muted-foreground">Protected checkout</p>
              </div>
            </CardContent>
          </Card>
          </div>
          <p className="text-sm font-medium text-muted-foreground uppercase">RELATED PRODUCTS</p>
          <Carousel className="w-1/2 ml-12">
            <CarouselContent className="-ml-1">
              {productList && productList.filter(product => product.category === selectedProduct.category && product.id !== selectedProduct.id).map(({ id, title, price, image, rating }: Product) =>
              (
                <CarouselItem key={id} className=" basis-1/2 transition-transform duration-300 group-hover:scale-105"
                  onClick={() => router.push(`/product/${id}`)}>
                  <div className="p-1">
                    <Card
                      className="group flex w-24 h-24 flex-col justify-between "
                    >
                          <div className="h-full w-full items-center">
                            <Image
                              src={image}
                              alt={title}
                              className="h-full w-full object-contain "
                              width={24}
                              height={24}
                            />
                          </div>
                    </Card>
                  </div>
                </CarouselItem>
              )
              )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
      </div>
    </div>
  </div>
  )
}