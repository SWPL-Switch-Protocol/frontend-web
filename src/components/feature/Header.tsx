import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Williamsburg, NY');
  const [isWalletConnected, setIsWalletConnected] = useState(true);
  const [walletAddress] = useState('0xA3...91c5');
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const locations = [
    'Williamsburg, NY',
    'Brooklyn, NY',
    'Manhattan, NY',
    'Queens, NY',
    'Bronx, NY',
    'Staten Island, NY',
    'Jersey City, NJ',
    'Hoboken, NJ'
  ];

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/listings?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleDisconnect = () => {
    setIsWalletConnected(false);
    setShowProfileDropdown(false);
  };

  const handleSellItem = () => {
    if (!isWalletConnected) {
      handleConnectWallet();
      return;
    }
    navigate('/create-listing');
  };

  return (
    <header className="sticky top-0 z-50" style={{ backgroundColor: '#1B1B1B', height: '72px', borderBottom: '1px solid #2A2A2A' }}>
      <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="/" className="cursor-pointer">
            <h1 className="text-xl font-bold whitespace-nowrap" style={{ color: '#FFFFFF' }}>
              Switch Social Market.io
            </h1>
          </a>
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
              placeholder="Search items in your area"
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
        <div className="flex items-center gap-3 flex-shrink-0">
          {!isWalletConnected ? (
            <button
              onClick={handleConnectWallet}
              className="px-6 py-2 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
              style={{ backgroundColor: '#FF8C42', color: '#FFFFFF' }}
            >
              Connect Wallet
            </button>
          ) : (
            <>
              {/* Wallet Connected State */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/sell')}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded-full font-semibold whitespace-nowrap cursor-pointer transition-all"
                >
                  Sell item
                </button>
              </div>

              {/* Wallet Address */}
              <div
                className="px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap"
                style={{ backgroundColor: '#262626', color: '#F5F3F0' }}
              >
                {walletAddress}
              </div>

              {/* Profile Icon with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:brightness-110"
                  style={{ backgroundColor: '#FF8C42', color: '#FFFFFF' }}
                >
                  <i className="ri-user-line text-xl"></i>
                </button>

                {showProfileDropdown && (
                  <div
                    className="absolute top-full right-0 mt-2 rounded-xl overflow-hidden shadow-lg z-50"
                    style={{ backgroundColor: '#1F1F1F', minWidth: '240px' }}
                  >
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setShowProfileDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm cursor-pointer transition-all hover:brightness-110"
                      style={{ color: '#F5F3F0' }}
                    >
                      My profile
                    </button>
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setShowProfileDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm cursor-pointer transition-all hover:brightness-110"
                      style={{ color: '#F5F3F0' }}
                    >
                      My reputation
                    </button>
                    <button
                      onClick={() => {
                        navigate('/sales-dashboard');
                        setShowProfileDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm cursor-pointer transition-all hover:brightness-110"
                      style={{ color: '#F5F3F0' }}
                    >
                      Sales dashboard ✅
                    </button>
                    <button
                      onClick={() => {
                        navigate('/listings');
                        setShowProfileDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm cursor-pointer transition-all hover:brightness-110"
                      style={{ color: '#F5F3F0' }}
                    >
                      My listings
                    </button>
                    <button
                      onClick={() => {
                        navigate('/dao');
                        setShowProfileDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm cursor-pointer transition-all hover:brightness-110"
                      style={{ color: '#F5F3F0' }}
                    >
                      DAO access
                    </button>
                    <button
                      onClick={() => {
                        navigate('/dao-space');
                        setShowProfileDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm cursor-pointer transition-all hover:brightness-110"
                      style={{ color: '#F5F3F0' }}
                    >
                      My proposals
                    </button>
                    <button
                      onClick={() => {
                        navigate('/badges');
                        setShowProfileDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm cursor-pointer transition-all hover:brightness-110"
                      style={{ color: '#F5F3F0' }}
                    >
                      My badges
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm cursor-pointer transition-all hover:brightness-110"
                      style={{ color: '#F5F3F0' }}
                    >
                      Settings
                    </button>
                    <button
                      onClick={handleDisconnect}
                      className="w-full px-4 py-3 text-left text-sm cursor-pointer transition-all hover:brightness-110"
                      style={{ color: '#EF4444' }}
                    >
                      Disconnect wallet
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
