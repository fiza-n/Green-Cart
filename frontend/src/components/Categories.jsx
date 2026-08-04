import React from 'react'
import { categories } from '../../public/assets'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Categories = () => {
  return (
    <section className='px-6 md:px-16 lg:px-2 py-5'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-2xl md:text-3xl font-semibold text-gray-900'>Categories</h1>
        <p className='text-sm text-gray-500'>Shop by category</p>
      </div>
      <div className='grid  gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 lg:gap-6'>
        {categories.map((cat, index) => (
          <Link
            key={index}
            to={`/all-products/${cat.path}`}
            className='group  flex flex-col items-center justify-center gap-3 rounded-3xl p-4 w-40 transition hover:-translate-y-1 hover:shadow-lg'
            style={{ backgroundColor: cat.bgColor }}
          >
            <div className='flex h-28 w-28 items-center justify-center p-4'>
              <img src={cat.image} alt={cat.text} className='h-full w-full object-contain' />
            </div>
            <p className='text-sm font-semibold text-gray-900'>{cat.text}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Categories