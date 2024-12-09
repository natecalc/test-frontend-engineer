import { Suspense } from "react";
import { ProductContent } from "./components/product-content";

export default function Home() {
  return (
    <div className="grid min-h-screen items-center justify-items-center gap-16 pb-20">
      <Suspense>
        <ProductContent />
      </Suspense>
    </div>
  );
}
