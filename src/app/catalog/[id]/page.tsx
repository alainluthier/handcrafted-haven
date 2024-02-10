/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { StarIcon } from "@heroicons/react/20/solid";
import { fetchProductById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";

const reviews = { href: "#", average: 4, totalCount: 117 };

export default async function Product({ params }: { params: { id: string } }) {
  const id = params.id;
  const product = await fetchProductById(id);

  if (!product) {
      notFound(); 
  }

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mx-auto mt-6 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Imagen */}
          <div className="overflow-hidden rounded-lg lg:block">
            <Image
              width={500}
              height={400}
              src={product.image_url}
              alt={`${product.name}'s picture`}
              className="h-auto max-w-sm justify-center rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
            />
          </div>

          {/* Product info */}
          <div className="mx-auto px-2 pb-16 pt-10 sm:px-2 lg:pb-24 lg:pt-16">
            {/* Para pantallas medianas y grandes */}
            <div className="hidden lg:block lg:col-span-1 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
              {/* Descripción */}
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Para pantallas pequeñas */}
            <div className="lg:hidden">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
              {/* Descripción */}
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Opciones y botón */}
            <div className="mt-4">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                $ {product.price}
              </p>

            </div>
          </div>
        </div>
        <div className="mt-10 mx-auto sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <h2 className="text-3xl text-gray-900">Reviews</h2>

          <div className="mt-4 space-y-6">
            <p className="text-sm text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
