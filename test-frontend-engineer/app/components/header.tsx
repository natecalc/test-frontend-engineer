"use client";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { useCartStore } from "../hooks/useCartStore";
import { Button } from "./button";
import { ShoppingBasketIcon, Trash } from "lucide-react";
import { reduce } from "ramda";
import { formatUSD, truncateText } from "@/lib/utils";
import Image from "next/image";

export const Header = () => {
  const { items, addQuantity, removeQuantity, removeItem } = useCartStore();
  const totalQuantity = reduce(
    (acc, item) => (item.quantity ? acc + item.quantity : acc),
    0,
    items
  );
  return (
    <header className="flex h-16 w-full items-center justify-center border-b-[1px] border-secondary">
      <div className="mx-8 flex w-full items-center justify-between">
        <Link href="/">
          <div className="flex space-x-4">
            <Image
              src="/stride-logo.svg"
              alt="Stride"
              className="h-8"
              quality={100}
              width={32}
              height={32}
            />
            <h1 className="text-2xl font-bold">Stride</h1>
          </div>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative">
              <ShoppingBasketIcon />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-destructive text-white rounded-full w-4 h-4 flex items-center justify-center">
                  <p className="text-[10px] font-bold">{totalQuantity}</p>
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[95%] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>My Cart</SheetTitle>
              <SheetDescription>
                One step closer to your new essentials.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 py-4">
              {items.length === 0 ? (
                <p>No items in your basket 😞</p>
              ) : (
                items.map((item, index) => (
                  <div
                    key={index}
                    className=" w-full flex space-x-2 items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.image}
                        alt={item.title}
                        className="h-16 w-16 object-cover rounded-md"
                        quality={100}
                      />
                      <div>
                        <p className="text-xs">
                          {truncateText(item.title, 32)}
                        </p>
                        <p className="text-muted-foreground">${item.price}</p>
                        <div className="flex flex-row justify-between items-center text-xs py-2">
                          <Button
                            size="sm"
                            className="h-6 w-6"
                            variant="outline"
                            onClick={() => addQuantity(item)}
                          >
                            +
                          </Button>
                          <p>Qty: {item.quantity}</p>
                          <Button
                            size="sm"
                            className="h-6 w-6"
                            variant="outline"
                            onClick={() => removeQuantity(item)}
                          >
                            -
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      className="text-xs justify-self-end"
                      onClick={() => removeItem(item)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
            <h2 className="font-bold text-lg py-4">
              Total:
              {formatUSD(
                reduce(
                  (acc, item) => acc + item.price * (item.quantity ?? 1),
                  0,
                  items
                )
              )}
            </h2>
            <SheetFooter className="">
              <SheetClose asChild>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={items.length === 0}
                >
                  Checkout
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
