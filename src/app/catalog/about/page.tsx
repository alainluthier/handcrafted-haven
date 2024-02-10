import Link from "next/link";
import { InformationCircleIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function AboutUs() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-4 text-center m-2">
      <div className="flex items-center gap-2">
        <InformationCircleIcon className="w-8 h-8 text-gray-400" />
        <h2 className="text-xl font-semibold">About Us</h2>
      </div>
      <p>
        Welcome to Handcrafted Haven! We are an innovative web application serving as a virtual marketplace for artisans and crafters. 
        The primary goals are to connect creators with customers, foster a sense of community, and promote sustainable consumption.
      </p>
      <p>
          Our team is composed of talented individuals committed to the success of Handcrafted Haven:
      </p>
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <UserGroupIcon className="w-10 h-10 mr-8 text-gray-400" />
          <ul className="list-disc text-left">
            <li>Fernando Gonzales</li>
            <li>Anelisa Ferreira</li>
            <li>Alain Catari</li>
            <li>Ojukwu Ifeanyi</li>
          </ul>
        </div>
      </div>
      <Link
        href="/"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-orange-400"
      >
        Explore Handcrafted Haven
      </Link>
    </main>
  );
}