"use client";

import { productDataType } from "@/service/queryes";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Heart, Maximize2, Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/features/cartSlice";
import { RootState } from "@/redux/store";
import Link from "next/link";

function NewProdact({ id, title, price, image }: productDataType) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemInCart = cartItems.find((item) => item.id === id);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (itemInCart?.quantity === 0 || !itemInCart) {
      setIsAdded(false);
    }
  }, [itemInCart]);

  const handleAddToCart = () => {
    dispatch(addToCart({ id, title, price, image, quantity: 0 } as any));
    setIsAdded(true);
  };

  const handleIncrement = () => {
    dispatch(addToCart({ id, title, price, image, quantity: 0 } as any));
  };

  const handleDecrement = () => {
    if (itemInCart?.quantity === 1) {
      if (id !== undefined) {
        dispatch(removeFromCart(id));
      }
      setIsAdded(false);
    } else {
      if (id !== undefined) {
        dispatch(removeFromCart(id));
      }
    }
  };

  return (
    <div className="group bg-white shadow-lg rounded-lg p-5 flex flex-col gap-2 relative">
      <div className="absolute top-0 left-0 bg-[#00B853] text-white text-xs font-semibold px-2 py-1 rounded">
        29% OFF
      </div>

      <div className="absolute top-2 right-2 z-50 flex flex-col gap-2 transform transition-all duration-300 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0">
        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
          <Maximize2 className="w-4 h-4 text-gray-600" />
        </button>
        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <div className="relative mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-contain rounded-md transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 left-0 bg-[#00B853]/10 text-[#00B853] text-xs font-medium px-2 py-1 rounded">
          ORGANIC
        </div>
      </div>

      <p className="text-green-500 text-xs font-medium">IN STOCK</p>
      <Link href={`/product/${id}`}>
        <h3 className="text-gray-800 font-medium text-sm min-h-[40px] line-clamp-2 hover:text-blue-600">
          {title}
        </h3>
      </Link>

      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-4 h-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-xs text-gray-500 ml-1">1</span>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <p className="line-through text-sm text-gray-500">$20.00</p>
        <p className="text-red-500 font-bold text-lg">${price}</p>
      </div>

      {!isAdded ? (
        <Button
          onClick={handleAddToCart}
          variant="outline"
          className="w-full text-white hover:text-white rounded-full bg-[#233a95] font-medium hover:bg-[#233a95]/90 transition-colors"
        >
          Add to cart
        </Button>
      ) : (
        <div className="flex items-center justify-between border rounded-lg">
          <button
            onClick={handleDecrement}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-l-lg border-r"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-gray-700 font-medium text-lg px-4">
            {itemInCart?.quantity || 0}
          </span>
          <button
            onClick={handleIncrement}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-r-lg border-l bg-[#FDC040]"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default NewProdact;
