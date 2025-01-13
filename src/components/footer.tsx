import Link from "next/link";
import { BadgeDollarSign, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = {
  "FRUIT & VEGETABLES": [
    "Fresh Vegetables",
    "Herbs & Seasonings",
    "Fresh Fruits",
    "Cuts & Sprouts",
    "Exotic Fruits & Veggies",
    "Packaged Produce",
    "Party Trays",
  ],
  "BREAKFAST & DAIRY": [
    "Milk & Flavoured Milk",
    "Butter and Margarine",
    "Cheese",
    "Eggs Substitutes",
    "Honey",
    "Marmalades",
    "Sour Cream and Dips",
    "Yogurt",
  ],
  "MEAT & SEAFOOD": [
    "Breakfast Sausage",
    "Dinner Sausage",
    "Beef",
    "Chicken",
    "Sliced Deli Meat",
    "Shrimp",
    "Wild Caught Fillets",
    "Crab and Shellfish",
    "Farm Raised Fillets",
  ],
  BEVERAGES: [
    "Water",
    "Sparkling Water",
    "Soda & Pop",
    "Coffee",
    "Milk & Plant-Based Milk",
    "Tea & Kombucha",
    "Drink Boxes & Pouches",
    "Craft Beer",
    "Wine",
  ],
  "BREADS & BAKERY": [
    "Milk & Flavoured Milk",
    "Butter and Margarine",
    "Cheese",
    "Eggs Substitutes",
    "Honey",
    "Marmalades",
    "Sour Cream and Dips",
    "Yogurt",
  ],
};

const features = [
  {
    title: "Everyday fresh products",
    icon: <BadgeDollarSign />,
  },
  {
    title: "Free delivery for order over $70",
    icon: <BadgeDollarSign />,
  },
  {
    title: "Daily Mega Discounts",
    icon: <BadgeDollarSign />,
  },
  {
    title: "Best price on the market",
    icon: <BadgeDollarSign />,
  },
];

const Newsletter = () => {
  return (
    <div className="w-full bg-[#233a95] py-8 md:py-16 relative overflow-hidden">
      <div className="container max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-start px-4 relative z-10">
        <div className="text-white space-y-2 text-center md:text-left mb-6 md:mb-0">
          <p className="text-[15px] md:text-[17px] text-gray-200">$20 discount for your first order</p>
          <h2 className="text-2xl md:text-[32px] font-bold leading-tight">Join our newsletter and get...</h2>
          <p className="text-sm md:text-[15px] text-gray-300">Join our email subscription now to get updates</p>
          <p className="text-sm md:text-[15px] text-gray-300">on promotions and coupons.</p>
          
          <div className="w-full md:w-[520px] mt-4 md:mt-6">
            <div className="bg-white rounded-lg flex items-center h-[45px] md:h-[52px] relative">
              <div className="absolute left-3 md:left-4 flex items-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V17C21 17.5304 20.7893 18.0391 20.4142 18.4142C20.0391 18.7893 19.5304 19 19 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V7Z" stroke="#9B9BB4" strokeWidth="1.5"/>
                  <path d="M3 7L12 13L21 7" stroke="#9B9BB4" strokeWidth="1.5"/>
                </svg>
              </div>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full h-full pl-10 md:pl-12 pr-24 md:pr-28 rounded-lg border-0 focus:ring-0 text-sm md:text-[15px] placeholder:text-gray-400"
              />
              <button className="absolute right-2 bg-[#233a95] text-white px-4 md:px-6 py-1.5 md:py-2 rounded-lg hover:bg-[#233a95]/90 transition-colors text-sm md:text-[15px] font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block max-w-[1200px] mx-auto absolute right-0 top-0 h-full w-1/2">
        <img 
          src="https://klbtheme.com/bacola/wp-content/uploads/2021/04/coupon.png" 
          alt="coupon"
          className="absolute right-0 bottom-0 w-[500px] object-contain"
        />
      </div>
    </div>
  );
};

export function Footer() {
  return (
    <footer className="w-full bg-white">
      <Newsletter />
      <div className="w-full max-w-[1200px] mx-auto bg-white px-4 lg:px-0">
        <div className="container border-b py-6 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-2">
                {feature.icon}
                <span className="text-xs md:text-sm font-medium">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {Object.entries(categories).map(([category, items]) => (
              <div key={category} className="space-y-3 md:space-y-4">
                <h3 className="text-sm font-semibold">{category}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-xs md:text-sm text-gray-500 hover:text-gray-900"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t bg-gray-50">
          <div className="container py-6 md:py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
              <div className="flex items-center gap-2">
                <Phone className="h-4 md:h-5 w-4 md:w-5" />
                <div>
                  <p className="text-base md:text-lg font-semibold">8 800 555-55</p>
                  <p className="text-xs md:text-sm text-gray-500">Working 8:00 - 22:00</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="text-center md:text-left">
                  <p className="text-xs md:text-sm">Download App on Mobile :</p>
                  <p className="text-xs md:text-sm text-gray-500">
                    15% discount on your first purchase
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link href="#">
                    <Button
                      variant="outline"
                      className="h-8 md:h-10 bg-black px-4 md:px-6 text-white hover:bg-black/90 text-xs md:text-sm"
                    >
                      App Store
                    </Button>
                  </Link>
                  <Link href="#">
                    <Button
                      variant="outline"
                      className="h-8 md:h-10 bg-black px-4 md:px-6 text-white hover:bg-black/90 text-xs md:text-sm"
                    >
                      Google Play
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex gap-4">
                {["Facebook", "Twitter", "Instagram"].map((social) => (
                  <Link 
                    key={social}
                    href="#" 
                    className="text-xs md:text-sm text-gray-500 hover:text-gray-900"
                  >
                    {social}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
