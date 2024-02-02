"use client";
import React from 'react';
import { CustomButton } from '.';
import Image from 'next/image'; 


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
        
        <CustomButton
        title= "Login"
        containerStyles="bg-primary-blue text-white rounded-full mt-10" 
        handleClick ={handleScroll}
        />
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