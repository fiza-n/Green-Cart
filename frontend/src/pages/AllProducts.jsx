import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const AllProducts = () => {
  const { products, searchQuery, addToCart } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    if (typeof searchQuery === 'string' && searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      )
    } else {
      setFilteredProducts(products)
    }
  }, [products, searchQuery])

  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <h1 className="text-2xl font-medium uppercase">All Products</h1>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>
      <div className="grid grid-cols-5 gap-8 mt-8  ">
        {filteredProducts.filter((product) => product.inStock).map((item, index) => (
          <div
            key={index}
            className="relative min-w-[210px] max-w-[210px] flex-shrink-0 border border-zinc-200 rounded-3xl p-3 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="bg-lime-100 text-lime-700 text-[10px] font-semibold px-2 py-1 rounded-full">
                {Math.round(
                  ((item.price - item.offerPrice) / item.price) * 100,
                )}
                % off
              </span>
              <button className="rounded-full border border-zinc-300 p-1 text-zinc-600 hover:bg-zinc-100 transition text-[10px]">
                ❤
              </button>
            </div>
            <div className="flex items-center justify-center h-28 mb-3">
              <img
                src={(item.images ?? item.image)?.[0]}
                alt={item.name}
                className="max-h-full object-contain"
              />
            </div>
            <p className="text-[11px] text-zinc-500 mb-1">{item.category}</p>
            <h2 className="text-sm font-semibold text-zinc-900 mb-2 line-clamp-2">
              {item.name}
            </h2>
            <div className="flex items-center gap-2 pb-12">
              <span className="text-base font-bold text-zinc-900">
                ${item.offerPrice}
              </span>
              <span className="text-xs text-zinc-400 line-through">
                ${item.price}
              </span>
            </div>
            <button
              onClick={() => addToCart(item._id ?? item.id)}
              className="absolute right-3 bottom-3 rounded-full bg-primary px-3 py-2 text-[11px] font-semibold text-white shadow-lg transition hover:bg-primary-dull"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
