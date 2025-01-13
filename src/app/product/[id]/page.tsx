"use client"

import { useEffect, useState } from 'react';
import { getProductById, getProducts } from '@/service/queryes';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '@/redux/features/cartSlice';
import { RootState } from '@/redux/store';
import { Heart, Minus, Plus } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemInCart = cartItems.find(item => item.id === Number(params.id));
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
      dispatch(addToCart({ 
        id: product.id, 
        title: product.title, 
        price: product.price, 
        image: product.image,
        quantity: 0 
      }));
      setIsAdded(true);
    }
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto max-w-[1200px] py-8">
      <div className="flex gap-8">
        {/* Left - Product Image */}
        <div className="w-1/2">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-[400px] object-contain"
              />
              <span className="absolute top-0 left-0 bg-[#2bbef9] text-white text-sm px-3 py-1 rounded">
                23% OFF
              </span>
              <span className="absolute top-0 left-20 bg-gray-600 text-white text-sm px-3 py-1 rounded">
                RECOMMENDED
              </span>
            </div>
          </div>
        </div>

        {/* Right - Product Details */}
        <div className="w-1/2 space-y-4">
          <div className="flex items-center gap-2 text-gray-500">
            <span>Brands:</span>
            <span className="text-[#2bbef9]">Welch's</span>
            <span className="mx-2">|</span>
            <span>SKU: ZU49VOR</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500">1 REVIEW</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="line-through text-gray-400">$9.35</span>
            <span className="text-2xl font-bold text-red-500">$7.25</span>
          </div>

          {/* Stock Status */}
          <div className="inline-block bg-green-100 text-green-600 text-sm px-3 py-1 rounded">
            IN STOCK
          </div>

          {/* Description */}
          <p className="text-gray-600">
            {product.description}
          </p>

          {/* Add to Cart Section */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={handleDecrement}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-medium">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 bg-[#FDC040]"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-[#233a95] hover:bg-[#233a95]/90 text-white py-6 rounded-lg"
            >
              Add to cart
            </Button>

            <button className="w-12 h-12 flex items-center justify-center border rounded-lg hover:bg-gray-50">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Additional Info */}
          <div className="pt-6 space-y-3">
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

          {/* Covid Info */}
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mt-6">
            Covid-19 Info: We keep delivering.
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-16">
        <div className="border-b flex gap-8">
          <button className="px-6 py-3 text-gray-900 font-medium border-b-2 border-gray-900 -mb-[1px]">
            DESCRIPTION
          </button>
          <button className="px-6 py-3 text-gray-500 hover:text-gray-700">
            ADDITIONAL INFORMATION
          </button>
          <button className="px-6 py-3 text-gray-500 hover:text-gray-700">
            REVIEWS (1)
          </button>
        </div>

        {/* Description Content */}
        <div className="py-8 space-y-6 text-gray-600">
          <p>
            Quisque varius diam vel metus mattis, id aliquam diam rhoncus. Proin vitae magna in dui finibus malesuada et at nulla. Morbi elit ex, viverra vitae ante vel, blandit feugiat ligula. Fusce fermentum iaculis nibh, at sodales leo maximus a.
          </p>
          <p>
            Nullam ultricies sodales nunc, in pellentesque lorem mattis quis. Cras imperdiet est in nunc tristique lacinia. Nullam aliquam mauris eu accumsan tincidunt. Suspendisse velit ex, aliquet vel ornare vel, dignissim a tortor.
          </p>
          <p>
            Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat auctor, eleifend nunc a, lobortis neque. Praesent aliquam dignissim viverra. Maecenas lacus odio, feugiat eu nunc sit amet, maximus sagittis dolor. Vivamus nisi sapien, elementum sit amet eros sit amet, ultricies cursus ipsum.
          </p>
        </div>

   
      </div>

      {/* Related Products Section */}
      <div className="mt-16">
        <h2 className="text-xl font-bold mb-8">RELATED PRODUCTS</h2>
        <div className="grid grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm">
              {/* Discount Badge */}
              <div className="relative">
                <span className="absolute top-2 left-2 bg-[#2bbef9] text-white text-xs px-2 py-1 rounded">
                  {Math.floor(Math.random() * 30 + 10)}% OFF
                </span>
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-48 object-contain mb-4"
                />
              </div>

              {/* Product Title */}
              <Link href={`/product/${product.id}`}>
                <h3 className="text-gray-800 font-medium text-sm mb-2 hover:text-[#2bbef9]">
                  {product.title}
                </h3>
              </Link>

              {/* Weight/Size */}
              <div className="text-sm text-gray-500 mb-2">1 kg</div>

              {/* Stock Status */}
              <div className="text-green-500 text-sm mb-2">IN STOCK</div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-gray-500">1</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mb-4">
                <span className="line-through text-gray-400">${(Number(product.price) * 1.2).toFixed(2)}</span>
                <span className="text-red-500 font-bold">${product.price}</span>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full bg-white text-[#2bbef9] border border-[#2bbef9] hover:bg-[#2bbef9] hover:text-white py-2 rounded-full transition-colors">
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 