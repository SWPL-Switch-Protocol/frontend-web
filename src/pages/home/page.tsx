import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3AuthConnect, useWeb3AuthDisconnect } from '@web3auth/modal/react';
import { useAccount } from 'wagmi';

interface ProductData {
  id: string;
  title: string;
  price: number;
  condition: string;
  category: string;
  distance: string;
  seller: string;
  trustLevel: 'High Trust' | 'Medium Trust' | 'New User';
  completedTrades: number;
  memberSince: string;
  description: string;
  includedItems: string[];
  neighborhood: string;
  images: string[];
}

export default function Home() {
  const navigate = useNavigate();
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Brooklyn, NY');
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { connect, isConnected } = useWeb3AuthConnect();
  const { disconnect } = useWeb3AuthDisconnect();
  const { address } = useAccount();

  const shortenAddress = (addr: string | undefined) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';

  const getTrustColor = (level: string) => {
    switch (level) {
      case 'High Trust':
        return '#4ADE80';
      case 'Medium Trust':
        return '#FBBF24';
      case 'New User':
        return '#94A3B8';
      default:
        return '#94A3B8';
    }
  };

  const mockProducts: Record<string, ProductData> = {
    '1': {
      id: '1',
      title: 'Nintendo Switch OLED – White',
      price: 260,
      condition: 'Like-new',
      category: 'Gaming & Consoles',
      distance: '0.8 mi away',
      seller: '0xA4...92b1',
      trustLevel: 'High Trust',
      completedTrades: 12,
      memberSince: '2025',
      description: 'Gently used Switch OLED purchased in 2024. Includes original box and cables. Screen is in perfect condition with no scratches. Console has been well maintained and works flawlessly. All Joy-Cons function properly with no drift issues.',
      includedItems: ['Console', 'Joy-Cons (White)', 'Dock', 'HDMI cable', 'Power adapter'],
      neighborhood: 'Williamsburg',
      images: [
        'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1629814249584-bd4d53cf0e7d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1592107761705-30a1bbc641e7?auto=format&fit=crop&w=800&q=80'
      ]
    },
    '2': {
      id: '2',
      title: 'AirPods Pro (2nd Gen) – Like New',
      price: 180,
      condition: 'Like-new',
      category: 'Electronics & Devices',
      distance: '1.2 mi away',
      seller: '0xB7...43c2',
      trustLevel: 'High Trust',
      completedTrades: 18,
      memberSince: '2024',
      description: 'Apple AirPods Pro 2nd generation in excellent condition. Used for only 3 months. All features working perfectly including active noise cancellation and spatial audio. Comes with original charging case and all ear tips.',
      includedItems: ['AirPods Pro', 'Charging case', 'USB-C cable', 'All ear tips (S/M/L)', 'Original box'],
      neighborhood: 'Park Slope',
      images: [
        'https://images.unsplash.com/photo-1603351154351-5cf99bc32f2d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1629367494173-c78a56567877?auto=format&fit=crop&w=800&q=80'
      ]
    },
    '3': {
      id: '3',
      title: 'PlayStation 5 Console + Controller',
      price: 450,
      condition: 'Used',
      category: 'Gaming & Consoles',
      distance: '2.1 mi away',
      seller: '0xC9...84d3',
      trustLevel: 'Medium Trust',
      completedTrades: 7,
      memberSince: '2025',
      description: 'PlayStation 5 console in good working condition. Purchased in 2023. Includes one DualSense controller. Console has minor cosmetic wear but functions perfectly. All ports and features working properly.',
      includedItems: ['PS5 Console', 'DualSense Controller', 'HDMI cable', 'Power cable', 'USB cable'],
      neighborhood: 'Bushwick',
      images: [
        'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1621259182902-8854256ece48?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?auto=format&fit=crop&w=800&q=80'
      ]
    },
    '4': {
      id: '4',
      title: 'Canon EOS Rebel T7 DSLR Camera',
      price: 320,
      condition: 'Used',
      category: 'Electronics & Devices',
      distance: '1.5 mi away',
      seller: '0xD2...65e4',
      trustLevel: 'High Trust',
      completedTrades: 15,
      memberSince: '2024',
      description: 'Canon EOS Rebel T7 DSLR camera with 18-55mm lens. Great condition with minimal shutter count. Perfect for beginners or hobbyists. Includes battery, charger, and camera strap. No scratches on lens or LCD screen.',
      includedItems: ['Camera body', '18-55mm lens', 'Battery', 'Charger', 'Camera strap', 'Lens cap'],
      neighborhood: 'SoHo',
      images: [
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1519638831568-d9897f54ed69?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&w=800&q=80'
      ]
    },
    '5': {
      id: '5',
      title: 'iPad Pro 11" (2021) 128GB',
      price: 550,
      condition: 'Like-new',
      category: 'Electronics & Devices',
      distance: '0.5 mi away',
      seller: '0xE5...76f5',
      trustLevel: 'High Trust',
      completedTrades: 22,
      memberSince: '2024',
      description: 'iPad Pro 11-inch (2021) with M1 chip in excellent condition. 128GB storage, Space Gray. Screen is flawless with no scratches. Includes original box and charging cable. Battery health is excellent.',
      includedItems: ['iPad Pro 11"', 'USB-C cable', 'Power adapter', 'Original box', 'Documentation'],
      neighborhood: 'Williamsburg',
      images: [
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555617981-7783d03f3d61?auto=format&fit=crop&w=800&q=80'
      ]
    },
    '6': {
      id: '6',
      title: 'Trek Mountain Bike – 29" Wheels',
      price: 380,
      condition: 'Used',
      category: 'Outdoor & Gear Rentals',
      distance: '3.2 mi away',
      seller: '0xF8...87g6',
      trustLevel: 'Medium Trust',
      completedTrades: 5,
      memberSince: '2025',
      description: 'Trek mountain bike with 29-inch wheels. Great for trails and city riding. Recently serviced with new brake pads. Frame size medium. Some cosmetic wear but mechanically sound. Includes bike lock.',
      includedItems: ['Mountain bike', 'Bike lock', 'Water bottle holder'],
      neighborhood: 'Long Island City',
      images: [
        'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1485965120184-e224f7a1dbfe?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&q=80'
      ]
    },
    '7': {
      id: '7',
      title: 'Pokémon Card Collection (50+ cards)',
      price: 95,
      condition: 'Used',
      category: 'Collectibles & Trading Cards',
      distance: '1.8 mi away',
      seller: '0xG1...98h7',
      trustLevel: 'New User',
      completedTrades: 1,
      memberSince: '2025',
      description: 'Collection of over 50 Pokémon cards including several holographic and rare cards. Mix of different sets from various years. All cards are in good condition and stored in protective sleeves. Great starter collection.',
      includedItems: ['50+ Pokémon cards', 'Protective sleeves', 'Storage box'],
      neighborhood: 'Harlem',
      images: [
        'https://images.unsplash.com/photo-1613771404721-c5b27c15c385?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1638613067237-b1127ef06c00?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1601987177651-8edfe6c20009?auto=format&fit=crop&w=800&q=80'
      ]
    },
    '8': {
      id: '8',
      title: 'Modern Fabric Sofa – 3 Seater',
      price: 420,
      condition: 'Used',
      category: 'Home & Furniture',
      distance: '2.5 mi away',
      seller: '0xH4...09i8',
      trustLevel: 'High Trust',
      completedTrades: 9,
      memberSince: '2024',
      description: 'Comfortable 3-seater fabric sofa in light gray. Modern design with clean lines. In good condition with minor wear on armrests. Cushions are firm and supportive. Dimensions: 84" W x 36" D x 32" H. Pickup only.',
      includedItems: ['3-seater sofa', 'All cushions', 'Throw pillows (2)'],
      neighborhood: 'Tribeca',
      images: [
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1512212621149-107ffe572d2f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80'
      ]
    },
    '9': {
      id: '9',
      title: 'MacBook Air M1 (2020) 256GB',
      price: 750,
      condition: 'Used',
      category: 'Electronics & Devices',
      distance: '1.1 mi away',
      seller: '0xI7...10j9',
      trustLevel: 'High Trust',
      completedTrades: 14,
      memberSince: '2024',
      description: 'MacBook Air with M1 chip, 8GB RAM, 256GB SSD. Space Gray color. Excellent performance and battery life. Minor scratches on bottom case but screen is perfect. Includes original charger. macOS up to date.',
      includedItems: ['MacBook Air M1', 'MagSafe charger', 'USB-C cable', 'Original box'],
      neighborhood: 'Park Slope',
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1615750172635-6b17c1503ddc?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1531297461136-82lw9b285bb6?auto=format&fit=crop&w=800&q=80'
      ]
    },
    '10': {
      id: '10',
      title: 'Coleman 4-Person Camping Tent',
      price: 85,
      condition: 'Used',
      category: 'Outdoor & Gear Rentals',
      distance: '4.0 mi away',
      seller: '0xJ0...21k0',
      trustLevel: 'Medium Trust',
      completedTrades: 6,
      memberSince: '2025',
      description: 'Coleman camping tent for 4 people. Used on 3 camping trips. No tears or damage. Waterproof and includes rainfly. Easy to set up. Comes with carrying bag and all stakes. Great for weekend camping trips.',
      includedItems: ['Tent', 'Rainfly', 'Stakes', 'Carrying bag', 'Setup instructions'],
      neighborhood: 'Bronx',
      images: [
        'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80'
      ]
    },
    '11': {
      id: '11',
      title: 'Bose QuietComfort 45 Headphones',
      price: 220,
      condition: 'Like-new',
      category: 'Electronics & Devices',
      distance: '0.9 mi away',
      seller: '0xK3...32l1',
      trustLevel: 'High Trust',
      completedTrades: 19,
      memberSince: '2024',
      description: 'Bose QuietComfort 45 wireless headphones in excellent condition. Active noise cancellation works perfectly. Comfortable for long listening sessions. Includes carrying case and all cables. Battery life is still excellent.',
      includedItems: ['Headphones', 'Carrying case', 'USB-C cable', 'Audio cable', 'Original box'],
      neighborhood: 'Williamsburg',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
      ]
    },
    '12': {
      id: '12',
      title: 'Wooden Dining Table Set (4 Chairs)',
      price: 350,
      condition: 'Used',
      category: 'Home & Furniture',
      distance: '2.8 mi away',
      seller: '0xL6...43m2',
      trustLevel: 'Medium Trust',
      completedTrades: 8,
      memberSince: '2024',
      description: 'Solid wood dining table with 4 matching chairs. Natural wood finish. Table dimensions: 60" L x 36" W x 30" H. Some minor scratches from normal use but structurally sound. Chairs are comfortable and sturdy. Pickup only.',
      includedItems: ['Dining table', '4 chairs', 'Table pads'],
      neighborhood: 'Queens',
      images: [
        'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=800&q=80'
      ]
    }
  };

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
    void connect();
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

  const handleDisconnectWallet = () => {
    void disconnect();
    setIsProfileOpen(false);
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
            {isConnected && (
              <button
                onClick={() => navigate('/create-listing')}
                className="px-6 py-2 rounded-full font-medium text-sm whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
                style={{ backgroundColor: '#FF8C42', color: '#1B1B1B', height: '42px' }}
              >
                Sell item
              </button>
            )}

            {/* Wallet & Profile */}
            {isConnected ? (
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm" style={{ color: '#F5F3F0' }}>
                  {shortenAddress(address)}
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
                        onClick={handleDisconnectWallet}
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

        {/* Featured Listings */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold" style={{ color: '#F5F3F0' }}>
              Featured listings
            </h3>
            <button
              onClick={() => navigate('/listings')}
              className="text-sm font-medium cursor-pointer hover:opacity-80 transition-opacity"
              style={{ color: '#FF8C42' }}
            >
              View all
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {Object.values(mockProducts).map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl group"
                style={{ backgroundColor: '#1F1F1F' }}
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden bg-[#2B2B2B] relative">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/400x400/3A3A3A/F5F3F0?text=Image+Not+Available';
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    <button className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md bg-black/30 hover:bg-black/50 transition-colors">
                      <i className="ri-heart-line text-white"></i>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-medium line-clamp-2 text-sm leading-snug" style={{ color: '#F5F3F0' }}>
                      {product.title}
                    </h4>
                  </div>

                  <p className="text-lg font-bold mb-3" style={{ color: '#FF8C42' }}>
                    ${product.price}
                  </p>

                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <i className="ri-checkbox-circle-fill" style={{ color: getTrustColor(product.trustLevel) }}></i>
                      <span style={{ color: getTrustColor(product.trustLevel) }}>{product.trustLevel}</span>
                    </div>
                    <span style={{ color: '#57534E' }}>•</span>
                    <span style={{ color: '#A6A19B' }}>{product.distance}</span>
                  </div>
                </div>
              </div>
            ))}
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
