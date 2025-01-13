"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "../ui/carousel";

interface CarouselWrapperType {
  children: React.ReactNode;
  className?: string | undefined;
}

export function CarouselWrapper({ children, className }: CarouselWrapperType) {
  return (
    <Carousel
      opts={{
        loop: true,
        align: "start",
        skipSnaps: false,
        containScroll: "trimSnaps",
      }}
      className={`w-full ${className}`}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      {children}
    </Carousel>
  );
}
