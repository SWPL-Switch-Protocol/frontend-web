import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../components/feature/Header";

interface Listing {
  id: string;
  image: string;
  title: string;
  price: number;
  trustLevel: "High Trust" | "Medium Trust" | "New User";
  distance: string;
  seller: string;
}

export default function Listings() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Newest");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("Williamsburg, NY");
  const [trustedOnly, setTrustedOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [listings, setListings] = useState<Listing[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const locations = [
    "Brooklyn, NY",
    "Manhattan, NY",
    "Queens, NY",
    "Bronx, NY",
    "Staten Island, NY",
    "Jersey City, NJ",
    "Hoboken, NJ",
  ];

  const sortOptions = [
    "Newest",
    "Lowest price",
    "Highest price",
    "Highest trust",
  ];

  const categories = [
    "All Categories",
    "Electronics & Devices",
    "Gaming & Consoles",
    "Collectibles",
    "Home",
    "Outdoor",
    "Community",
  ];

  const filterChips = ["Used", "Like-new", "New", "Under $100", "Pickup only"];

  const mockListings: Listing[] = [
    {
      id: "1",
      image: "/images/readdy-listing1.jpg",
      title: "Nintendo Switch OLED – White",
      price: 260,
      trustLevel: "High Trust",
      distance: "0.8 mi away",
      seller: "0xA4...92b1",
    },
    {
      id: "2",
      image: "/images/readdy-listing2.jpg",
      title: "AirPods Pro (2nd Gen) – Like New",
      price: 180,
      trustLevel: "High Trust",
      distance: "1.2 mi away",
      seller: "0xB7...43c2",
    },
    {
      id: "3",
      image: "/images/readdy-listing3.jpg",
      title: "PlayStation 5 Console + Controller",
      price: 450,
      trustLevel: "Medium Trust",
      distance: "2.1 mi away",
      seller: "0xC9...84d3",
    },
    {
      id: "4",
      image: "/images/readdy-listing4.jpg",
      title: "Canon EOS Rebel T7 DSLR Camera",
      price: 320,
      trustLevel: "High Trust",
      distance: "1.5 mi away",
      seller: "0xD2...65e4",
    },
    {
      id: "5",
      image: "/images/readdy-listing5.jpg",
      title: 'iPad Pro 11" (2021) 128GB',
      price: 550,
      trustLevel: "High Trust",
      distance: "0.5 mi away",
      seller: "0xE5...76f5",
    },
    {
      id: "6",
      image: "/images/readdy-listing6.jpg",
      title: 'Trek Mountain Bike – 29" Wheels',
      price: 380,
      trustLevel: "Medium Trust",
      distance: "3.2 mi away",
      seller: "0xF8...87g6",
    },
    {
      id: "7",
      image: "/images/readdy-listing7.jpg",
      title: "Pokémon Card Collection (50+ cards)",
      price: 95,
      trustLevel: "New User",
      distance: "1.8 mi away",
      seller: "0xG1...98h7",
    },
    {
      id: "8",
      image: "/images/readdy-listing8.jpg",
      title: "Modern Fabric Sofa – 3 Seater",
      price: 420,
      trustLevel: "High Trust",
      distance: "2.5 mi away",
      seller: "0xH4...09i8",
    },
    {
      id: "9",
      image: "/images/readdy-listing9.jpg",
      title: "MacBook Air M1 (2020) 256GB",
      price: 750,
      trustLevel: "High Trust",
      distance: "1.1 mi away",
      seller: "0xI7...10j9",
    },
    {
      id: "10",
      image: "/images/readdy-listing10.jpg",
      title: "Coleman 4-Person Camping Tent",
      price: 85,
      trustLevel: "Medium Trust",
      distance: "4.0 mi away",
      seller: "0xJ0...21k0",
    },
    {
      id: "11",
      image: "/images/readdy-listing11.jpg",
      title: "Bose QuietComfort 45 Headphones",
      price: 220,
      trustLevel: "High Trust",
      distance: "0.9 mi away",
      seller: "0xK3...32l1",
    },
    {
      id: "12",
      image: "/images/readdy-listing12.jpg",
      title: "Wooden Dining Table Set (4 Chairs)",
      price: 350,
      trustLevel: "Medium Trust",
      distance: "2.8 mi away",
      seller: "0xL6...43m2",
    },
  ];

  useEffect(() => {
    // Get URL parameters
    const urlSearch = searchParams.get("search");
    const urlCategory = searchParams.get("category");

    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }

    // Simulate loading
    setTimeout(() => {
      let filteredListings = [...mockListings];

      // Filter by search query
      if (urlSearch) {
        const query = urlSearch.toLowerCase();
        filteredListings = filteredListings.filter((listing) =>
          listing.title.toLowerCase().includes(query)
        );
      }

      // Filter by category
      if (urlCategory && urlCategory !== "All Categories") {
        // Map category to listing titles (simple keyword matching)
        const categoryKeywords: Record<string, string[]> = {
          "Electronics & Devices": ["airpods", "ipad", "macbook", "headphones"],
          "Gaming & Consoles": ["nintendo", "switch", "playstation", "ps5"],
          "Collectibles & Trading Cards": ["pokémon", "card"],
          "Home & Furniture": ["sofa", "table", "dining"],
          "Outdoor & Gear Rentals": ["bike", "tent", "camping"],
        };

        const keywords = categoryKeywords[urlCategory] || [];
        if (keywords.length > 0) {
          filteredListings = filteredListings.filter((listing) =>
            keywords.some((keyword) =>
              listing.title.toLowerCase().includes(keyword)
            )
          );
        }
      }

      setListings(filteredListings);
      setIsLoading(false);
    }, 1200);
  }, [searchParams]);

  const handleConnectWallet = () => {
    // This function is not used, can be removed or implemented
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/listings?search=${encodeURIComponent(searchQuery.trim())}`);
    }
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
      <main className="max-w-[1440px] mx-auto px-6">
        {/* Page Title Block */}
        <div
          className="text-center"
          style={{ paddingTop: "60px", paddingBottom: "40px" }}
        >
          <h2 className="text-3xl font-bold mb-3" style={{ color: "#F5F3F0" }}>
            📍 Items available near {selectedLocation.split(",")[0]}
          </h2>
          <p className="text-lg" style={{ color: "#A6A19B" }}>
            Buy and sell safely with blockchain escrow.
          </p>
        </div>

        {/* Filter & Sort Bar */}
        <div
          className="rounded-xl p-4 mb-8"
          style={{ backgroundColor: "#262626" }}
        >
          <div className="flex items-center gap-4 flex-wrap">
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
                style={{ backgroundColor: "#3A3A3A", color: "#F5F3F0" }}
              >
                <span className="text-sm">Sort by: {selectedSort}</span>
                <i className="ri-arrow-down-s-line text-lg"></i>
              </button>

              {showSortDropdown && (
                <div
                  className="absolute top-full left-0 mt-2 rounded-xl overflow-hidden shadow-lg z-50"
                  style={{ backgroundColor: "#3A3A3A", minWidth: "180px" }}
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedSort(option);
                        setShowSortDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm cursor-pointer transition-all hover:brightness-110"
                      style={{
                        backgroundColor:
                          option === selectedSort ? "#4A4A4A" : "transparent",
                        color: "#F5F3F0",
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
                style={{ backgroundColor: "#3A3A3A", color: "#F5F3F0" }}
              >
                <span className="text-sm">{selectedCategory}</span>
                <i className="ri-arrow-down-s-line text-lg"></i>
              </button>

              {showCategoryDropdown && (
                <div
                  className="absolute top-full left-0 mt-2 rounded-xl overflow-hidden shadow-lg z-50"
                  style={{ backgroundColor: "#3A3A3A", minWidth: "220px" }}
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowCategoryDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm cursor-pointer transition-all hover:brightness-110"
                      style={{
                        backgroundColor:
                          category === selectedCategory
                            ? "#4A4A4A"
                            : "transparent",
                        color: "#F5F3F0",
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Trusted Toggle */}
            <button
              onClick={() => setTrustedOnly(!trustedOnly)}
              className="px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
              style={{
                backgroundColor: trustedOnly ? "#FF8C42" : "#3A3A3A",
                color: "#F5F3F0",
              }}
            >
              <i
                className={
                  trustedOnly
                    ? "ri-checkbox-circle-fill"
                    : "ri-checkbox-blank-circle-line"
                }
                style={{ fontSize: "18px" }}
              ></i>
              <span className="text-sm">Trusted sellers only</span>
            </button>

            {/* Filter Chips */}
            <div className="flex items-center gap-2 flex-wrap ml-auto">
              {filterChips.map((chip) => (
                <button
                  key={chip}
                  className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
                  style={{ backgroundColor: "#3A3A3A", color: "#EDE8E3" }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Listing Grid */}
        {isLoading ? (
          <div className="grid grid-cols-3 gap-6 mb-16">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden"
                style={{ backgroundColor: "#2B2B2B", padding: "16px" }}
              >
                <div
                  className="w-full rounded-xl mb-4 animate-pulse"
                  style={{ aspectRatio: "1/1", backgroundColor: "#3A3A3A" }}
                ></div>
                <div
                  className="h-5 rounded mb-3 animate-pulse"
                  style={{ backgroundColor: "#3A3A3A", width: "80%" }}
                ></div>
                <div
                  className="h-6 rounded mb-3 animate-pulse"
                  style={{ backgroundColor: "#3A3A3A", width: "40%" }}
                ></div>
                <div
                  className="h-4 rounded mb-2 animate-pulse"
                  style={{ backgroundColor: "#3A3A3A", width: "60%" }}
                ></div>
                <div
                  className="h-4 rounded animate-pulse"
                  style={{ backgroundColor: "#3A3A3A", width: "50%" }}
                ></div>
              </div>
            ))}
          </div>
        ) : listings.length > 0 ? (
          <>
            <div className="grid grid-cols-3 gap-6 mb-12">
              {listings.map((listing) => (
                <div
                  key={listing.id}
                  className="rounded-2xl overflow-hidden cursor-pointer transition-all hover:brightness-110"
                  style={{ backgroundColor: "#1F1F1F", padding: "16px" }}
                  onClick={() => navigate(`/product/${listing.id}`)}
                >
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full rounded-xl mb-4 object-cover"
                    style={{ aspectRatio: "1/1" }}
                    onError={(e) => {
                      e.currentTarget.src = "/images/unsplash-1546435770.jpg";
                    }}
                  />
                  <h3
                    className="text-base font-semibold mb-2 line-clamp-2"
                    style={{ color: "#F5F3F0" }}
                  >
                    {listing.title}
                  </h3>
                  <p
                    className="text-2xl font-bold mb-3"
                    style={{ color: "#FF8C42" }}
                  >
                    ${listing.price}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <i
                      className="ri-checkbox-circle-fill"
                      style={{
                        color: getTrustColor(listing.trustLevel),
                        fontSize: "16px",
                      }}
                    ></i>
                    <span
                      className="text-sm font-medium"
                      style={{ color: getTrustColor(listing.trustLevel) }}
                    >
                      {listing.trustLevel}
                    </span>
                    <span className="text-sm" style={{ color: "#A6A19B" }}>
                      • {listing.distance}
                    </span>
                  </div>
                  <p className="text-sm mb-4" style={{ color: "#A6A19B" }}>
                    Seller: {listing.seller}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${listing.id}`);
                    }}
                    className="w-full py-2 rounded-lg font-medium text-sm whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
                    style={{ backgroundColor: "#FF8C42", color: "#FFFFFF" }}
                  >
                    View details
                  </button>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mb-16">
              <button
                className="px-8 py-3 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
                style={{ backgroundColor: "#262626", color: "#F5F3F0" }}
              >
                Load more
              </button>
            </div>
          </>
        ) : (
          <div className="py-32 text-center mb-16">
            <div className="max-w-md mx-auto">
              <p
                className="text-2xl font-semibold mb-3"
                style={{ color: "#F5F3F0" }}
              >
                No listings found in this area 👋
              </p>
              <p className="text-lg mb-6" style={{ color: "#A6A19B" }}>
                Try adjusting filters or be the first to post.
              </p>
              <button
                className="px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
                style={{ backgroundColor: "#FF8C42", color: "#FFFFFF" }}
              >
                Create a listing
              </button>
            </div>
          </div>
        )}

        {/* Safety Note */}
        <div
          className="rounded-xl p-5 mb-16 text-center"
          style={{ backgroundColor: "#262626" }}
        >
          <p className="text-xs" style={{ color: "#B3ADA7" }}>
            All payments are secured through blockchain-based escrow. No
            off-platform messaging required.
          </p>
        </div>
      </main>

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
                  className="w-10 h-10 flex items-center justify-center cursor-pointer transition-all hover:brightness-110"
                >
                  <i
                    className="ri-youtube-fill text-2xl"
                    style={{ color: "#D8D2CD" }}
                  ></i>
                </a>
                <a
                  href="#twitter"
                  className="w-10 h-10 flex items-center justify-center cursor-pointer transition-all hover:brightness-110"
                >
                  <i
                    className="ri-twitter-x-fill text-2xl"
                    style={{ color: "#D8D2CD" }}
                  ></i>
                </a>
                <a
                  href="#discord"
                  className="w-10 h-10 flex items-center justify-center cursor-pointer transition-all hover:brightness-110"
                >
                  <i
                    className="ri-discord-fill text-2xl"
                    style={{ color: "#D8D2CD" }}
                  ></i>
                </a>
                <a
                  href="#reddit"
                  className="w-10 h-10 flex items-center justify-center cursor-pointer transition-all hover:brightness-110"
                >
                  <i
                    className="ri-reddit-fill text-2xl"
                    style={{ color: "#D8D2CD" }}
                  ></i>
                </a>
                <a
                  href="#github"
                  className="w-10 h-10 flex items-center justify-center cursor-pointer transition-all hover:brightness-110"
                >
                  <i
                    className="ri-github-fill text-2xl"
                    style={{ color: "#D8D2CD" }}
                  ></i>
                </a>
                <a
                  href="#telegram"
                  className="w-10 h-10 flex items-center justify-center cursor-pointer transition-all hover:brightness-110"
                >
                  <i
                    className="ri-telegram-fill text-2xl"
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
