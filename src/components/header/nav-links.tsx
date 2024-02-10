'use client'
import {
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
//TODO /catalog/sellers
const links = [
  { name: "Products", href: "/catalog", icon: BuildingStorefrontIcon },
  { name: "Sellers", href: "/catalog/sellers", icon: UsersIcon },
  { name: "About us", href: "/catalog/about", icon: BuildingOfficeIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <li key={link.name}>
            <Link
              href={link.href}
              className={clsx(
                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium hover:green hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3",
                {
                  "green text-green-600": pathname === link.href,
                }
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          </li>
        );
      })}
    </>
  );
}

// "use client";

// import {
//   BuildingOfficeIcon,
//   BuildingStorefrontIcon,
//   UsersIcon,
// } from "@heroicons/react/24/outline";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import clsx from "clsx";
// import { getSession } from "next-auth/react";
// import { useEffect } from "react";

// // Map of links to display in the side navigation.
// // Depending on the size of the application, this would be stored in a database.
// const links = [
//   { name: "Products", href: "/catalog", icon: BuildingStorefrontIcon },
//   {
//     name: "Sellers",
//     href: "/catalog/sellers",
//     icon: UsersIcon
//   },
//   { name: "About us", href: "/about", icon: BuildingOfficeIcon },
// ];

// export default function NavLinks() {
//   const pathname = usePathname();

//   useEffect(() => {
//     const fetchSession = async () => {
//       try {
//         const session = await getSession();
//         // Verificamos si el usuario es artesano después de obtener la sesión
//         const isArtisan = session?.user?.role === "artesano";
//         console.log("Is Artisan:", isArtisan);
//       } catch (error) {
//         console.error("Error fetching session:", error);
//       }
//     };

//     fetchSession();
//   }, []);

//   return (
//     <>
//       {links.map((link) => {
//         const LinkIcon = link.icon;
//         return (
//           <li key={link.name}>
//             <Link
//               href={link.href}
//               className={clsx(
//                 "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium hover:green hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3",
//                 {
//                   "green text-green-600": pathname === link.href,
//                 }
//               )}
//             >
//               <LinkIcon className="w-6" />
//               <p className="hidden md:block">{link.name}</p>
//             </Link>
//           </li>
//         );
//       })}
//       <li>
//         <details>
//           <summary
//             className={clsx(
//               "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:green hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3"
//             )}
//           >
//             User
//           </summary>
//           <ul className="p-2 bg-base-100 rounded-t-none">
//             <li>
//               <a>Profile</a>
//             </li>
//             {isArtisan && (
//               <li>
//                 <Link href="/dashboard">
//                   <a>Dashboard</a>
//                 </Link>
//               </li>
//             )}
//             <li>
//               <a>Logout</a>
//             </li>
//           </ul>
//         </details>
//       </li>
//     </>
//   );
// }
