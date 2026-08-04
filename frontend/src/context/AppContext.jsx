import {createContext, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { dummyProducts } from '../../public/assets'
import {toast} from "react-hot-toast"

export const AppContext = createContext()

export const AppContextProvider = ({children})=>{

    const navigate = useNavigate()
    const [user, setUser] = useState(true)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserSignin, setShowUserSignin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})

    const fetchProducts = () => {
        setProducts(dummyProducts)
    }

    function addToCart(ItemId) {
        let cartData = structuredClone(cartItems)
        if (cartData[ItemId]) {
            cartData[ItemId] += 1
        } else {
            cartData[ItemId] = 1
        }
        setCartItems(cartData)
        toast.success('Added to cart')
    }

    function updateCartItem(itemId, quantity) {
        let cartData = structuredClone(cartItems)
        if (quantity <= 0) {
            delete cartData[itemId]
        } else {
            cartData[itemId] = quantity
        }
        setCartItems(cartData)
        toast.success('Cart updated')
    }

    function removeFromCart(ItemId) {
        let cartData = structuredClone(cartItems)
        if (cartData[ItemId]) {
            cartData[ItemId] -= 1
            if (cartData[ItemId] === 0) {
                delete cartData[ItemId]
            }
            toast.success('Item removed')
            setCartItems(cartData)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const value = {user, setUser, isSeller, setIsSeller, navigate, products, setProducts, addToCart, updateCartItem , removeFromCart, cartItems}
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () =>{
    return useContext(AppContext)
}