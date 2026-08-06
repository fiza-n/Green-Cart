import React from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import Subscription from '../components/Subscription'

const Home = () => {
  return (
    <div className='mt-10'>
    <Hero />
    <Categories />
    <BestSeller />
    <BottomBanner />
    <Subscription />
    </div>
  )
}

export default Home