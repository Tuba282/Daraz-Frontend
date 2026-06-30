import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "./Image";


const Footer = () => {
  const customerCareLinks = [
    "Help Center",
    "How to Buy",
    "Corporate & Bulk Purchasing",
    "Returns & Refunds",
    "Daraz Shop",
    "Contact Us",
    "Purchase Protection",
    "Daraz Pick up Points",
  ];

  const darazLinks = [
    "About Us",
    "Digital Payments",
    "Daraz Donates",
    "Daraz Blog",
    "Terms & Conditions",
    "Privacy Policy",
    "NTN Number : 4012118-6",
    "STRN Number : 1700401211818",
    "Online Shopping App",
    "Online Grocery Shopping",
    "Daraz Exclusive",
    "Daraz University",
    "Sell on Daraz",
    "Join Daraz Affiliate Program",
  ];

  const paymentMethods = [
    { src: "/footer/cod.png", alt: "Cash on Delivery" },
    { src: "/footer/visa.png", alt: "Visa" },
    { src: "/footer/mastercard.png", alt: "Mastercard" },
    { src: "/footer/easypasa.png", alt: "Easypaisa" },
    { src: "/footer/darazwallet.png", alt: "Daraz Wallet" },
    { src: "/footer/jazzcash.png", alt: "JazzCash" },
    { src: "/footer/unionpay.png", alt: "UnionPay" },
    { src: "/footer/hblbank.png", alt: "HBL" },
    { src: "/footer/easymonthly.png", alt: "Easy Monthly Installments" },
  ];

  const seoData = [
    {
      title: "MOBILE PHONES IN PAKISTAN",
      content: "Apple iPhones , Honor Mobiles , Huawei Mobiles , Tecno Mobiles , Redmi Mobiles , Xiaomi Mi Mobiles , Nokia Mobiles , OnePlus Mobiles , Oppo Mobile Phones , Realme Mobiles , Samsung Mobile Phones , Vivo Mobile Phones , Mobile Accessories , Smart Watches"
    },
    {
      title: "LATEST LAPTOPS",
      content: "Dell Laptops , HP Laptops , Lenovo Laptops , Mouse , Gaming Graphic Cards , lenovo ideapad 3 , Macbook Pro 13 , Hp Probook 650 G2"
    },
    {
      title: "LED TV",
      content: "Changhong Led Tv , LG Led Tv , Samsung Led Tv , Sony Led Tv , TCL LED TVs"
    },
    {
      title: "HOME APPLIANCES",
      content: "Microwave oven , Geyser , Heater , Refrigerators , Deep Freezers , Generators , Water Dispensers , Fans , Room Cooler , Table Fans , Wall Fans , Exhaust Fans , Pedestal Fans , Window Ac , Solar Panel , Washing Machine"
    },
    {
      title: "DSLR CAMERAS",
      content: "Camera Tripods , Drones , IP & CCTV Cameras , Nikon D7000 , Nikon D5600 , Canon 200D , Canon 1200D , Fujifilm Instax Mini 11 , Canon M50"
    },
    {
      title: "HEALTH & BEAUTY",
      content: "sunisa foundation , Biofad , janssen facial kit , Glutathione Injection , Glutathione Cream , Sauvage , Glutathione Tablets , Glutathione Soap , Infrared Thermometers , N95 Mask"
    },
    {
      title: "TRENDING",
      content: "Online Bills , Core I5 Laptop , Gtx 1060 , Samsung A32 , Samsung A51 , Samsung A52 , Samsung A71 , Samsung A72 , Samsung M31 , Samsung S20 , Samsung S20 Ultra 5G , Samsung S21 , Samsung S21 Ultra , Samsung Z Flip , Tecno Camon 17 , Tecno Spark 6 , Vivo V20 , Poco X3 Pro , Vivo V21 , Vivo V21E , Vivo X70 Pro , Vivo Y12 , Vivo Y12S , Vivo Y1S , Vivo Y20 , Vivo Y51 , Vivo Y51S , Oppo F19 Pro , Oppo Reno 6 , Xiaomi Poco F3 , Xiaomi Poco M3 , Xiaomi Poco X3 , Xiaomi Poco X3 Gt , Xiaomi Redmi 9C , Xiaomi Redmi Note 10 Pro , Sharp Aquos R2"
    },
    {
      title: "WOMEN'S FASHION",
      content: "Al-Karam Studio , Warda , Salitex , Bonanza Satrangi , Edenrobe , Firdous , Junaid Jamshed , Limelight , Sana Safinaz , Mahru , Pushup Bra , Women Undergarments"
    },
    {
      title: "MEN'S FASHION",
      content: "Men's Shirts , Men's T-Shirts"
    },
    {
      title: "ONLINE GROCERY STORE",
      content: "Oil & Ghee , Basmati Rice , Dried Fruits , Chocolates , Mattresses"
    },
    {
      title: "ONLINE BOOK STORE",
      content: "English Books , Islamic Books , History Books , English Literature Books , Kids Urdu Stories , Pride & Prejudice , Harry Potter Story Books , Namal Novel , Nimra Ahmed Novels"
    },
    {
      title: "AIR CONDITIONERS",
      content: "Kenwood Ac , Haier Ac , Gree Ac , Dawlance Ac , Orient Ac , Ecostar Ac , Inverex Solar Ac , Pel Ac"
    },
    {
      title: "TOP MOBILE PHONES",
      content: "Nokia G20 , redmi 9 , realme 7 pro , realme c15 , realme c21 , vivo y20s , realme c11 Price in Pakistan , itel vision 1 pro price in pakistan , samsung galaxy a02 price in pakistan , Infinix Hot 10 , Infinix Hot 8 , Infinix Hot 9 , Infinix Note 10 Pro , Infinix Note 7 , Infinix Note 8 , Infinix Zero 8 , Inifnix Smart 5 , iPhone 11 , iPhone 12 , iphone 12 Pro Max , iPhone 12 Pro , iPhone 6 , Itel A25 , Mi 10T , Nokia 105 , Oppo A15 , Oppo A15S , Oppo A53 , Oppo A54 , Infinix Zero X Pro , Infinix Zero X Neo , Oppo F19 , Oppo Reno 5 , Oppo Reno 5 Pro , Xiaomi Poco M3 Pro , Realme 6 Pro , Realme 8 , Realme Narzo 30A , Samsung A02S , Samsung A11 , Samsung A12 , Samsung A31 , Vivo Y33s , Infinix Note 11 , Tecno Spark 6 Go , Samsung A52s , Samsung Tab A7 Lite"
    },
    {
      title: "SHOP WORLDWIDE WITH LAZADA",
      content: "Singapore , Malaysia , Philippines , Indonesia , Vietnam , Thailand"
    },
    {
      title: "SHOP WORLDWIDE WITH MIRAVIA",
      content: "Spain , Portugal"
    }
  ];

  return (
    <footer className="font-sans">
      <div>
        {/* Top Section */}
        <div className="bg-[#F4F4F6] py-10 px-4 sm:px-8">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Customer Care */}
            <div>
              <h3 className="text-[#0f136d] text-[16px] mb-4">Customer Care</h3>
              <ul className="">
                {customerCareLinks.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-[#0f136d] text-[12px] hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Daraz */}
            <div>
              <h3 className="text-[#0f136d] text-[16px] mb-4">Daraz</h3>
              <ul className="">
                {darazLinks.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-[#0f136d] text-[12px] hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* App Download Icon & Text */}
            <div className="flex items-start gap-4 mt-2">
              <Image
                src="/footer/darazicon.png"
                alt="Daraz Icon"
                className="w-10 h-10 rounded-lg object-contain bg-white"
              />
              <div className="flex flex-col">
                <span className="text-[#f36f21] text-[15px]">Happy Shopping</span>
                <span className="text-[#0f136d] text-[15px]">Download App</span>
              </div>
            </div>

            {/* App Store Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-2  ">
              <div>
              <Image
                src="/footer/appstrore.png"
                alt="App Store"
                className="md:h-[50px] h-10 cursor-pointer object-cover w-fit mt-3"
              />
              <Image
                src="/footer/googleplay.png"
                alt="Google Play"
                className="md:h-[50px] h-10 cursor-pointer object-cover w-fit mt-3"
              />
              </div>
              <div>
                <Image
                  src="/footer/appgallery.png"
                  alt="App Gallery"
                  className="md:h-[50px] h-10 cursor-pointer object-cover w-fit mt-3"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-white py-10 px-4 sm:px-8">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Payment Methods */}
            <div className="md:col-span-2">
              <h3 className="text-[#2e2e2e] text-[16px] mb-4">Payment Methods</h3>
              <div className="flex flex-wrap md:w-[350px] gap-2">
                {paymentMethods.map((method, index) => (
                  <Image
                    key={index}
                    src={method.src}
                    alt={method.alt}
                    className="h-8 object-contain"
                  />
                ))}
              </div>
            </div>

            {/* Verified by */}
            <div className="md:col-span-2">
              <h3 className="text-[#2e2e2e] text-[16px] mb-4">Verified by</h3>
              <Image src="/footer/pcipass.png" alt="PCI DSS" className="h-10 object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Descriptive SEO Section */}
      <div className="bg-[#f4f4f6] py-10 px-4 sm:px-8 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Left Text Block (Spans 2 columns on grid, internally flows in 2 columns) */}
          <div className="md:col-span-2 text-[#888888] text-[12px] font-light leading-relaxed columns-1 md:columns-2 gap-8" style={{ columnGap: '2rem' }}>
            <h2 className="text-[#888888] text-[18px] font-normal mb-2 break-inside-avoid leading-tight">How Daraz Transformed Online Shopping in Pakistan</h2>
            <h3 className="text-[#888888] text-[14px] font-normal mb-2 break-inside-avoid">How Daraz Transformed Online Shopping in Pakistan</h3>
            <p className="mb-4">Daraz first made waves in Pakistan’s e-commerce market after its introduction in 2012. We have since grown to become Pakistan’s largest platform for online shopping with a network spread across Asia in Pakistan, Bangladesh, Sri Lanka, Myanmar, and Daraz.com.np. Our vision was to provide a safe, efficient online marketplace platform for vendors and customers across the country to come together. We started off exclusively as an online fashion retail platform and over the years expanded to become a complete one-stop solution for all your buying needs. Daraz prides itself on not being just another ecommerce venture in Asia. We work tirelessly to make sure that we provide users with the best online online shopping experience and value for their purchases. Whether you shop online through our website or our online shopping mobile App, you can expect easy navigation, customized recommendations, and a smooth online shopping experience guaranteed.</p>

            <h2 className="text-[#888888] text-[18px] font-normal mb-2 break-inside-avoid leading-tight mt-6">What Makes Us Different from Other Online Shopping Platforms?</h2>

            <h4 className="text-[#888888] font-bold mb-1 break-inside-avoid text-[12px] mt-4">Select from the Largest Online Marketplace in Pakistan</h4>
            <p className="mb-4">With over 15 million products to select from, Daraz offers its customers the most comprehensive listing of products in the country. Whether you’re looking for electronics, apparel, appliances, or groceries – there is something for everyone.</p>

            <h4 className="text-[#888888] font-bold mb-1 break-inside-avoid text-[12px] mt-4">Hassle Free Delivery</h4>
            <p className="mb-4">Online shopping is only as good as its execution and Daraz promises hassle free delivery right from the moment you order to when your package is dropped at your door. We cater to both major and smaller cities alike, and give you the choice to track your package as it makes its way to you so you always know your order status. If you are unsatisfied with any aspect of your order, we have a simple 7-day return or exchange policy.</p>

            <h4 className="text-[#888888] font-bold mb-1 break-inside-avoid text-[12px] mt-4">Payment Options to Suit Every Style</h4>
            <p className="mb-4">You can choose to pay through a credit/debit card, opt for cash on delivery or even go for EMI (easy monthly instalments). You can also avail exclusive offers by downloading Daraz Wallet – a closed loop digital wallet that offers you a secure, easy way to make payments. We also have easypaisa & jazzcash payment method for our customers' ease</p>

            <h4 className="text-[#888888] font-bold mb-1 break-inside-avoid text-[12px] mt-4">Shop from Verified Vendors</h4>
            <p className="mb-4">Daraz understands that online shopping in Pakistan comes with its fair share of risks. This is why with Daraz Marketplace and Daraz Mall customers have the security of choosing from verified vendors and brands from Karachi, Lahore, Islamabad and all across Pakistan. Now you’ll never have to second guess authenticity because Daraz makes sure to do it for you!</p>

            <h4 className="text-[#888888] font-bold mb-1 break-inside-avoid text-[12px] mt-4">Shop Around the World with Daraz Global Collection</h4>
            <p className="mb-4">International sellers and local convenience come together with Daraz Global collection. Get the chance to shop online from vendors around the world without leaving the Daraz website. Featuring thousands of novelty gadgets and accessories, Daraz Global Collection offers you a selection of products that you won’t find anywhere else when you’re online shopping in Pakistan.</p>

            <h4 className="text-[#888888] font-bold mb-1 break-inside-avoid text-[12px] mt-4">Avail Exclusive Discounts, Offers, and Promotions</h4>
            <p className="mb-4">Online shopping with Daraz means you get the chance to avail exclusive online-only promotional packages as well as discount vouchers from our vendors when you shop from their pages. Our flash sales give you customized product offers all curated with the help of our advanced AI technology so you always have deals you’ll actually be interested in!</p>

            <h4 className="text-[#888888] font-bold mb-1 break-inside-avoid text-[12px] mt-4">Buy Value, not Just Goods with Daraz Care</h4>
            <p className="mb-4">Daraz does not just cater online shopping in Pakistan but also aims to simplify the way you give back to society. With charities spanning across sectors of education, health care, environmental preservation, and shelters, you can choose to make a big difference with a few, simple clicks.</p>

            <h4 className="text-[#888888] font-bold mb-1 break-inside-avoid text-[12px] mt-4">Simplify Corporate Purchases</h4>
            <p className="mb-4">Who says corporate purchases need to be a complicated affair? When you opt for Daraz Corporate, you get an efficient and transparent solution for your business’ bulk purchasing needs. We’re proud to be working with some of the most prestigious organizations in Pakistan across a number of different industries.</p>
          </div>

          {/* Right Categories Block (Spans 2 columns on grid, internally flows in 2 columns) */}
          <div className="md:col-span-2 text-[#888888] text-[12px] font-light leading-relaxed columns-1 md:columns-2 gap-8" style={{ columnGap: '2rem' }}>
            <h2 className="text-[#888888] text-[18px] font-normal mb-4 break-inside-avoid">Top Categories & Brands</h2>

            {seoData.map((category, index) => (
              <div key={index} className="mb-4 break-inside-avoid">
                <h4 className="text-[#888888] font-normal uppercase mb-1">{category.title}</h4>
                <p>{category.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* last */}
      <div className="bg-white py-6 px-4 sm:px-8 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">

          {/* Daraz International */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[#333333] text-[15px] font-normal">Daraz International</h3>
            <div className="flex flex-wrap items-center gap-4">
              {[
                { name: "Pakistan", icon: "/footer/pak.png" },
                { name: "Bangladesh", icon: "/footer/ban.png" },
                { name: "Sri Lanka", icon: "/footer/sri.png" },
                { name: "Myanmar", icon: "/footer/may.png" },
                { name: "Nepal", icon: "/footer/nep.png" },
                // { name: "Pakistan", icon: "/footer/pak.webp" },
                // { name: "Bangladesh", icon: "/footer/ban.webp" },
                // { name: "Sri Lanka", icon: "/footer/sri.webp" },
                // { name: "Myanmar", icon: "/footer/may.webp" },
                // { name: "Nepal", icon: "/footer/nep.webp" },
              ].map((country, idx) => (
                <div key={idx} className="flex items-center gap-2 cursor-pointer group">
                  <Image src={country.icon} alt={country.name} className="w-[26px] h-[26px] rounded-full object-cover" />
                  <span className="text-[#888888] text-[13px] group-hover:underline">{country.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Follow Us */}
          <div className="flex flex-col gap-3 md:ml-12">
            <h3 className="text-[#333333] text-[15px] font-normal">Follow Us</h3>
            <div className="flex items-center gap-3">
              <FaFacebook className="text-[#1877F2] text-[28px] cursor-pointer" />
              <div className="bg-black text-white w-[28px] h-[28px] rounded-full flex items-center justify-center cursor-pointer">
                <FaXTwitter className="text-[16px]" />
              </div>
              <FaInstagram className="text-[#E4405F] text-[28px] cursor-pointer" />
              <FaYoutube className="text-[#FF0000] text-[28px] cursor-pointer" />
            </div>
          </div>

          {/* Copyright */}
          <div className="text-[#888888] text-[13px] md:ml-auto md:pb-1">
            © Daraz 2026
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
