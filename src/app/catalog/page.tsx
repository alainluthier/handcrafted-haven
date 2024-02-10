import { Metadata } from "next";
import CardItems from "@/app/ui/catalog/catalog";
import Search from "@/app/ui/catalog/search";
import { Suspense } from "react";
import { ItemsSkeleton } from "@/app/ui/skeletons";
import { fetchProductsPages } from "@/app/lib/data_catalog";
import Pagination from "@/app/ui/catalog/pagination";
import SideNavCatalog from "@/app/ui/catalog/sidenav-catalog";

export const metadata: Metadata = {
  title: "Catalog",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

   const totalPages = await fetchProductsPages(query);

  return (
    <>
      <div className="mt-9 flex items-center justify-between gap-2 md:mt-8">
        <SideNavCatalog />
      </div>
      <Suspense key={query + currentPage} fallback={<ItemsSkeleton />}>
        <CardItems query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
