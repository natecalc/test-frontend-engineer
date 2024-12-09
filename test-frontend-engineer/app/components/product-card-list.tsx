import { Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Product } from "../../lib/types/products";
import { truncateText } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Badge } from "./badge";
import Image from "next/image";

export const ProductCardList = ({
  productList,
}: {
  productList: Product[];
}) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-8 p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {productList.map(
        ({ id, title, price, image, rating, category }: Product, index) => (
          <div onClick={() => router.push(`/product/${id}`)} key={id}>
            <Card className="group flex max-w-72 min-h-[478px] flex-col justify-between cursor-pointer">
              <CardHeader className="items-center p-4 ">
                <div className="h-64 w-full items-center">
                  <Image
                    quality={100}
                    src={image}
                    alt={title}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    width={125}
                    height={125}
                    priority={index < 8}
                    loading={index < 8 ? "eager" : "lazy"}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-sm mb-2">
                  {truncateText(title, 50)}
                </CardTitle>
                <div className="flex w-full justify-between">
                  <div className="mb-2 flex flex-row space-x-2">
                    <Star width={14} className="text-yellow-400" />
                    <p>{rating.rate}</p>
                    <p>({rating.count})</p>
                  </div>
                </div>
                <p className="text-xl font-bold">${price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="px-4">
                <div className="flex flex-row space-x-2 w-full justify-between justify-self-end">
                  <Badge className="capitalize" variant="outline">
                    {category}
                  </Badge>
                  <Badge className="bg-green-100 text-green-800  hover:bg-green-100">
                    In Stock
                  </Badge>
                </div>
              </CardFooter>
            </Card>
          </div>
        )
      )}
    </div>
  );
};
