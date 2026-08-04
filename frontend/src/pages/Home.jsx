import React from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'

const Home = () => {
  return (
    <div className='mt-10'><Hero />
    <Categories />
    <BestSeller />
    </div>
  )
}

export default Home