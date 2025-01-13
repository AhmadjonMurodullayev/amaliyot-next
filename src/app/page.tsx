import { getBanner, getProducts } from "@/service/queryes";
import React from "react";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Banner from "@/components/banner";
import Image from "next/image";
import Prodacts from "@/components/prodacts";
import { CarouselWrapper } from "@/components/carusel/carusel";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Countdown from "@/components/soat/soat";
import NewProdact from "@/components/new-prodact";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
export default async function Home() {
  const data = await getBanner();
  const products = await getProducts();

  return (
    <>
      <div className="max-w-[1200px] mx-auto w-full flex justify-end px-4 lg:px-0">
        <CarouselWrapper className="w-full max-w-[900px]">
          <CarouselContent className="-ml-2 md:-ml-4">
            {data?.results?.map((item) => (
              <CarouselItem 
                key={item.id} 
                className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/1"
              >
                <Banner image={item.image} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </CarouselWrapper>
      </div>

      <div className="mx-auto max-w-[1200px] w-full my-7 px-4 lg:px-0">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="w-full lg:w-[30%] order-2 lg:order-1">
            <div className="relative">
              <Image
                src="/banner.png"
                alt="logo"
                width={300}
                height={650}
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute top-10 left-10 flex flex-col gap-3">
                <h3 className="text-white">Bacola Natural Foods</h3>
                <div>
                  <h4 className="text-gray-700 text-2xl">Special Organic</h4>
                  <h3 className="text-black text-2xl font-semibold">
                    Roats Burger
                  </h3>
                </div>
                <div className="flex flex-col gap-1">
                  <span>only-from</span>
                  <span className="text-3xl text-red-600 font-bold">$14.99</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[70%] order-1 lg:order-2">
            <div>
              <h2 className="text-2xl font-bold">Best Sellers</h2>
              <p className="text-[#9b9c9db7]">
                Do not miss the current offers until the end of March.
              </p>
            </div>
            <CarouselWrapper className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {products?.results?.map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <Prodacts {...item} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </div>
            </CarouselWrapper>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
          <div className="flex flex-col gap-3 w-full lg:w-[30%]">
            <div className="relative">
              <Image
                src="/banner2.png"
                alt="logo"
                width={300}
                height={650}
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute top-11 left-10 flex flex-col gap-3">
                <h3 className="text-gray-800">Bacola Natural Foods</h3>
                <div>
                  <h4 className="text-gray-700 text-2xl">Freshest Products</h4>
                  <h3 className="text-black text-2xl font-semibold">
                    every hour.
                  </h3>
                </div>
                <div className="flex flex-col gap-1">
                  <span>only-from</span>
                  <span className="text-3xl text-red-600 font-bold">
                    $14.99
                  </span>
                </div>
                <div>
                  <Button className="bg-[#2bbef9] text-white rounded-2xl px-5 py-3 hover:bg-[#2bbef9]">
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-2 w-full lg:w-[85%] rounded-lg">
              <div className="flex items-center gap-5 p-4">
                <div>
                  <Image
                    src="/icon1.png"
                    alt="logo"
                    width={30}
                    height={30}
                    className="rounded-lg"
                  />
                </div>
                <h4>Download the Bacola App to your Phone.</h4>
              </div>
              <div className="flex gap-5 items-center p-4 border-t-2 border-b-2">
                <div>
                  <Image
                    src="/icon2.png"
                    alt="logo"
                    width={30}
                    height={30}
                    className="rounded-lg"
                  />
                </div>
                <h4>Download the Bacola App to your Phone.</h4>
              </div>
              <div className="flex items-center gap-5 p-4">
                <div>
                  <Image
                    src="/icon3.png"
                    alt="logo"
                    width={30}
                    height={30}
                    className="rounded-lg"
                  />
                </div>
                <h4>Download the Bacola App to your Phone.</h4>
              </div>
            </div>

            <div className="w-full lg:w-[85%] flex flex-col gap-3 my-7">
              <h4 className="text-xl font-bold">Trending Products</h4>
              <div className="p-4 border-2 rounded-lg">
                {products?.results?.slice(0, 6)?.map((item) => (
                  <div className="flex items-center gap-3" key={item.id}>
                    <div>
                      <Image
                        src={item.image}
                        alt="logo"
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col gap-3 p-4">
                      <h3 className="font-bold">{item.title}</h3>
                      <span className="flex gap-3">
                        <span className="line-through text-[#9b9c9db7] font-bold">
                          $79.99
                        </span>
                        <span className="text-red-600 font-bold">
                          ${item.price}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col w-full lg:w-[85%] gap-3">
              <h4 className="text-xl font-bold">Customer Comment</h4>
              <div className="p-8 rounded-lg flex flex-col gap-3 bg-[#ff6a0020]">
                <h4 className="font-bold">The Best Marketplace</h4>
                <p className="text-[#71778e] w-[235px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut.
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="./avatar.png" alt="logo" />
                  </Avatar>
                  <span>
                    <h4 className="font-bold">Tina Mcdonnell</h4>
                    <p className="text-[#71778e]">Sales Manager</p>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full lg:w-[70%]">
            <div className="w-full justify-between flex h-[150px] items-center bg-[#f7f7f7] rounded-lg p-4">
              <div className="flex flex-col gap-2">
                <h4>Always Taking Care</h4>
                <h3 className="text-[#71778e] font-bold text-[18px]">
                  In store or online your health & safety is our top priority.
                </h3>
              </div>
              <div className="flex w-[300px] h-[100px] object-cover">
                <Image
                  src="/store.png"
                  alt="logo"
                  width={100}
                  height={100}
                  className="rounded-lg w-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <span className="flex gap-2">
                  <h4 className="text-xl font-bold">HOT PRODUCT FOR </h4>
                  <h4 className="text-xl font-bold text-red-500">THIS WEEK</h4>
                </span>
                <p className="text-[#9b9c9db7]">
                  Dont miss this opportunity at a special discount just for this
                  week.
                </p>
              </div>
            </div>

            <div className="flex border-2 gap-5 border-[#f53434] rounded-lg p-4">
              <div className="relative">
                <img
                  src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-50.jpg"
                  alt=""
                  className="w-[200px] h-[200px] object-cover"
                />
                <span className="bg-[#f53434] text-white absolute top-0 left-0 font-bold text-xl w-[70px] h-[70px] rounded-[50%] flex items-center justify-center">
                  19%
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <span className="line-through text-[#9b9c9db7] font-bold text-xl">
                    $5.49
                  </span>
                  <span className="text-red-500 font-bold text-xl">$6.99</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-xl font-bold">
                    Chobani Complete Vanilla Greek Yogurt
                  </h1>
                  <span className="flex gap-2">
                    <p className="text-[#9b9c9db7] text-[12px] font-bold">
                      1 kg
                    </p>
                    <p className="text-green-500 text-[12px] font-bold">
                      IN STOCK
                    </p>
                  </span>
                </div>
                <div>
                  <Progress 
                    color="red" 
                    value={100} 
                    className="w-[150px] sm:w-[200px] md:w-[300px] lg:w-full" 
                  />
                </div>
                <div className="flex gap-2 my-2">
                  <Countdown />
                  <p className="text-[#9b9c9db7] text-[12px] font-bold w-[130px]">
                    Remains until the end of the offer
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#ed174938] font-bold flex items-center justify-center p-6 rounded-lg gap-2">
              <p className="text-[#ed174a] font-bold">
                Super discount for your{" "}
              </p>
              <p className="text-[#ed174a] font-bold border-b-2 border-[#ed174a]">
                first purchase.
              </p>
              <button className="border-2 border-[#ed174a] text-[#ed174a] px-4 py-1 rounded-lg">
                FREE25BAC
              </button>
            </div>

            <div className="my-[30px]">
              <h3 className="text-2xl font-bold">NEW PRODUCT</h3>
              <p className="text-[#9b9c9db7] text-[12px]">
                New product whith updeted price
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products?.results?.map((item) => (
                <NewProdact key={item.id} {...item} />
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-4 my-4">
              <div className="relative w-full md:w-1/2">
                <Image
                  src="/banner01.png"
                  alt="banner"
                  width={420}
                  height={240}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-1">
                  <h4 className="text-xl font-bold text-[#00b853]">
                    Weekend Discount 40%
                  </h4>
                  <h3 className="text-2xl font-bold text-[#3e445a]">
                    Legumes & Cereals
                  </h3>
                  <p className="text-[#9b9c9db7] font-bold text-[12px]">
                    Feed your family the best{" "}
                  </p>
                </div>
              </div>
              <div className="relative w-full md:w-1/2">
                <Image
                  src="/banner02.png"
                  alt="banner"
                  width={420}
                  height={240}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-1">
                  <h4 className="text-xl font-bold text-[#00b853]">
                    Weekend Discount 40%
                  </h4>
                  <h3 className="text-2xl font-bold text-[#3e445a]">
                    Dairy & Eggs{" "}
                  </h3>
                  <p className="text-[#9b9c9db7] font-bold text-[12px]">
                    A different kind of grocery store{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] w-full"></div>
    </>
  );
}
