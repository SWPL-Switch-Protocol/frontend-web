import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Brooklyn, NY');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress] = useState('0xA3...91c5');
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const locations = [
    'Brooklyn, NY',
    'Manhattan, NY',
    'Queens, NY',
    'Bronx, NY',
    'Staten Island, NY',
    'Jersey City, NJ',
    'Hoboken, NJ'
  ];

  const categories = [
    { icon: '📱', label: 'Electronics & Devices' },
    { icon: '🎮', label: 'Gaming & Consoles' },
    { icon: '🃏', label: 'Collectibles & Trading Cards' },
    { icon: '⛺️', label: 'Outdoor & Gear Rentals' },
    { icon: '🛋', label: 'Home & Furniture' },
    { icon: '🏘', label: 'Local Community' },
    { icon: '✅', label: 'Trust & Reputation' },
    { icon: '🎯', label: 'Events & Quests' }
  ];

  const neighborhoods = [
    'Williamsburg',
    'Bushwick',
    'Park Slope',
    'SoHo',
    'Lower East Side',
    'Tribeca',
    'Harlem',
    'Long Island City'
  ];

  const trendingSearches = [
    'AirPods',
    'Nintendo Switch',
    'PS5',
    'Mountain bike',
    'iPad',
    'DSLR',
    'Patio set'
  ];

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/listings?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/listings');
    }
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/listings?category=${encodeURIComponent(category)}`);
  };

  const handleTrendingClick = (search: string) => {
    navigate(`/listings?search=${encodeURIComponent(search)}`);
  };

  const handleProfileMenuClick = (path: string) => {
    setIsProfileOpen(false);
    navigate(path);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1B1B1B' }}>
      {/* Header */}
      <header className="sticky top-0 z-50" style={{ backgroundColor: '#1B1B1B', height: '72px', borderBottom: '1px solid #2A2A2A' }}>
        <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold whitespace-nowrap" style={{ color: '#FFFFFF' }}>
              Switch Social Market
            </h1>
          </div>

          {/* Center Section */}
          <div className="flex items-center gap-4 flex-1 max-w-[800px]">
            {/* Location Dropdown */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="px-4 py-2 rounded-full flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
                style={{ backgroundColor: '#262626', color: '#F5F3F0' }}
              >
                <span>📍</span>
                <span className="text-sm font-medium">{selectedLocation}</span>
                <i className="ri-arrow-down-s-line text-lg"></i>
              </button>

              {showLocationDropdown && (
                <div
                  className="absolute top-full left-0 mt-2 rounded-2xl overflow-hidden shadow-lg z-50"
                  style={{ backgroundColor: '#262626', minWidth: '200px' }}
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
                        backgroundColor: location === selectedLocation ? '#3A3A3A' : 'transparent',
                        color: '#F5F3F0'
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
                style={{ backgroundColor: '#262626', color: '#F5F3F0', border: '1px solid #3A3A3A' }}
              />
              <button
                type="submit"
                className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <i className="ri-search-line text-lg" style={{ color: '#A6A19B' }}></i>
              </button>
            </form>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Sell Item Button */}
            {isWalletConnected && (
              <button
                onClick={() => navigate('/create-listing')}
                className="px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
                style={{ backgroundColor: '#FF8C42', color: '#1B1B1B', height: '42px' }}
              >
                Sell item
              </button>
            )}

            {/* Wallet & Profile */}
            {isWalletConnected ? (
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm" style={{ color: '#F5F3F0' }}>
                  {walletAddress}
                </span>
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:brightness-110"
                    style={{ backgroundColor: '#FF8C42' }}
                  >
                    <i className="ri-user-line text-lg" style={{ color: '#1B1B1B' }}></i>
                  </button>
                  
                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div
                      className="absolute top-full right-0 mt-2 rounded-xl overflow-hidden z-50"
                      style={{ 
                        backgroundColor: '#1F1F1F', 
                        width: '240px',
                        boxShadow: '0 24px 48px rgba(0,0,0,0.45)'
                      }}
                    >
                      <button
                        onClick={() => handleProfileMenuClick('/profile')}
                        className="w-full text-left px-4 py-3 text-sm cursor-pointer transition-all hover:brightness-110"
                        style={{ backgroundColor: '#1F1F1F', color: '#F5F3F0' }}
                      >
                        My profile
                      </button>
                      <button
                        onClick={() => handleProfileMenuClick('/profile')}
                        className="w-full text-left px-4 py-3 text-sm cursor-pointer transition-all hover:brightness-110"
                        style={{ backgroundColor: '#1F1F1F', color: '#F5F3F0' }}
                      >
                        My reputation
                      </button>
                      <button
                        onClick={() => handleProfileMenuClick('/sales-dashboard')}
                        className="w-full text-left px-4 py-3 text-sm cursor-pointer transition-all hover:brightness-110"
                        style={{ backgroundColor: '#1F1F1F', color: '#F5F3F0' }}
                      >
                        Sales dashboard ✅
                      </button>
                      <button
                        onClick={() => handleProfileMenuClick('/listings')}
                        className="w-full text-left px-4 py-3 text-sm cursor-pointer transition-all hover:brightness-110"
                        style={{ backgroundColor: '#1F1F1F', color: '#F5F3F0' }}
                      >
                        My listings
                      </button>
                      <button
                        onClick={() => handleProfileMenuClick('/dao')}
                        className="w-full text-left px-4 py-3 text-sm cursor-pointer transition-all hover:brightness-110"
                        style={{ backgroundColor: '#1F1F1F', color: '#F5F3F0' }}
                      >
                        DAO access
                      </button>
                      <button
                        onClick={() => handleProfileMenuClick('/dao-space')}
                        className="w-full text-left px-4 py-3 text-sm cursor-pointer transition-all hover:brightness-110"
                        style={{ backgroundColor: '#1F1F1F', color: '#F5F3F0' }}
                      >
                        My proposals
                      </button>
                      <button
                        onClick={() => handleProfileMenuClick('/profile')}
                        className="w-full text-left px-4 py-3 text-sm cursor-pointer transition-all hover:brightness-110"
                        style={{ backgroundColor: '#1F1F1F', color: '#F5F3F0' }}
                      >
                        My badges
                      </button>
                      <button
                        onClick={() => handleProfileMenuClick('/profile')}
                        className="w-full text-left px-4 py-3 text-sm cursor-pointer transition-all hover:brightness-110"
                        style={{ backgroundColor: '#1F1F1F', color: '#F5F3F0' }}
                      >
                        Settings
                      </button>
                      <button
                        onClick={() => {
                          setIsWalletConnected(false);
                          setIsProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm cursor-pointer transition-all hover:brightness-110"
                        style={{ backgroundColor: '#1F1F1F', color: '#EF4444' }}
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
                style={{ backgroundColor: '#FF8C42', color: '#FFFFFF' }}
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-6">
        {/* Hero Question */}
        <div className="text-center" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
          <h2 className="text-3xl font-bold" style={{ color: '#F5F3F0' }}>
            📍 Looking for something around {selectedLocation.split(',')[0]}?
          </h2>
        </div>

        {/* Categories */}
        <section className="mb-20">
          <h3 className="text-2xl font-bold mb-8" style={{ color: '#F5F3F0' }}>
            Popular categories near you
          </h3>
          <div className="grid grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category.label)}
                className="flex flex-col items-center justify-center gap-3 rounded-2xl cursor-pointer transition-all hover:brightness-110"
                style={{ backgroundColor: '#262626', padding: '32px 24px' }}
              >
                <span className="text-4xl">{category.icon}</span>
                <span className="text-sm font-medium text-center" style={{ color: '#F5F3F0' }}>
                  {category.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Neighborhood Chips */}
        <section className="mb-16">
          <div className="flex flex-wrap gap-3">
            {neighborhoods.map((neighborhood, index) => (
              <button
                key={index}
                className="px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-all hover:border-opacity-100"
                style={{
                  backgroundColor: '#3A3A3A',
                  color: '#EDE8E3',
                  border: '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#FF8C42';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                {neighborhood}
              </button>
            ))}
          </div>
        </section>

        {/* Trending Searches */}
        <section className="mb-16">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-sm font-medium" style={{ color: '#F5F3F0' }}>
              Trending searches:
            </span>
            {trendingSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleTrendingClick(search)}
                className="text-sm cursor-pointer hover:opacity-80 transition-opacity"
                style={{ color: '#A6A19B' }}
              >
                {search}
              </button>
            ))}
          </div>
        </section>

        {/* Empty State */}
        <section className="py-32 text-center">
          <div className="max-w-md mx-auto">
            <p className="text-2xl font-semibold mb-3" style={{ color: '#F5F3F0' }}>
              No listings here yet 👋
            </p>
            <p className="text-lg" style={{ color: '#A6A19B' }}>
              Be the first to post in your neighborhood.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20" style={{ backgroundColor: '#2B2522' }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-4 gap-12 mb-16">
            {/* Left Block */}
            <div className="col-span-1">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
                SWITCH SOCIAL MARKET
              </h3>
              <p className="text-sm mb-6" style={{ color: '#D8D2CD' }}>
                © 2025 Switch Foundation.<br />
                All rights reserved.
              </p>
              <div className="flex gap-3">
                <a href="#youtube" className="w-10 h-10 flex items-center justify-center cursor-pointer transition-all hover:brightness-110">
                  <i className="ri-youtube-fill text-2xl" style={{ color: '#D8D2CD' }}></i>
                </a>
                <a href="#twitter" className="w-10 h-10 flex items-center justify-center cursor-pointer transition-all hover:brightness-110">
                  <i className="ri-twitter-x-fill text-2xl" style={{ color: '#D8D2CD' }}></i>
                </a>
                <a href="#discord" className="w-10 h-10 flex items-center justify-center cursor-pointer transition-all hover:brightness-110">
                  <i className="ri-discord-fill text-2xl" style={{ color: '#D8D2CD' }}></i>
                </a>
                <a href="#reddit" className="w-10 h-10 flex items-center justify-center cursor-pointer transition-all hover:brightness-110">
                  <i className="ri-reddit-fill text-2xl" style={{ color: '#D8D2CD' }}></i>
                </a>
                <a href="#github" className="w-10 h-10 flex items-center justify-center cursor-pointer transition-all hover:brightness-110">
                  <i className="ri-github-fill text-2xl" style={{ color: '#D8D2CD' }}></i>
                </a>
                <a href="#telegram" className="w-10 h-10 flex items-center justify-center cursor-pointer transition-all hover:brightness-110">
                  <i className="ri-telegram-fill text-2xl" style={{ color: '#D8D2CD' }}></i>
                </a>
              </div>
            </div>

            {/* Switch Column */}
            <div>
              <h4 className="text-lg font-semibold mb-4" style={{ color: '#FFFFFF' }}>
                Switch
              </h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-sm cursor-pointer hover:opacity-80 transition-opacity" style={{ color: '#D8D2CD' }}>About</a></li>
                <li><a href="#team" className="text-sm cursor-pointer hover:opacity-80 transition-opacity" style={{ color: '#D8D2CD' }}>Team</a></li>
                <li><a href="#vision" className="text-sm cursor-pointer hover:opacity-80 transition-opacity" style={{ color: '#D8D2CD' }}>Vision</a></li>
                <li><a href="#contact" className="text-sm cursor-pointer hover:opacity-80 transition-opacity" style={{ color: '#D8D2CD' }}>Contact</a></li>
              </ul>
            </div>

            {/* Community Column */}
            <div>
              <h4 className="text-lg font-semibold mb-4" style={{ color: '#FFFFFF' }}>
                Community
              </h4>
              <ul className="space-y-2">
                <li><a href="#discord" className="text-sm cursor-pointer hover:opacity-80 transition-opacity" style={{ color: '#D8D2CD' }}>Discord</a></li>
                <li><a href="#telegram" className="text-sm cursor-pointer hover:opacity-80 transition-opacity" style={{ color: '#D8D2CD' }}>Telegram</a></li>
                <li><a href="#twitter" className="text-sm cursor-pointer hover:opacity-80 transition-opacity" style={{ color: '#D8D2CD' }}>Twitter(X)</a></li>
                <li><a href="#announcements" className="text-sm cursor-pointer hover:opacity-80 transition-opacity" style={{ color: '#D8D2CD' }}>Announcements</a></li>
                <li><a href="#apply" className="text-sm cursor-pointer hover:opacity-80 transition-opacity" style={{ color: '#D8D2CD' }}>Apply as Local Leader</a></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="text-lg font-semibold mb-4" style={{ color: '#FFFFFF' }}>
                Legal
              </h4>
              <ul className="space-y-2">
                <li><a href="#terms" className="text-sm cursor-pointer hover:opacity-80 transition-opacity" style={{ color: '#D8D2CD' }}>Terms of Service</a></li>
                <li><a href="#privacy" className="text-sm cursor-pointer hover:opacity-80 transition-opacity" style={{ color: '#D8D2CD' }}>Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t" style={{ borderColor: '#4A3A32' }}>
            <p className="text-center text-sm">
              <a 
                href="https://readdy.ai/?origin=logo" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cursor-pointer hover:opacity-80 transition-opacity"
                style={{ color: '#D8D2CD' }}
              >
                Powered by Readdy
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
