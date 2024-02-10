import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ItemFiltered } from "@/app/lib/definitions_f";

import {
  fetchProducts,
  fetchFilteredProducts,
  fetchProductById,
  fetchProductsByCategory,
  fetchProductsByPriceHight,
  fetchProductsByPriceLow,
} from "@/app/lib/data_catalog";

export default async function CardItems({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
  }) {
  
  let listOfProducts : ItemFiltered[] | undefined;

  if (query == "highToLow") {
    listOfProducts = await fetchProductsByPriceHight(currentPage);
  } else if (query == "LowToHigh") {
    listOfProducts = await fetchProductsByPriceLow(currentPage);
  } else {
    listOfProducts = await fetchFilteredProducts(query, currentPage);
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Products
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {listOfProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <Image
                  src={product.image_url}
                  alt={`${product.name}'s picture`}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/catalog/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  <b>${product.price}</b>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
