import Link from "next/link";
import NavLinks from "./nav-links";
import { signOut } from "@/auth";
export default async function Header() {
  return (
    <div className="navbar bg-p-white">
      <div className="flex-1">
        <Link href={"/catalog"} className="btn btn-ghost text-xl">
          Handcrafted Haven
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <NavLinks />
          <li>
              <form className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium hover:green hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3"
                action={async () => {
                  'use server';
                  await signOut();
                }}
              >
                <button>
                <p className="hidden md:block">Sing Out</p>
                </button>
              </form>
            
          </li>

        </ul>
      </div>
    </div>
  );
}
