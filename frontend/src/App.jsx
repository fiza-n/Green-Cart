import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import { useAppContext } from './context/AppContext'
import Signin from './components/Signin'
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'


function App() {
  const [count, setCount] = useState(0)
  const isSellerPath = useLocation().pathname.includes("seller")
  const {showUserSignin} = useAppContext()

  return (
    <>
   {isSellerPath ? null : <Navbar />}
   {showUserSignin ? <Signin />: null}
   <Toaster />
 <div className={`${isSellerPath ? " " : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/all-products' element={<AllProducts/>} />
    <Route path='/all-products/:category' element={<ProductCategory/>} />
    <Route path='/all-products/:category/:id' element={<ProductDetails/>} />
   </Routes>
 </div>
  {isSellerPath ? null : <Footer />}
    </>
  )
}

export default App
