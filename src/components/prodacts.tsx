"use client"

import { productDataType } from "@/service/queryes";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Heart, Maximize2, Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/features/cartSlice";
import { RootState } from "@/redux/store";
import Link from 'next/link';

const Prodacts = ({ id, title, price, image }: productDataType) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemInCart = cartItems.find(item => item.id === id);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (itemInCart?.quantity === 0 || !itemInCart) {
      setIsAdded(false);
    }
  }, [itemInCart]);

  const handleAddToCart = () => {
    dispatch(addToCart({ id, title, price, image, quantity: 0 }));
    setIsAdded(true);
  };

  const handleIncrement = () => {
    dispatch(addToCart({ id, title, price, image, quantity: 0 }));
  };

  const handleDecrement = () => {
    if (itemInCart?.quantity === 1) {
      dispatch(removeFromCart(id));
      setIsAdded(false);
    } else {
      dispatch(removeFromCart(id));
    }
  };

  return (
    <div className="group bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2 hover:scale-105 transition-transform transform relative">
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

      <p className="text-green-500 text-[12px]">IN STOCK</p>
      <Link href={`/product/${id}`}>
        <h3 className="text-gray-800 font-medium text-[15px] mb-2 hover:text-blue-600">
          {title}
        </h3>
      </Link>
      <div className="flex items-center mb-4 gap-2">
        <p className="line-through text-[15px] text-gray-500 font-medium">
          $20.00
        </p>
        <p className="text-red-500 font-bold text-xl mr-2">${price}</p>
      </div>

      {!isAdded ? (
        <Button
          onClick={handleAddToCart}
          variant="outline"
          className="w-full text-[#2bbef9] hover:text-white rounded-2xl font-bold hover:bg-[#2bbef9]"
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
};

export default Prodacts;
