
"use client";
import Link from "next/link";
import Search from "./search";
import { useState } from "react";
import { fetchProductsByPriceHight } from "@/app/lib/data_catalog";
import { usePathname } from "next/navigation";

export default function SideNavCatalog() {
  const pathname = usePathname();


  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-p-white rounded-box w-52"
          >
            <li>
              <Link href={""} className="hover:green hover:text-green-600">
                Reset
              </Link>
            </li>
            <li>
              <Link
                href={"#"}
                className="hover:green hover:text-green-600"
              >
                Highest to lowest
              </Link>
            </li>
            <li>
              <Link href={""} className="hover:green hover:text-green-600">
                lowest to Highest
              </Link>
            </li>
            <li>
              <Link href={""}>Category</Link>
              <ul className="p-2">
                <li>
                  <Link href={""} className="hover:green hover:text-green-600">
                    Decorative
                  </Link>
                </li>
                <li>
                  <Link href={""} className="hover:green hover:text-green-600">
                    Functional
                  </Link>
                </li>
                <li>
                  <Link href={""} className="hover:green hover:text-green-600">
                    Jewelry
                  </Link>
                </li>
                <li>
                  <Link href={""} className="hover:green hover:text-green-600">
                    Textile
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Filter</a>
        <Search placeholder="Search product..." />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={""} className="hover:green hover:text-green-600">
              Reset
            </Link>
          </li>
          <li>
            <Link href={""} className="hover:green hover:text-green-600">
              Highest to lowest
            </Link>
          </li>
          <li>
            <Link href={""} className="hover:green hover:text-green-600">
              lowest to Highest
            </Link>
          </li>
          <li>
            <details>
              <summary>Category</summary>
              <ul className="p-2 bg-p-white">
                <li>
                  <Link href={""}>Decorative</Link>
                </li>
                <li>
                  <Link href={""}>Functional</Link>
                </li>
                <li>
                  <Link href={""}>Jewelry</Link>
                </li>
                <li>
                  <Link href={""}>Textile</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}






// "use client";
// import Link from "next/link";
// import Search from "./search";
// import { useState } from "react";
// import { fetchProductsByPriceHight } from "@/app/lib/data_catalog";
// import { usePathname } from "next/navigation";

// export default function SideNavCatalog({
//   currentPage,
// }: {
//   currentPage: number;
// }) {
//   const pathname = usePathname();

//   const [query, setQuery] = useState("");

//   const handleHighestToLowestClick = async () => {
//     setQuery("highToLow");

//     const products = await fetchProductsByPriceHight(currentPage);
//   };

//   return (
//     <div className="navbar bg-base-100">
//       <div className="navbar-start">
//         <div className="dropdown ">
//           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />
//             </svg>
//           </div>
//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-p-white rounded-box w-52"
//           >
//             <li>
//               <Link href={""} className="hover:green hover:text-green-600">
//                 Reset
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href={"#"}
//                 onClick={handleHighestToLowestClick}
//                 className="hover:green hover:text-green-600"
//               >
//                 Highest to lowest
//               </Link>
//             </li>
//             <li>
//               <Link href={""} className="hover:green hover:text-green-600">
//                 lowest to Highest
//               </Link>
//             </li>
//             <li>
//               <Link href={""}>Category</Link>
//               <ul className="p-2">
//                 <li>
//                   <Link href={""} className="hover:green hover:text-green-600">
//                     Decorative
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href={""} className="hover:green hover:text-green-600">
//                     Functional
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href={""} className="hover:green hover:text-green-600">
//                     Jewelry
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href={""} className="hover:green hover:text-green-600">
//                     Textile
//                   </Link>
//                 </li>
//               </ul>
//             </li>
//           </ul>
//         </div>
//         <a className="btn btn-ghost text-xl">Filter</a>
//         <Search placeholder="Search product..." />
//       </div>
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1">
//           <li>
//             <Link href={""} className="hover:green hover:text-green-600">
//               Reset
//             </Link>
//           </li>
//           <li>
//             <Link href={""} className="hover:green hover:text-green-600">
//               Highest to lowest
//             </Link>
//           </li>
//           <li>
//             <Link href={""} className="hover:green hover:text-green-600">
//               lowest to Highest
//             </Link>
//           </li>
//           <li>
//             <details>
//               <summary>Category</summary>
//               <ul className="p-2 bg-p-white">
//                 <li>
//                   <Link href={""}>Decorative</Link>
//                 </li>
//                 <li>
//                   <Link href={""}>Functional</Link>
//                 </li>
//                 <li>
//                   <Link href={""}>Jewelry</Link>
//                 </li>
//                 <li>
//                   <Link href={""}>Textile</Link>
//                 </li>
//               </ul>
//             </details>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }
