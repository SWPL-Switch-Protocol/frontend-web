import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/feature/Header";
import AISummary from "../../components/feature/AISummary";

interface ProductData {
  id: string;
  title: string;
  price: number;
  condition: string;
  category: string;
  distance: string;
  seller: string;
  trustLevel: "High Trust" | "Medium Trust" | "New User";
  completedTrades: number;
  memberSince: string;
  description: string;
  includedItems: string[];
  neighborhood: string;
  images: string[];
}

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [showEscrowModal, setShowEscrowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const mockProducts: Record<string, ProductData> = {
    "1": {
      id: "1",
      title: "Nintendo Switch OLED – White",
      price: 260,
      condition: "Like-new",
      category: "Gaming & Consoles",
      distance: "0.8 mi away",
      seller: "0xA4...92b1",
      trustLevel: "High Trust",
      completedTrades: 12,
      memberSince: "2025",
      description:
        "Gently used Switch OLED purchased in 2024. Includes original box and cables. Screen is in perfect condition with no scratches. Console has been well maintained and works flawlessly. All Joy-Cons function properly with no drift issues.",
      includedItems: [
        "Console",
        "Joy-Cons (White)",
        "Dock",
        "HDMI cable",
        "Power adapter",
      ],
      neighborhood: "Williamsburg",
      images: [
        "/images/unsplash-1578303512597.jpg",
        "/images/unsplash-1629814249584.jpg",
        "/images/unsplash-1612036782180.jpg",
        "/images/unsplash-1592107761705.jpg",
      ],
    },
    "2": {
      id: "2",
      title: "AirPods Pro (2nd Gen) – Like New",
      price: 180,
      condition: "Like-new",
      category: "Electronics & Devices",
      distance: "1.2 mi away",
      seller: "0xB7...43c2",
      trustLevel: "High Trust",
      completedTrades: 18,
      memberSince: "2024",
      description:
        "Apple AirPods Pro 2nd generation in excellent condition. Used for only 3 months. All features working perfectly including active noise cancellation and spatial audio. Comes with original charging case and all ear tips.",
      includedItems: [
        "AirPods Pro",
        "Charging case",
        "USB-C cable",
        "All ear tips (S/M/L)",
        "Original box",
      ],
      neighborhood: "Park Slope",
      images: [
        "/images/unsplash-1603351154351.jpg",
        "/images/unsplash-1588423771073.jpg",
        "/images/unsplash-1600294037681.jpg",
        "/images/unsplash-1629367494173.jpg",
      ],
    },
    "3": {
      id: "3",
      title: "PlayStation 5 Console + Controller",
      price: 450,
      condition: "Used",
      category: "Gaming & Consoles",
      distance: "2.1 mi away",
      seller: "0xC9...84d3",
      trustLevel: "Medium Trust",
      completedTrades: 7,
      memberSince: "2025",
      description:
        "PlayStation 5 console in good working condition. Purchased in 2023. Includes one DualSense controller. Console has minor cosmetic wear but functions perfectly. All ports and features working properly.",
      includedItems: [
        "PS5 Console",
        "DualSense Controller",
        "HDMI cable",
        "Power cable",
        "USB cable",
      ],
      neighborhood: "Bushwick",
      images: [
        "/images/unsplash-1606144042614.jpg",
        "/images/unsplash-1621259182902.jpg",
        "/images/unsplash-1607853202273.jpg",
        "/images/unsplash-1622297845775.jpg",
      ],
    },
    "4": {
      id: "4",
      title: "Canon EOS Rebel T7 DSLR Camera",
      price: 320,
      condition: "Used",
      category: "Electronics & Devices",
      distance: "1.5 mi away",
      seller: "0xD2...65e4",
      trustLevel: "High Trust",
      completedTrades: 15,
      memberSince: "2024",
      description:
        "Canon EOS Rebel T7 DSLR camera with 18-55mm lens. Great condition with minimal shutter count. Perfect for beginners or hobbyists. Includes battery, charger, and camera strap. No scratches on lens or LCD screen.",
      includedItems: [
        "Camera body",
        "18-55mm lens",
        "Battery",
        "Charger",
        "Camera strap",
        "Lens cap",
      ],
      neighborhood: "SoHo",
      images: [
        "/images/unsplash-1516035069371.jpg",
        "/images/unsplash-1502920917128.jpg",
        "/images/unsplash-1519638831568.jpg",
        "/images/unsplash-1516724562728.jpg",
      ],
    },
    "5": {
      id: "5",
      title: 'iPad Pro 11" (2021) 128GB',
      price: 550,
      condition: "Like-new",
      category: "Electronics & Devices",
      distance: "0.5 mi away",
      seller: "0xE5...76f5",
      trustLevel: "High Trust",
      completedTrades: 22,
      memberSince: "2024",
      description:
        "iPad Pro 11-inch (2021) with M1 chip in excellent condition. 128GB storage, Space Gray. Screen is flawless with no scratches. Includes original box and charging cable. Battery health is excellent.",
      includedItems: [
        'iPad Pro 11"',
        "USB-C cable",
        "Power adapter",
        "Original box",
        "Documentation",
      ],
      neighborhood: "Williamsburg",
      images: [
        "/images/unsplash-1544244015.jpg",
        "/images/unsplash-1585790050230.jpg",
        "/images/unsplash-1561154464.jpg",
        "/images/unsplash-1555617981.jpg",
      ],
    },
    "6": {
      id: "6",
      title: 'Trek Mountain Bike – 29" Wheels',
      price: 380,
      condition: "Used",
      category: "Outdoor & Gear Rentals",
      distance: "3.2 mi away",
      seller: "0xF8...87g6",
      trustLevel: "Medium Trust",
      completedTrades: 5,
      memberSince: "2025",
      description:
        "Trek mountain bike with 29-inch wheels. Great for trails and city riding. Recently serviced with new brake pads. Frame size medium. Some cosmetic wear but mechanically sound. Includes bike lock.",
      includedItems: ["Mountain bike", "Bike lock", "Water bottle holder"],
      neighborhood: "Long Island City",
      images: [
        "/images/unsplash-1532298229144.jpg",
        "/images/unsplash-1576435728678.jpg",
        "/images/unsplash-1485965120184.jpg",
        "/images/unsplash-1507035895480.jpg",
      ],
    },
    "7": {
      id: "7",
      title: "Pokémon Card Collection (50+ cards)",
      price: 95,
      condition: "Used",
      category: "Collectibles & Trading Cards",
      distance: "1.8 mi away",
      seller: "0xG1...98h7",
      trustLevel: "New User",
      completedTrades: 1,
      memberSince: "2025",
      description:
        "Collection of over 50 Pokémon cards including several holographic and rare cards. Mix of different sets from various years. All cards are in good condition and stored in protective sleeves. Great starter collection.",
      includedItems: ["50+ Pokémon cards", "Protective sleeves", "Storage box"],
      neighborhood: "Harlem",
      images: [
        "/images/unsplash-1613771404721.jpg",
        "/images/unsplash-1628151015968.jpg",
        "/images/unsplash-1638613067237.jpg",
        "/images/unsplash-1601987177651.jpg",
      ],
    },
    "8": {
      id: "8",
      title: "Modern Fabric Sofa – 3 Seater",
      price: 420,
      condition: "Used",
      category: "Home & Furniture",
      distance: "2.5 mi away",
      seller: "0xH4...09i8",
      trustLevel: "High Trust",
      completedTrades: 9,
      memberSince: "2024",
      description:
        'Comfortable 3-seater fabric sofa in light gray. Modern design with clean lines. In good condition with minor wear on armrests. Cushions are firm and supportive. Dimensions: 84" W x 36" D x 32" H. Pickup only.',
      includedItems: ["3-seater sofa", "All cushions", "Throw pillows (2)"],
      neighborhood: "Tribeca",
      images: [
        "/images/unsplash-1555041469.jpg",
        "/images/unsplash-1493663284031.jpg",
        "/images/unsplash-1512212621149.jpg",
        "/images/unsplash-1540574163026.jpg",
      ],
    },
    "9": {
      id: "9",
      title: "MacBook Air M1 (2020) 256GB",
      price: 750,
      condition: "Used",
      category: "Electronics & Devices",
      distance: "1.1 mi away",
      seller: "0xI7...10j9",
      trustLevel: "High Trust",
      completedTrades: 14,
      memberSince: "2024",
      description:
        "MacBook Air with M1 chip, 8GB RAM, 256GB SSD. Space Gray color. Excellent performance and battery life. Minor scratches on bottom case but screen is perfect. Includes original charger. macOS up to date.",
      includedItems: [
        "MacBook Air M1",
        "MagSafe charger",
        "USB-C cable",
        "Original box",
      ],
      neighborhood: "Park Slope",
      images: [
        "/images/unsplash-1517336714731.jpg",
        "/images/unsplash-1611186871348.jpg",
        "/images/unsplash-1615750172635.jpg",
        "/images/unsplash-1531297461136.jpg",
      ],
    },
    "10": {
      id: "10",
      title: "Coleman 4-Person Camping Tent",
      price: 85,
      condition: "Used",
      category: "Outdoor & Gear Rentals",
      distance: "4.0 mi away",
      seller: "0xJ0...21k0",
      trustLevel: "Medium Trust",
      completedTrades: 6,
      memberSince: "2025",
      description:
        "Coleman camping tent for 4 people. Used on 3 camping trips. No tears or damage. Waterproof and includes rainfly. Easy to set up. Comes with carrying bag and all stakes. Great for weekend camping trips.",
      includedItems: [
        "Tent",
        "Rainfly",
        "Stakes",
        "Carrying bag",
        "Setup instructions",
      ],
      neighborhood: "Bronx",
      images: [
        "/images/unsplash-1504280390367.jpg",
        "/images/unsplash-1523987355523.jpg",
        "/images/unsplash-1478131143081.jpg",
        "/images/unsplash-1510312305653.jpg",
      ],
    },
    "11": {
      id: "11",
      title: "Bose QuietComfort 45 Headphones",
      price: 220,
      condition: "Like-new",
      category: "Electronics & Devices",
      distance: "0.9 mi away",
      seller: "0xK3...32l1",
      trustLevel: "High Trust",
      completedTrades: 19,
      memberSince: "2024",
      description:
        "Bose QuietComfort 45 wireless headphones in excellent condition. Active noise cancellation works perfectly. Comfortable for long listening sessions. Includes carrying case and all cables. Battery life is still excellent.",
      includedItems: [
        "Headphones",
        "Carrying case",
        "USB-C cable",
        "Audio cable",
        "Original box",
      ],
      neighborhood: "Williamsburg",
      images: [
        "/images/unsplash-1505740420928.jpg",
        "/images/unsplash-1546435770.jpg",
        "/images/unsplash-1583394838336.jpg",
        "/images/unsplash-1484704849700.jpg",
      ],
    },
    "12": {
      id: "12",
      title: "Wooden Dining Table Set (4 Chairs)",
      price: 350,
      condition: "Used",
      category: "Home & Furniture",
      distance: "2.8 mi away",
      seller: "0xL6...43m2",
      trustLevel: "Medium Trust",
      completedTrades: 8,
      memberSince: "2024",
      description:
        'Solid wood dining table with 4 matching chairs. Natural wood finish. Table dimensions: 60" L x 36" W x 30" H. Some minor scratches from normal use but structurally sound. Chairs are comfortable and sturdy. Pickup only.',
      includedItems: ["Dining table", "4 chairs", "Table pads"],
      neighborhood: "Queens",
      images: [
        "/images/unsplash-1530018607912.jpg",
        "/images/unsplash-1617806118233.jpg",
        "/images/unsplash-1533090481720.jpg",
        "/images/unsplash-1577140917170.jpg",
      ],
    },
  };

  const relatedItems = [
    {
      id: "1",
      image: "/images/unsplash-1593118247619.jpg",
      title: "Nintendo Switch Lite – Yellow",
      price: 160,
      trustLevel: "High Trust",
      distance: "1.2 mi away",
    },
    {
      id: "2",
      image: "/images/unsplash-1606318801954.jpg",
      title: "PS5 Controller – White",
      price: 55,
      trustLevel: "Medium Trust",
      distance: "0.9 mi away",
    },
    {
      id: "3",
      image: "/images/unsplash-1612287230217.jpg",
      title: "Zelda: Tears of the Kingdom",
      price: 45,
      trustLevel: "High Trust",
      distance: "1.5 mi away",
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      if (id && mockProducts[id]) {
        setProduct(mockProducts[id]);
      }
      setIsLoading(false);
    }, 800);
  }, [id]);

  const handleBuyClick = () => {
    setShowEscrowModal(true);
  };

  const handleConfirmPurchase = () => {
    setShowEscrowModal(false);
    navigate(`/escrow?product=${id}`);
  };

  const getTrustColor = (level: string) => {
    switch (level) {
      case "High Trust":
        return "#4ADE80";
      case "Medium Trust":
        return "#FBBF24";
      case "New User":
        return "#94A3B8";
      default:
        return "#94A3B8";
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1B1B1B" }}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-6 py-12">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-12 mb-20">
            {/* Left Side - Image Skeleton */}
            <div>
              <div
                className="w-full rounded-2xl mb-4 animate-pulse"
                style={{ aspectRatio: "1/1", backgroundColor: "#2B2B2B" }}
              ></div>
              <div className="grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl animate-pulse"
                    style={{ aspectRatio: "1/1", backgroundColor: "#2B2B2B" }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Right Side - Info Skeleton */}
            <div
              className="rounded-2xl p-8"
              style={{ backgroundColor: "#1F1F1F" }}
            >
              <div
                className="h-8 rounded mb-4 animate-pulse"
                style={{ backgroundColor: "#2B2B2B", width: "80%" }}
              ></div>
              <div
                className="h-10 rounded mb-6 animate-pulse"
                style={{ backgroundColor: "#2B2B2B", width: "30%" }}
              ></div>
              <div
                className="h-6 rounded mb-6 animate-pulse"
                style={{ backgroundColor: "#2B2B2B", width: "50%" }}
              ></div>
              <div
                className="h-px mb-6"
                style={{ backgroundColor: "#2B2B2B" }}
              ></div>
              <div className="space-y-3 mb-8">
                <div
                  className="h-5 rounded animate-pulse"
                  style={{ backgroundColor: "#2B2B2B", width: "60%" }}
                ></div>
                <div
                  className="h-5 rounded animate-pulse"
                  style={{ backgroundColor: "#2B2B2B", width: "70%" }}
                ></div>
                <div
                  className="h-5 rounded animate-pulse"
                  style={{ backgroundColor: "#2B2B2B", width: "50%" }}
                ></div>
              </div>
            </div>
          </div>
        ) : !product ? (
          <div className="py-32 text-center">
            <p
              className="text-2xl font-semibold mb-3"
              style={{ color: "#F5F3F0" }}
            >
              Product not found
            </p>
            <p className="text-lg mb-6" style={{ color: "#A6A19B" }}>
              This listing may have been removed or doesn't exist.
            </p>
            <button
              onClick={() => navigate("/listings")}
              className="px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
              style={{ backgroundColor: "#FF8C42", color: "#FFFFFF" }}
            >
              Back to listings
            </button>
          </div>
        ) : (
          <>
            {/* 2-Column Layout */}
            <div className="grid grid-cols-2 gap-12 mb-20">
              {/* Left Side - Images */}
              <div>
                {/* Main Image */}
                <div className="mb-4">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.title}
                    className="w-full rounded-2xl object-cover"
                    style={{ aspectRatio: "1/1", backgroundColor: "#262626" }}
                    onError={(e) => {
                      e.currentTarget.src = "/images/unsplash-1546435770.jpg";
                    }}
                  />
                </div>

                {/* Thumbnail Images */}
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className="rounded-xl overflow-hidden cursor-pointer transition-all"
                      style={{
                        border:
                          selectedImage === index
                            ? "2px solid #FF8C42"
                            : "2px solid transparent",
                        opacity: selectedImage === index ? 1 : 0.6,
                      }}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full object-cover"
                        style={{ aspectRatio: "1/1" }}
                        onError={(e) => {
                          e.currentTarget.src =
                            "/images/unsplash-1546435770.jpg";
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Side - Product Info */}
              <div
                className="rounded-2xl p-8"
                style={{ backgroundColor: "#1F1F1F" }}
              >
                {/* Title */}
                <h2
                  className="text-3xl font-bold mb-4"
                  style={{ color: "#F5F3F0" }}
                >
                  {product.title}
                </h2>

                {/* Price */}
                <p
                  className="text-4xl font-bold mb-6"
                  style={{ color: "#FF8C42" }}
                >
                  ${product.price}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap"
                    style={{ backgroundColor: "#262626", color: "#4ADE80" }}
                  >
                    {product.condition}
                  </span>
                  <span
                    className="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap"
                    style={{ backgroundColor: "#262626", color: "#A6A19B" }}
                  >
                    {product.category}
                  </span>
                </div>

                {/* Distance */}
                <p className="text-sm mb-6" style={{ color: "#A6A19B" }}>
                  📍 {product.distance}
                </p>

                {/* Divider */}
                <div
                  className="h-px mb-6"
                  style={{ backgroundColor: "#2B2B2B" }}
                ></div>

                {/* Seller Information */}
                <div className="mb-8">
                  <h3
                    className="text-lg font-semibold mb-4"
                    style={{ color: "#F5F3F0" }}
                  >
                    Seller information
                  </h3>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm" style={{ color: "#A6A19B" }}>
                        Seller DID:
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "#F5F3F0" }}
                      >
                        {product.seller}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <i
                        className="ri-checkbox-circle-fill"
                        style={{
                          color: getTrustColor(product.trustLevel),
                          fontSize: "18px",
                        }}
                      ></i>
                      <span
                        className="text-sm font-medium"
                        style={{ color: getTrustColor(product.trustLevel) }}
                      >
                        {product.trustLevel}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm" style={{ color: "#A6A19B" }}>
                        Completed trades:
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "#F5F3F0" }}
                      >
                        {product.completedTrades}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm" style={{ color: "#A6A19B" }}>
                        Member since:
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "#F5F3F0" }}
                      >
                        {product.memberSince}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs mb-4" style={{ color: "#B3ADA7" }}>
                    Reputation is stored on-chain and cannot be altered.
                  </p>

                  <button
                    onClick={() => navigate(`/seller/${product.seller}`)}
                    className="px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
                    style={{ backgroundColor: "#262626", color: "#F5F3F0" }}
                  >
                    View profile
                  </button>
                </div>

                {/* Divider */}
                <div
                  className="h-px mb-8"
                  style={{ backgroundColor: "#2B2B2B" }}
                ></div>

                {/* Buy Action */}
                <div>
                  <AISummary
                    productId={product.id}
                    productTitle={product.title}
                    productPrice={product.price}
                    productCondition={product.condition}
                  />
                  <button
                    onClick={handleBuyClick}
                    className="w-full py-4 rounded-full font-bold text-base whitespace-nowrap cursor-pointer transition-all hover:opacity-90 mb-3"
                    style={{
                      backgroundColor: "#FF8C42",
                      color: "#FFFFFF",
                      height: "54px",
                    }}
                  >
                    Buy with Escrow
                  </button>

                  <p
                    className="text-xs text-center"
                    style={{ color: "#B3ADA7" }}
                  >
                    Your payment will be securely held until both sides confirm.
                  </p>
                </div>
              </div>
            </div>

            {/* Detail Sections */}
            <div className="grid grid-cols-2 gap-12 mb-20">
              {/* Description */}
              <div
                className="rounded-2xl p-8"
                style={{ backgroundColor: "#1F1F1F" }}
              >
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: "#F5F3F0" }}
                >
                  Description
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#D8D2CD" }}
                >
                  {product.description}
                </p>
              </div>

              {/* Included Items */}
              <div
                className="rounded-2xl p-8"
                style={{ backgroundColor: "#1F1F1F" }}
              >
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: "#F5F3F0" }}
                >
                  Included items
                </h3>
                <ul className="space-y-2">
                  {product.includedItems.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <i
                        className="ri-checkbox-circle-fill"
                        style={{ color: "#4ADE80", fontSize: "16px" }}
                      ></i>
                      <span className="text-sm" style={{ color: "#D8D2CD" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pickup Info */}
            <div
              className="rounded-2xl p-8 mb-12"
              style={{ backgroundColor: "#1F1F1F" }}
            >
              <h3
                className="text-xl font-semibold mb-4"
                style={{ color: "#F5F3F0" }}
              >
                Pickup info
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm" style={{ color: "#A6A19B" }}>
                    Neighborhood:
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#F5F3F0" }}
                  >
                    {product.neighborhood}
                  </span>
                </div>
                <p className="text-sm" style={{ color: "#D8D2CD" }}>
                  Pickup only / meetup at public location
                </p>
              </div>
            </div>

            {/* Safety Notice */}
            <div
              className="rounded-xl p-6 mb-20 flex items-start gap-4"
              style={{ backgroundColor: "#262626" }}
            >
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                <i
                  className="ri-shield-check-fill text-xl"
                  style={{ color: "#4ADE80" }}
                ></i>
              </div>
              <div>
                <p
                  className="text-sm font-medium mb-1"
                  style={{ color: "#F5F3F0" }}
                >
                  No off-platform messaging required.
                </p>
                <p className="text-xs" style={{ color: "#B3ADA7" }}>
                  No Venmo, Cash App, or meetup scams — escrow keeps your
                  payment safe.
                </p>
              </div>
            </div>

            {/* Related Items */}
            <section>
              <h3
                className="text-2xl font-bold mb-8"
                style={{ color: "#F5F3F0" }}
              >
                You may also like
              </h3>

              <div className="grid grid-cols-3 gap-6">
                {relatedItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl overflow-hidden cursor-pointer transition-all hover:brightness-110"
                    style={{ backgroundColor: "#1F1F1F", padding: "16px" }}
                    onClick={() => {
                      setSelectedImage(0);
                      navigate(`/product/${item.id}`);
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full rounded-xl mb-4 object-cover"
                      style={{ aspectRatio: "1/1" }}
                      onError={(e) => {
                        e.currentTarget.src = "/images/unsplash-1546435770.jpg";
                      }}
                    />
                    <h4
                      className="text-base font-semibold mb-2 line-clamp-2"
                      style={{ color: "#F5F3F0" }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="text-2xl font-bold mb-3"
                      style={{ color: "#FF8C42" }}
                    >
                      ${item.price}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <i
                        className="ri-checkbox-circle-fill"
                        style={{
                          color: getTrustColor(item.trustLevel),
                          fontSize: "16px",
                        }}
                      ></i>
                      <span
                        className="text-sm font-medium"
                        style={{ color: getTrustColor(item.trustLevel) }}
                      >
                        {item.trustLevel}
                      </span>
                      <span className="text-sm" style={{ color: "#A6A19B" }}>
                        • {item.distance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Escrow Confirmation Modal */}
      {showEscrowModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
          onClick={() => setShowEscrowModal(false)}
        >
          <div
            className="rounded-2xl p-8 max-w-md w-full mx-4"
            style={{ backgroundColor: "#1F1F1F" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className="text-2xl font-bold mb-4"
              style={{ color: "#F5F3F0" }}
            >
              Confirm purchase
            </h3>

            <p
              className="text-sm mb-6 leading-relaxed"
              style={{ color: "#D8D2CD" }}
            >
              Payment will be held in blockchain-based escrow. Funds are only
              released when both parties confirm.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleConfirmPurchase}
                className="flex-1 py-3 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
                style={{ backgroundColor: "#FF8C42", color: "#FFFFFF" }}
              >
                Confirm
              </button>
              <button
                onClick={() => setShowEscrowModal(false)}
                className="flex-1 py-3 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
                style={{
                  backgroundColor: "transparent",
                  color: "#F5F3F0",
                  border: "1px solid #3A3A3A",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-20" style={{ backgroundColor: "#2B2522" }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-4 gap-12 mb-16">
            {/* Left Block */}
            <div className="col-span-1">
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "#FFFFFF" }}
              >
                SWITCH SOCIAL MARKET
              </h3>
              <p className="text-sm mb-6" style={{ color: "#D8D2CD" }}>
                © 2025 Switch Foundation.
                <br />
                All rights reserved.
              </p>
              <div className="flex gap-3">
                <a
                  href="#youtube"
                  className="w-6 h-6 flex items-center justify-center cursor-pointer transition-all hover:brightness-110"
                >
                  <i
                    className="ri-youtube-fill text-xl"
                    style={{ color: "#D8D2CD" }}
                  ></i>
                </a>
                <a
                  href="#twitter"
                  className="w-6 h-6 flex items-center justify-center cursor-pointer transition-all hover:brightness-110"
                >
                  <i
                    className="ri-twitter-x-fill text-xl"
                    style={{ color: "#D8D2CD" }}
                  ></i>
                </a>
                <a
                  href="#discord"
                  className="w-6 h-6 flex items-center justify-center cursor-pointer transition-all hover:brightness-110"
                >
                  <i
                    className="ri-discord-fill text-xl"
                    style={{ color: "#D8D2CD" }}
                  ></i>
                </a>
                <a
                  href="#reddit"
                  className="w-6 h-6 flex items-center justify-center cursor-pointer transition-all hover:brightness-110"
                >
                  <i
                    className="ri-reddit-fill text-xl"
                    style={{ color: "#D8D2CD" }}
                  ></i>
                </a>
                <a
                  href="#github"
                  className="w-6 h-6 flex items-center justify-center cursor-pointer transition-all hover:brightness-110"
                >
                  <i
                    className="ri-github-fill text-xl"
                    style={{ color: "#D8D2CD" }}
                  ></i>
                </a>
                <a
                  href="#telegram"
                  className="w-6 h-6 flex items-center justify-center cursor-pointer transition-all hover:brightness-110"
                >
                  <i
                    className="ri-telegram-fill text-xl"
                    style={{ color: "#D8D2CD" }}
                  ></i>
                </a>
              </div>
            </div>

            {/* Switch Column */}
            <div>
              <h4
                className="text-lg font-semibold mb-4"
                style={{ color: "#FFFFFF" }}
              >
                Switch
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#about"
                    className="text-sm cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ color: "#D8D2CD" }}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#team"
                    className="text-sm cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ color: "#D8D2CD" }}
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href="#vision"
                    className="text-sm cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ color: "#D8D2CD" }}
                  >
                    Vision
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-sm cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ color: "#D8D2CD" }}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Community Column */}
            <div>
              <h4
                className="text-lg font-semibold mb-4"
                style={{ color: "#FFFFFF" }}
              >
                Community
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#discord"
                    className="text-sm cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ color: "#D8D2CD" }}
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    href="#telegram"
                    className="text-sm cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ color: "#D8D2CD" }}
                  >
                    Telegram
                  </a>
                </li>
                <li>
                  <a
                    href="#twitter"
                    className="text-sm cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ color: "#D8D2CD" }}
                  >
                    Twitter(X)
                  </a>
                </li>
                <li>
                  <a
                    href="#announcements"
                    className="text-sm cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ color: "#D8D2CD" }}
                  >
                    Announcements
                  </a>
                </li>
                <li>
                  <a
                    href="#apply"
                    className="text-sm cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ color: "#D8D2CD" }}
                  >
                    Apply as Local Leader
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4
                className="text-lg font-semibold mb-4"
                style={{ color: "#FFFFFF" }}
              >
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#terms"
                    className="text-sm cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ color: "#D8D2CD" }}
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy"
                    className="text-sm cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ color: "#D8D2CD" }}
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
