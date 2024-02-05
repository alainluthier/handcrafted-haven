"use client";
import React from 'react';
import { CustomButton } from '.';
import Image from 'next/image'; 
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const Hero = () => {
  const handleScroll = () => {}
  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">
          Welcome to Handcrafted Haven!
        </h1>
        <p className="hero__subtitle">
          We provide a platform for artisans and crafters to showcase and sell their unique handcrafted items.
        </p>
        <Link
            href="/login"
            className="flex items-center w-36 gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
      </div>

      <div className="hero__image-container">
        <div className="hero__image">
           <Image src="/hero-1.png" alt="Hero" fill className="object-contain"/>
         <div className="hero__image-overlay">
         </div>      
        </div>
      </div>

    </div>
  )
}

export default Hero