'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Button } from './button';
import { createUser } from '@/app/lib/actions';

export default function SignUpForm() {
    return (
        <form action={createUser} className="space-y-4 md:space-y-6">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                <h1 className="mb-3 text-2xl">
                    Create Account
                </h1>
                <div className="w-full">
                    <div>
                        <label htmlFor="email" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <input type="email" name="email" id="email" 
                        className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Enter your email address" />
                    </div>
                    <div>
                        <label htmlFor="password" 
                        className="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white">
                            Password
                        </label>
                        <input type="password" name="password" id="password" 
                        placeholder="Enter password" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="confirm-password" 
                        className="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Confirm password
                        </label>
                        <input type="password" name="confirm-password" 
                        id="confirm-password" placeholder="Enter password again" 
                        className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="type"
                        className="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white">
                            Type
                        </label>
                        <select name="type" id="type"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500">
                            <option value="artisan">
                                Artisan
                            </option>
                            <option value="customer">
                                Customer
                            </option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="name"
                        className="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white">
                            Name
                        </label>
                        <input 
                        id="name"
                        name="name"
                        type="text" 
                        className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <SignUpButton/>
                    <p className="text-sm mt-5 font-light text-gray-500 dark:text-gray-400">
                        Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                    </p>
                </div>
            </div>
        </form>)
}

function SignUpButton() {
    const { pending } = useFormStatus();
    return (
      <Button className="mt-4 w-full" aria-disabled={pending}>
        Sign up <PlusCircleIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
    );
}