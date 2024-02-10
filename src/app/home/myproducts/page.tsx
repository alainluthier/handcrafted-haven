import Pagination from '@/components/myproducts/pagination';
import Search from '@/components/search';
import Table from '@/components/myproducts/table';
import { CreateProduct } from '@/components/myproducts/buttons';
import { ProductsTableSkeleton } from '@/components/skeletons';
import { Suspense } from 'react';
import { fetchProductsPages } from '@/app/lib/data';
import { auth } from '@/auth';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const session = await auth();
  //console.log(session);
  const totalPages = await fetchProductsPages(query,session?.user?.id||'-');
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="">My Products</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search products..." />
        <CreateProduct />
      </div>
       <Suspense key={query + currentPage} fallback={<ProductsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} userid={session?.user?.id||'-'}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}