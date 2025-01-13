"use client";

import Image from "next/image";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Korzinka from "../../public/icons/korzinka";
import Sorch from "../../public/icons/sorch";
import { Badge } from "./ui/badge";
import Burger from "../../public/icons/burger";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { Menu, Store, Heart, User, X } from "lucide-react";
import { removeItemCompletely } from "@/redux/features/cartSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector(
    (state: RootState) => state.cart
  );

  const handleRemoveItem = (id: number) => {
    dispatch(removeItemCompletely(id));
  };

  return (
    <header className="w-full bg-white shadow-sm">
      {/* Top Header */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto max-w-[1200px] py-3 px-4 lg:px-0">
          <div className="flex justify-between items-center">
            {/* Menu Button - Mobile Only */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-transparent p-4"
            >
              <Menu className="h-5 w-5 text-gray-700" />
            </Button>

            {/* Logo */}
            <div className="flex flex-col items-center lg:items-start">
              {/* Desktop Logo */}
              <Image
                src="/logo.png"
                alt="logo"
                width={250}
                height={250}
                className="mb-1 hidden lg:block"
              />
              {/* Mobile Logo */}
              <Image
                src="/min-logo.png"
                alt="logo"
                width={110}
                height={90}
                className="lg:hidden"
              />
            </div>

            {/* Search - Desktop Only */}
            <div className="flex-1 max-w-[600px] mx-8 hidden lg:block">
              <div className="relative">
                <Input
                  className="w-full border border-gray-200 rounded-full px-6 py-7 bg-[#f3f4f7]"
                  placeholder="Search for products..."
                />
                <Button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-gray-100 rounded-full w-12 h-12"
                  variant="ghost"
                >
                  <Sorch />
                </Button>
              </div>
            </div>

            {/* Cart with Price */}
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900 lg:text-base">
                  ${totalAmount.toFixed(2)}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="relative cursor-pointer">
                      <Badge
                        className="rounded-full w-[40px] h-[40px] lg:w-[45px] lg:h-[45px] bg-white hover:bg-gray-50 border border-gray-200"
                        variant="outline"
                      >
                        <Korzinka />
                      </Badge>
                      {totalQuantity > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] lg:text-xs font-medium rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center">
                          {totalQuantity}
                        </span>
                      )}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[320px] p-0 border border-gray-100 rounded-lg shadow-lg"
                    align="end"
                  >
                    {items.length === 0 ? (
                      <div className="py-8 px-4">
                        <div className="flex justify-center mb-4">
                          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                            <Image
                              src="/korzinka.png"
                              alt="Empty Cart"
                              width={32}
                              height={32}
                            />
                          </div>
                        </div>
                        <p className="text-center text-gray-700 font-medium mb-1">
                          No products in the cart.
                        </p>
                        <p className="text-gray-500 text-xs text-center">
                          We reduce shipping prices to only 2.49 €!
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="max-h-[300px] overflow-auto">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100"
                            >
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-[60px] h-[60px] object-contain rounded bg-gray-50"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm text-gray-700 font-medium line-clamp-2">
                                  {item.title}
                                </h4>
                                <div className="flex items-center text-sm mt-1">
                                  <span className="text-gray-500">
                                    {item.quantity} ×
                                  </span>
                                  <span className="text-red-500 font-bold ml-1">
                                    ${item.price}
                                  </span>
                                </div>
                              </div>
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-gray-400 hover:text-red-500 p-1 transition-colors duration-200"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>

                        <div className="p-4 bg-gray-50">
                          <div className="flex justify-between mb-4">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="text-[#233a95] font-bold">
                              ${totalAmount.toFixed(2)}
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <Link href="/cart" className="flex-1">
                              <Button
                                variant="outline"
                                className="w-full bg-white hover:bg-gray-50 border-gray-200"
                              >
                                View cart
                              </Button>
                            </Link>
                            <Link href="/checkout" className="flex-1">
                              <Button className="w-full bg-[#233a95] hover:bg-[#233a95]/90 text-white">
                                Checkout
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block container mx-auto max-w-[1200px] py-4">
        <div className="flex items-center justify-between">
          <Button className="bg-[#233a95] hover:bg-[#233a95]/90 text-white rounded-full px-6 py-6 flex items-center gap-2">
            <Burger />
            <span className="font-medium">All Categories</span>
          </Button>

          <nav className="flex items-center gap-8">
            {["Meats & Seafood", "Bakery", "Beverages", "Blog", "Contact"].map(
              (item) => (
                <Link
                  key={item}
                  href="/"
                  className="text-gray-700 hover:text-[#233a95] font-medium transition-colors"
                >
                  {item.toUpperCase()}
                </Link>
              )
            )}
          </nav>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t lg:hidden">
        <div className="grid grid-cols-5 gap-1">
          <Link href="/" className="flex flex-col items-center py-2 px-1">
            <Store className="h-5 w-5 text-gray-600" />
            <span className="text-[10px] mt-1 text-gray-600">Store</span>
          </Link>
          <Link href="/search" className="flex flex-col items-center py-2 px-1">
            <Sorch />
            <span className="text-[10px] mt-1 text-gray-600">Search</span>
          </Link>
          <Link
            href="/categories"
            className="flex flex-col items-center py-2 px-1"
          >
            <div className="rounded-full bg-[#233a95] p-2.5 -mt-7 shadow-lg border-[3px] border-white">
              <Burger />
            </div>
            <span className="text-[10px] mt-1 text-gray-600">Categories</span>
          </Link>
          <Link
            href="/wishlist"
            className="flex flex-col items-center py-2 px-1"
          >
            <Heart className="h-5 w-5 text-gray-600" />
            <span className="text-[10px] mt-1 text-gray-600">Wishlist</span>
          </Link>
          <Link
            href="/account"
            className="flex flex-col items-center py-2 px-1"
          >
            <User className="h-5 w-5 text-gray-600" />
            <span className="text-[10px] mt-1 text-gray-600">Account</span>
          </Link>
        </div>
      </div>

      {/* Padding for Mobile Bottom Navigation */}
      <div className="h-16 lg:hidden" />
    </header>
  );
};

export default Header;
