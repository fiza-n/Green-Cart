import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'

const SellerSignin = () => {
    const { isSeller, setIsSeller, navigate} = useAppContext()
    const [email, setEmail] = useState("")
     const [password, setPassword] = useState("")

     useEffect(()=>{
        if(isSeller){
            navigate("seller")
        }
     },[isSeller])

     const handleSubmit = (e) => {
        e.preventDefault()
        setIsSeller(true)
     }
  return !isSeller && (
    <form onSubmit={handleSubmit} className='min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10 text-sm text-gray-800' action="">
        <div className=' max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-neutral-600 shadow-lg'>
            <p className='mb-6 text-center text-2xl font-semibold'>
                <span className='text-primary'>Seller</span> Signin
            </p>
            <div className='mb-4 w-full'>
                <p className='mb-2 font-medium text-gray-700'>Email</p>
                <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" name="" id="" placeholder='Enter your email' required className='w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-primary' />
            </div>
             <div className='mb-6 w-full'>
                <p className='mb-2 font-medium text-gray-700'>Password</p>
                <input onChange={(e)=> setPassword(e.target.value)} value={password} type="password" name="" id="" placeholder='Enter your password' required className='w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-primary' />
            </div>
            <button className='w-full rounded-full bg-primary px-4 py-3 font-semibold text-white transition hover:bg-primary-dull'>Signin</button>
        </div>
    </form>
  )
}

export default SellerSignin