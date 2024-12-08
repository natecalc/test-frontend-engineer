// page.tsx

import ProductDetailsClient from "@/app/components/product-details-client"

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const selectedProductId = (await params).id

  return (
    <div className="grid min-h-screen items-center justify-items-center gap-16 pb-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <ProductDetailsClient selectedProductId={selectedProductId} />
      </main>
    </div>
  )
}