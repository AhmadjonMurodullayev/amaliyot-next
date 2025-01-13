"use client";

import { useEffect, useState } from "react";
import { getProductById, getProducts } from "@/service/queryes";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/features/cartSlice";
import { RootState } from "@/redux/store";
import { Heart, Minus, Plus } from "lucide-react";
import Link from "next/link";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemInCart = cartItems.find((item) => item.id === Number(params.id));
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(Number(params.id));
      setProduct(data);
    };
    fetchProduct();
  }, [params.id]);

  useEffect(() => {
    if (itemInCart?.quantity === 0 || !itemInCart) {
      setIsAdded(false);
    } else {
      setIsAdded(true);
    }
  }, [itemInCart]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      const data = await getProducts();
      if (data.results) {
        setRelatedProducts(data.results.slice(0, 4)); // Get first 4 products
      }
    };
    fetchRelatedProducts();
  }, []);

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 0,
        })
      );
      setIsAdded(true);
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto max-w-[1200px] py-4 md:py-8 px-4 lg:px-0">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        <div className="w-full lg:w-1/2">
          <div className="bg-white p-4 md:p-8 rounded-lg shadow-sm">
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-[250px] md:h-[400px] object-contain"
              />
              <span className="absolute top-0 left-0 bg-[#2bbef9] text-white text-xs md:text-sm px-2 md:px-3 py-1 rounded">
                23% OFF
              </span>
              <span className="absolute top-0 left-16 md:left-20 bg-gray-600 text-white text-xs md:text-sm px-2 md:px-3 py-1 rounded">
                RECOMMENDED
              </span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-3 md:space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-sm md:text-base text-gray-500">
            <span>Brands:</span>
            <span className="text-[#2bbef9]">Welch's</span>
            <span className="mx-2">|</span>
            <span>SKU: ZU49VOR</span>
          </div>

          <h1 className="text-xl md:text-2xl font-bold text-gray-800">{product.title}</h1>

          <div className="flex items-center gap-1 md:gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-3 h-3 md:w-4 md:h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs md:text-sm text-gray-500">1 REVIEW</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="line-through text-sm md:text-base text-gray-400">$9.35</span>
            <span className="text-xl md:text-2xl font-bold text-red-500">$7.25</span>
          </div>

          <div className="inline-block bg-green-100 text-green-600 text-xs md:text-sm px-2 md:px-3 py-1 rounded">
            IN STOCK
          </div>

          <p className="text-sm md:text-base text-gray-600">{product.description}</p>

          <div className="flex flex-col sm:flex-row items-stretch gap-3 md:gap-4 pt-4">
            <div className="flex flex-row sm:flex-1 gap-2">
              <div className="flex items-center border rounded-lg h-[45px] sm:h-[50px]">
                <button
                  onClick={handleDecrement}
                  className="w-11 h-full flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-l-lg"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="w-11 h-full flex items-center justify-center text-gray-600 hover:bg-gray-50 bg-[#FDC040] rounded-r-lg"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-[#233a95] hover:bg-[#233a95]/90 text-white h-[45px] sm:h-[50px] rounded-lg px-4"
              >
                Add to cart
              </Button>
            </div>

            <button className="h-[45px] sm:h-[50px] sm:w-12 flex items-center justify-center border rounded-lg hover:bg-gray-50">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="pt-4 md:pt-6 space-y-2 md:space-y-3">
            <div className="flex items-center gap-3 text-gray-600">
              <span>Type:</span>
              <span className="text-[#2bbef9]">Organic</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <span>MFG:</span>
              <span>Jun 4, 2021</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <span>LIFE:</span>
              <span>30 days</span>
            </div>
          </div>

          <div className="bg-red-50 text-red-600 p-3 md:p-4 rounded-lg mt-4 md:mt-6 text-sm md:text-base">
            Covid-19 Info: We keep delivering.
          </div>
        </div>
      </div>

      <div className="mt-8 md:mt-16">
        <div className="border-b flex gap-4 md:gap-8 overflow-x-auto">
          <button className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base text-gray-900 font-medium border-b-2 border-gray-900 -mb-[1px] whitespace-nowrap">
            DESCRIPTION
          </button>
          <button className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base text-gray-500 hover:text-gray-700 whitespace-nowrap">
            ADDITIONAL INFORMATION
          </button>
          <button className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base text-gray-500 hover:text-gray-700 whitespace-nowrap">
            REVIEWS (1)
          </button>
        </div>

        <div className="py-4 md:py-8 space-y-4 md:space-y-6 text-sm md:text-base text-gray-600">
          <p>
            Quisque varius diam vel metus mattis, id aliquam diam rhoncus. Proin
            vitae magna in dui finibus malesuada et at nulla. Morbi elit ex,
            viverra vitae ante vel, blandit feugiat ligula. Fusce fermentum
            iaculis nibh, at sodales leo maximus a.
          </p>
          <p>
            Nullam ultricies sodales nunc, in pellentesque lorem mattis quis.
            Cras imperdiet est in nunc tristique lacinia. Nullam aliquam mauris
            eu accumsan tincidunt. Suspendisse velit ex, aliquet vel ornare vel,
            dignissim a tortor.
          </p>
          <p>
            Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat
            auctor, eleifend nunc a, lobortis neque. Praesent aliquam dignissim
            viverra. Maecenas lacus odio, feugiat eu nunc sit amet, maximus
            sagittis dolor. Vivamus nisi sapien, elementum sit amet eros sit
            amet, ultricies cursus ipsum.
          </p>
        </div>
      </div>

      <div className="mt-8 md:mt-16">
        <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-8">RELATED PRODUCTS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {relatedProducts.map((product) => (
            <div key={product.id} className="bg-white p-3 md:p-4 rounded-lg shadow-sm">
              <div className="relative">
                <span className="absolute top-2 left-2 bg-[#2bbef9] text-white text-xs px-2 py-1 rounded">
                  {Math.floor(Math.random() * 30 + 10)}% OFF
                </span>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-36 md:h-48 object-contain mb-3 md:mb-4"
                />
              </div>

              <Link href={`/product/${product.id}`}>
                <h3 className="text-gray-800 font-medium text-xs md:text-sm mb-2 hover:text-[#2bbef9] line-clamp-2">
                  {product.title}
                </h3>
              </Link>

              <div className="space-y-2">
                <div className="text-sm text-gray-500 mb-2">1 kg</div>
                <div className="text-green-500 text-sm mb-2">IN STOCK</div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3 h-3 md:w-4 md:h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-gray-500">1</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="line-through text-sm md:text-base text-gray-400">
                    ${(Number(product.price) * 1.2).toFixed(2)}
                  </span>
                  <span className="text-xl md:text-2xl font-bold text-red-500">${product.price}</span>
                </div>
              </div>

              <button className="w-full bg-white text-[#2bbef9] border border-[#2bbef9] hover:bg-[#2bbef9] hover:text-white py-1.5 md:py-2 rounded-full transition-colors text-sm">
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
