"use client";
import { useProductList } from "@/app/hooks/useProductList";
import { Skeleton } from "@/app/components/skeleton";
import { Card, CardContent } from "./card";
import { ChevronsLeft, RefreshCw, Shield, Star, Truck } from "lucide-react";
import { Button } from "./button";
import { Product } from "../../lib/types/products";
import { useRouter } from "next/navigation";
import { formatUSD } from "@/lib/utils";
import { useCartStore } from "../hooks/useCartStore";
import { useToast } from "@/app/hooks/use-toast";
import Image from "next/image";

export default function ProductDetailsClient({
  selectedProductId,
}: {
  selectedProductId: number;
}) {
  const { productsById, productList, isLoading, isFetching } = useProductList();
  const router = useRouter();
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const selectedProduct = productsById?.[selectedProductId];

  if (isLoading || isFetching) {
    return (
      <div className="container mx-auto sm:px-2 px-4 py-2 sm:py-8 min-h-screen w-screen">
        <div className="flex flex-col md:flex-row w-full gap-12 pt-12 justify-center items-center md:items-start">
          <Skeleton className=" h-80 w-full sm:h-96 sm:w-96 rounded-none border-none" />
          <div className="flex flex-col gap-4 justify-between w-full sm:w-auto">
            <div className="flex flex-col gap-4">
              <Skeleton className="h-10 w-3/4  sm:w-96 rounded-2 border-none " />
              <Skeleton className="h-8  w-1/2 sm:w-64 rounded-2 border-none " />
              <Skeleton className="h-8  w-4/5 sm:w-64 rounded-2 border-none justify-end" />
            </div>
            <Skeleton className="h-10 w-f sm:w-96 rounded-2 border-none " />
          </div>
        </div>
      </div>
    );
  }

  if (!selectedProduct) {
    return <p>No product found</p>;
  }

  return (
    <div className="container mx-auto sm:px-8 px-4 py-2 sm:py-8">
      <Button
        size="lg"
        className="mb-8"
        variant="outline"
        onClick={() => window.history.back()}
      >
        <ChevronsLeft />
      </Button>
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <Card className=" border-0">
            <CardContent className="p-0">
              <div className="aspect-square relative">
                <Image
                  quality={100}
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="h-full w-full object-contain p-8"
                  width={240}
                  height={240}
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
                    selectedProduct &&
                    i < Math.floor(selectedProduct.rating.rate)
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
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
              {formatUSD(selectedProduct.price)}
            </p>
          </div>
          <p className="text-base text-muted-foreground leading-relaxed">
            {selectedProduct.description}
          </p>
          <div className="pt-4">
            <Button
              size="lg"
              className="w-full"
              onClick={() => {
                addItem(selectedProduct);
                window.scrollTo({ top: 0, behavior: "smooth" });
                toast({
                  title: "Added to cart!",
                  description: `${selectedProduct.title} has been added to your cart.`,
                });
              }}
            >
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
          <p className="text-sm font-medium text-muted-foreground uppercase">
            RELATED PRODUCTS
          </p>
          <div className="flex flex-row flex-wrap gap-4">
            {productList &&
              productList
                .filter(
                  (product) =>
                    product.category === selectedProduct.category &&
                    product.id !== selectedProduct.id
                )
                .map(({ id, title, price, image }: Product) => (
                  <div
                    className="p-1 text-center"
                    key={id}
                    onClick={() => router.push(`/product/${id}`)}
                  >
                    <Card className="group flex w-24 h-24 flex-col justify-between ">
                      <div className="h-full w-full items-center p-4">
                        <Image
                          quality={100}
                          src={image}
                          alt={title}
                          className="h-full w-full object-contain "
                          width={240}
                          height={240}
                        />
                      </div>
                    </Card>
                    <p className="text-xs">{formatUSD(price)}</p>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
