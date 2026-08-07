import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts, dummyAddress } from "../../public/assets";
import { toast } from "react-hot-toast";

export const AppContext = createContext();

const getStoredValue = (key, fallback) => {
  if (typeof window === "undefined") return fallback;

  try {
    const savedValue = window.localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : fallback;
  } catch (error) {
    console.error(`Failed to load ${key} from localStorage`, error);
    return fallback;
  }
};

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserSignin, setShowUserSignin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => getStoredValue("green-cart-cart", {}));
  const [searchQuery, setSearchQuery] = useState("");
  const [addresses, setAddresses] = useState(() => getStoredValue("green-cart-addresses", dummyAddress));
  const [selectedAddress, setSelectedAddress] = useState(() => getStoredValue("green-cart-selected-address", dummyAddress[0]));

  const fetchProducts = () => {
    setProducts(dummyProducts);
  };

  function addToCart(ItemId) {
    const id = ItemId?._id ?? ItemId?.id ?? ItemId;
    if (!id) {
      toast.error("Could not add item to cart: invalid product id");
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[id]) {
      cartData[id] += 1;
    } else {
      cartData[id] = 1;
    }
    setCartItems(cartData);
    toast.success("Added to cart");
  }

  function updateCartItem(itemId, quantity) {
    let cartData = structuredClone(cartItems);
    if (quantity <= 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);
    toast.success("Cart updated");
  }

  function removeFromCart(ItemId) {
    let cartData = structuredClone(cartItems);
    if (cartData[ItemId]) {
      cartData[ItemId] -= 1;
      if (cartData[ItemId] === 0) {
        delete cartData[ItemId];
      }
      toast.success("Item removed");
      setCartItems(cartData);
    }
  }

  function addAddress(newAddress) {
    const normalizedAddress = {
      ...newAddress,
      _id: newAddress._id || `address-${Date.now()}`,
    };

    setAddresses((prev) => [...prev, normalizedAddress]);
    setSelectedAddress(normalizedAddress);
    return normalizedAddress;
  }

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("green-cart-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    window.localStorage.setItem("green-cart-addresses", JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    window.localStorage.setItem("green-cart-selected-address", JSON.stringify(selectedAddress));
  }, [selectedAddress]);

  const value = {
    user,
    setUser,
    isSeller,
    setIsSeller,
    navigate,
    products,
    getCartCount,
    setProducts,
    getCartAmount,
    setSearchQuery,
    searchQuery,
    setShowUserSignin,
    addToCart,
    updateCartItem,
    removeFromCart,
    addAddress,
    addresses,
    setAddresses,
    selectedAddress,
    setSelectedAddress,
    cartItems,
    showUserSignin,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
