import {
  useWeb3AuthConnect,
  useWeb3AuthDisconnect,
} from "@web3auth/modal/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { useLocation } from "../../contexts/LocationContext";
import { shortenAddress } from "../../utils/address";

export default function Header() {
  const navigate = useNavigate();
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const { selectedLocation, setSelectedLocation } = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { connect, isConnected } = useWeb3AuthConnect();
  const { disconnect } = useWeb3AuthDisconnect();
  const { address } = useAccount();

  const locations = [
    "Brooklyn, NY",
    "Manhattan, NY",
    "Queens, NY",
    "Bronx, NY",
    "Staten Island, NY",
    "Jersey City, NJ",
    "Hoboken, NJ",
  ];

  const handleConnectWallet = () => {
    void connect();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/listings?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/listings");
    }
  };

  const handleProfileMenuClick = (path: string) => {
    setIsProfileOpen(false);
    navigate(path);
  };

  const handleDisconnectWallet = () => {
    void disconnect();
    setIsProfileOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "#1B1B1B",
        height: "72px",
        borderBottom: "1px solid #2A2A2A",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <h1
              className="text-xl font-bold whitespace-nowrap"
              style={{ color: "#FFFFFF" }}
            >
              Switch Social Market
            </h1>
          </Link>
        </div>

        {/* Center Section */}
        <div className="flex items-center gap-4 flex-1 max-w-[800px]">
          {/* Location Dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              className="px-4 py-2 rounded-full flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
              style={{ backgroundColor: "#262626", color: "#F5F3F0" }}
            >
              <span>📍</span>
              <span className="text-sm font-medium">{selectedLocation}</span>
              <i className="ri-arrow-down-s-line text-lg"></i>
            </button>

            {showLocationDropdown && (
              <div
                className="absolute top-full left-0 mt-2 rounded-2xl overflow-hidden shadow-lg z-50"
                style={{ backgroundColor: "#262626", minWidth: "200px" }}
              >
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => {
                      setSelectedLocation(location);
                      setShowLocationDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm cursor-pointer transition-all hover:brightness-110"
                    style={{
                      backgroundColor:
                        location === selectedLocation
                          ? "#3A3A3A"
                          : "transparent",
                      color: "#F5F3F0",
                    }}
                  >
                    {location}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-2 rounded-full text-sm outline-none transition-all focus:brightness-110"
              style={{
                backgroundColor: "#262626",
                color: "#F5F3F0",
                border: "1px solid #3A3A3A",
              }}
            />
            <button
              type="submit"
              className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <i
                className="ri-search-line text-lg"
                style={{ color: "#A6A19B" }}
              ></i>
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Sell Item Button */}
          {isConnected && (
            <button
              onClick={() => navigate("/sell")}
              className="px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
              style={{
                backgroundColor: "#FF8C42",
                color: "#1B1B1B",
                height: "42px",
              }}
            >
              Sell item
            </button>
          )}

          {/* Wallet & Profile */}
          {isConnected ? (
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm" style={{ color: "#F5F3F0" }}>
                {shortenAddress(address)}
              </span>
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:brightness-110"
                  style={{ backgroundColor: "#FF8C42" }}
                >
                  <i
                    className="ri-user-line text-lg"
                    style={{ color: "#1B1B1B" }}
                  ></i>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 rounded-xl overflow-hidden z-50"
                    style={{
                      backgroundColor: "#1F1F1F",
                      width: "240px",
                      boxShadow: "0 24px 48px rgba(0,0,0,0.45)",
                    }}
                  >
                    <button
                      onClick={() => handleProfileMenuClick("/profile")}
                      className="w-full text-left px-4 py-3 text-sm cursor-pointer transition-all hover:brightness-110"
                      style={{ backgroundColor: "#1F1F1F", color: "#F5F3F0" }}
                    >
                      My profile
                    </button>
                    <button
                      onClick={() => handleProfileMenuClick("/messages")}
                      className="w-full text-left px-4 py-3 text-sm cursor-pointer transition-all hover:brightness-110"
                      style={{ backgroundColor: "#1F1F1F", color: "#F5F3F0" }}
                    >
                      Messages
                    </button>
                    {/* <button
                      onClick={() => handleProfileMenuClick("/sales-dashboard")}
                      className="w-full text-left px-4 py-3 text-sm cursor-pointer transition-all hover:brightness-110"
                      style={{ backgroundColor: "#1F1F1F", color: "#F5F3F0" }}
                    >
                      Sales dashboard ✅
                    </button> */}
                    <button
                      onClick={() => handleProfileMenuClick("/listings")}
                      className="w-full text-left px-4 py-3 text-sm cursor-pointer transition-all hover:brightness-110"
                      style={{ backgroundColor: "#1F1F1F", color: "#F5F3F0" }}
                    >
                      My listings
                    </button>
                    {/* <button
                      onClick={() => handleProfileMenuClick("/dao")}
                      className="w-full text-left px-4 py-3 text-sm cursor-pointer transition-all hover:brightness-110"
                      style={{ backgroundColor: "#1F1F1F", color: "#F5F3F0" }}
                    >
                      DAO access
                    </button> */}
                    <button
                      onClick={() => handleProfileMenuClick("/dao-space")}
                      className="w-full text-left px-4 py-3 text-sm cursor-pointer transition-all hover:brightness-110"
                      style={{ backgroundColor: "#1F1F1F", color: "#F5F3F0" }}
                    >
                      My proposals
                    </button>
                    <button
                      onClick={() => handleProfileMenuClick("/badges")}
                      className="w-full text-left px-4 py-3 text-sm cursor-pointer transition-all hover:brightness-110"
                      style={{ backgroundColor: "#1F1F1F", color: "#F5F3F0" }}
                    >
                      My badges
                    </button>
                    <button
                      onClick={() => handleProfileMenuClick("/settings")}
                      className="w-full text-left px-4 py-3 text-sm cursor-pointer transition-all hover:brightness-110"
                      style={{ backgroundColor: "#1F1F1F", color: "#F5F3F0" }}
                    >
                      Settings
                    </button>
                    <button
                      onClick={handleDisconnectWallet}
                      className="w-full text-left px-4 py-3 text-sm cursor-pointer transition-all hover:brightness-110"
                      style={{ backgroundColor: "#1F1F1F", color: "#EF4444" }}
                    >
                      Disconnect wallet
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={handleConnectWallet}
              className="px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
              style={{ backgroundColor: "#FF8C42", color: "#FFFFFF" }}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
