import { PaginationControlsProps } from "@/lib/types/products";
import { Button } from "./button";
import { Pagination, PaginationContent, PaginationItem } from "./pagination";
import Link from "next/link";

export function PaginationControls({
  currentPage,
  totalPages,
}: PaginationControlsProps) {
  return (
    <Pagination className="mt-8 ">
      <PaginationContent>
        <PaginationItem>
          <Link
            href={`/?page=${currentPage - 1}`}
            aria-disabled={currentPage <= 1}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          >
            <Button variant="ghost" disabled={currentPage <= 1}>
              Back
            </Button>
          </Link>
        </PaginationItem>
        {[...Array(totalPages)].map((_, i) => (
          <PaginationItem key={i + 1} className="hidden md:flex">
            <Link
              href={`/?page=${i + 1}`}
              aria-disabled={currentPage === i + 1}
              className={
                currentPage === i + 1 ? "pointer-events-none opacity-50" : ""
              }
            >
              <Button variant="ghost" disabled={currentPage === i + 1}>
                {i + 1}
              </Button>
            </Link>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Link
            href={`/?page=${currentPage + 1}`}
            aria-disabled={currentPage >= totalPages}
            className={
              currentPage >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          >
            <Button variant="ghost" disabled={currentPage >= totalPages}>
              Next
            </Button>
          </Link>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
