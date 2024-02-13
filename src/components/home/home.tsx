import { User } from '@/app/lib/definitions';
import Image from "next/image";
export  default async function HomePage({user}:{user:User}) {
    return (
    <div className="w-full pt-12 px-6 md:px-20  items-center justify-center overflow-hidden">
      <div className="flex flex-col  gap-6 md:flex-row items-center max-w-8xl">
          <div className="w-full md:w-1/2 lg:pr-32">
              <h2 className="text-4xl lg:text-5xl text-center md:text-left text-blue-900 leading-tight font-medium">Wellcome {user.name}</h2>
              <h3
                  className="mt-6 md:mt-10 text-md lg:text-xl text-center md:text-left text-gray-700 font-light tracking-wider leading-relaxed">
                  {user.history}
              </h3>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <Image 
              width={300}
              height={300}
              src={user.image_url} 
              alt = {user.name}
              className="h-auto"
              />
          </div>
      </div>
  </div>
    )
    }