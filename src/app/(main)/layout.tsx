import { GiftIcon } from '@heroicons/react/24/outline';
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col md:flex-col">
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <GiftIcon className="h-12 w-12 rotate-[15deg]" />
                        <p className="text-[24px]">Handcrafted Heaven</p>
                    </div>
                    <div className="w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            
                            <li>
                                <a href="/catalog" className="block py-2 px-3 text-white bg-blue-700 rounded 
                                md:bg-transparent  md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Catalog</a>
                            </li>
                            <li>
                                <a href="/artisans" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent 
                                md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 
                                dark:hover:text-white md:dark:hover:bg-transparent">For artisans</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}