import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../public/assets'

const Hero = () => {
  return (
    <div className='relative overflow-hidden'>
        <img src={assets.main_banner_bg} alt="banner" className='w-full hidden md:block' />
        <img src={assets.main_banner_bg_sm} alt="banner" className='w-full md:hidden' />
        <div className='absolute inset-0 flex flex-col justify-center items-start px-6 md:px-16 lg:px-24 text-left text-black space-y-6'>
            <h1 className='text-3xl md:text-5xl md:flex justify-center lg:text-6xl font-semibold leading-tight max-w-2xl'>Freshness You can Trust, Savings You Will Love!</h1>
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
                <Link to='/all-products' className='inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-full shadow-lg hover:bg-primary-dull transition'>
                    Shop now
                </Link>
                <Link to='/all-products' className='inline-flex items-center justify-center md:flex gap-2 px-6 py-3 text-gray-900 font-medium  shadow-sm '>
                    Explore deals
                    <span className='text-lg'>→</span>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Hero