"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ItemFiltered } from "@/app/lib/definitions_f";
import {
  fetchFilteredProducts,
  fetchProductsByCategory,
  fetchProductsByPriceHight,
  fetchProductsByPriceLow,
} from "@/app/lib/data_catalog";
import { useRouter } from "next/router";

export default function CardItems2({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const routerQuery = useRouter().query;

  const [listOfProducts, setListOfProducts] = useState<ItemFiltered[]>([]);

  // const listOfProducts = await fetchFilteredProducts(query, currentPage);
  useEffect(() => {
    async function fetchData() {
      try {
        // Llamar a la función correspondiente para obtener los productos filtrados u ordenados
        let products;
        if (routerQuery.filter === "priceHigh") {
          products = await fetchProductsByPriceHight(currentPage);
        } else if (routerQuery.filter === "priceLow") {
          products = await fetchProductsByPriceLow(currentPage);
        } else {
          products = await fetchFilteredProducts(query, currentPage);
        }
        setListOfProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchData();
  }, [query, currentPage]);

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
                  width={60}
                  height={65}
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
