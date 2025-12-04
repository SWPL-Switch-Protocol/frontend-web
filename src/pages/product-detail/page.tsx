import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/feature/Header';
import AISummary from '../../components/feature/AISummary';

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

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [showEscrowModal, setShowEscrowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
        'https://readdy.ai/api/search-image?query=Nintendo%20Switch%20OLED%20white%20gaming%20console%20front%20view%20on%20clean%20minimal%20white%20surface%20with%20soft%20natural%20lighting%20professional%20product%20photography%20high%20quality%20sharp%20focus%20modern%20aesthetic%20pristine%20condition&width=600&height=600&seq=product1-main&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Nintendo%20Switch%20OLED%20white%20console%20with%20Joy-Cons%20attached%20side%20angle%20view%20on%20minimal%20surface%20soft%20studio%20lighting%20professional%20product%20photography%20premium%20quality%20sharp%20details%20contemporary%20style&width=600&height=600&seq=product1-side&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Nintendo%20Switch%20OLED%20white%20console%20with%20dock%20and%20accessories%20organized%20layout%20on%20clean%20white%20background%20soft%20lighting%20professional%20product%20photography%20high%20quality%20complete%20set%20modern%20aesthetic&width=600&height=600&seq=product1-accessories&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Nintendo%20Switch%20OLED%20white%20console%20original%20box%20and%20packaging%20on%20minimal%20surface%20soft%20natural%20lighting%20professional%20product%20photography%20premium%20quality%20sharp%20focus%20modern%20style&width=600&height=600&seq=product1-box&orientation=squarish'
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
        'https://readdy.ai/api/search-image?query=Apple%20AirPods%20Pro%20white%20wireless%20earbuds%20in%20charging%20case%20on%20minimal%20beige%20surface%20soft%20lighting%20clean%20product%20photography%20premium%20quality%20sharp%20details%20modern%20style&width=600&height=600&seq=product2-main&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Apple%20AirPods%20Pro%20earbuds%20close%20up%20view%20showing%20design%20details%20on%20clean%20white%20background%20soft%20studio%20lighting%20professional%20product%20photography%20high%20quality&width=600&height=600&seq=product2-detail&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Apple%20AirPods%20Pro%20with%20all%20ear%20tips%20and%20accessories%20organized%20layout%20on%20minimal%20surface%20soft%20lighting%20professional%20product%20photography%20premium%20quality&width=600&height=600&seq=product2-accessories&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Apple%20AirPods%20Pro%20original%20box%20and%20packaging%20on%20clean%20white%20surface%20soft%20natural%20lighting%20professional%20product%20photography%20high%20quality%20modern%20aesthetic&width=600&height=600&seq=product2-box&orientation=squarish'
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
        'https://readdy.ai/api/search-image?query=Sony%20PlayStation%205%20console%20white%20modern%20gaming%20system%20on%20clean%20surface%20with%20controller%20soft%20studio%20lighting%20professional%20product%20photography%20high%20quality%20sharp%20focus%20contemporary%20aesthetic&width=600&height=600&seq=product3-main&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Sony%20PlayStation%205%20console%20side%20view%20showing%20ports%20and%20design%20on%20minimal%20background%20soft%20lighting%20professional%20product%20photography%20premium%20quality&width=600&height=600&seq=product3-side&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Sony%20PlayStation%205%20DualSense%20controller%20white%20wireless%20gamepad%20close%20up%20on%20clean%20surface%20soft%20studio%20lighting%20professional%20product%20photography%20high%20quality&width=600&height=600&seq=product3-controller&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Sony%20PlayStation%205%20console%20with%20all%20cables%20and%20accessories%20organized%20layout%20on%20minimal%20surface%20soft%20lighting%20professional%20product%20photography%20modern%20style&width=600&height=600&seq=product3-accessories&orientation=squarish'
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
        'https://readdy.ai/api/search-image?query=Canon%20DSLR%20camera%20professional%20black%20body%20with%20lens%20on%20minimal%20surface%20soft%20natural%20lighting%20clean%20product%20photography%20high%20quality%20sharp%20details%20modern%20photography%20equipment%20aesthetic&width=600&height=600&seq=product4-main&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Canon%20DSLR%20camera%20top%20view%20showing%20controls%20and%20LCD%20screen%20on%20clean%20white%20background%20soft%20studio%20lighting%20professional%20product%20photography%20premium%20quality&width=600&height=600&seq=product4-top&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Canon%20DSLR%20camera%20lens%20close%20up%20showing%20optical%20quality%20on%20minimal%20surface%20soft%20lighting%20professional%20product%20photography%20high%20quality%20sharp%20focus&width=600&height=600&seq=product4-lens&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Canon%20DSLR%20camera%20with%20battery%20charger%20and%20accessories%20organized%20layout%20on%20clean%20surface%20soft%20natural%20lighting%20professional%20product%20photography%20modern%20aesthetic&width=600&height=600&seq=product4-accessories&orientation=squarish'
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
        'https://readdy.ai/api/search-image?query=Apple%20iPad%20Pro%20silver%20tablet%20device%20on%20clean%20white%20surface%20with%20Apple%20Pencil%20soft%20studio%20lighting%20professional%20product%20photography%20premium%20quality%20sharp%20focus%20modern%20minimalist%20aesthetic&width=600&height=600&seq=product5-main&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Apple%20iPad%20Pro%20tablet%20side%20view%20showing%20slim%20design%20on%20minimal%20background%20soft%20natural%20lighting%20professional%20product%20photography%20high%20quality%20modern%20style&width=600&height=600&seq=product5-side&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Apple%20iPad%20Pro%20screen%20display%20showing%20interface%20on%20clean%20surface%20soft%20studio%20lighting%20professional%20product%20photography%20premium%20quality%20sharp%20details&width=600&height=600&seq=product5-screen&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Apple%20iPad%20Pro%20with%20original%20box%20and%20accessories%20organized%20layout%20on%20minimal%20white%20surface%20soft%20lighting%20professional%20product%20photography%20modern%20aesthetic&width=600&height=600&seq=product5-box&orientation=squarish'
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
        'https://readdy.ai/api/search-image?query=Trek%20mountain%20bike%20black%20and%20orange%20outdoor%20bicycle%20on%20clean%20background%20soft%20natural%20lighting%20professional%20product%20photography%20high%20quality%20sharp%20details%20modern%20sports%20equipment%20aesthetic&width=600&height=600&seq=product6-main&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Trek%20mountain%20bike%20side%20view%20showing%20frame%20and%20wheels%20on%20minimal%20background%20soft%20studio%20lighting%20professional%20product%20photography%20premium%20quality%20modern%20style&width=600&height=600&seq=product6-side&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Trek%20mountain%20bike%20close%20up%20showing%20gears%20and%20components%20on%20clean%20surface%20soft%20natural%20lighting%20professional%20product%20photography%20high%20quality%20sharp%20focus&width=600&height=600&seq=product6-detail&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Trek%20mountain%20bike%20with%20lock%20and%20accessories%20on%20minimal%20background%20soft%20lighting%20professional%20product%20photography%20modern%20sports%20equipment%20aesthetic&width=600&height=600&seq=product6-accessories&orientation=squarish'
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
        'https://readdy.ai/api/search-image?query=Pokemon%20trading%20card%20collection%20holographic%20rare%20cards%20on%20minimal%20surface%20soft%20lighting%20clean%20product%20photography%20high%20quality%20sharp%20focus%20collectible%20gaming%20cards%20modern%20aesthetic&width=600&height=600&seq=product7-main&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Pokemon%20trading%20cards%20spread%20out%20showing%20variety%20of%20cards%20on%20clean%20white%20background%20soft%20studio%20lighting%20professional%20product%20photography%20premium%20quality&width=600&height=600&seq=product7-spread&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Pokemon%20holographic%20cards%20close%20up%20showing%20shine%20and%20details%20on%20minimal%20surface%20soft%20natural%20lighting%20professional%20product%20photography%20high%20quality%20sharp%20focus&width=600&height=600&seq=product7-holo&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Pokemon%20card%20collection%20in%20protective%20sleeves%20and%20storage%20box%20on%20clean%20surface%20soft%20lighting%20professional%20product%20photography%20modern%20collectible%20aesthetic&width=600&height=600&seq=product7-storage&orientation=squarish'
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
        'https://readdy.ai/api/search-image?query=modern%20beige%20fabric%20sofa%20couch%20furniture%20piece%20on%20clean%20white%20background%20soft%20studio%20lighting%20professional%20product%20photography%20high%20quality%20sharp%20details%20contemporary%20home%20furniture%20aesthetic&width=600&height=600&seq=product8-main&orientation=squarish',
        'https://readdy.ai/api/search-image?query=modern%20fabric%20sofa%20side%20angle%20view%20showing%20design%20and%20cushions%20on%20minimal%20background%20soft%20natural%20lighting%20professional%20product%20photography%20premium%20quality&width=600&height=600&seq=product8-side&orientation=squarish',
        'https://readdy.ai/api/search-image?query=modern%20fabric%20sofa%20close%20up%20showing%20upholstery%20texture%20and%20quality%20on%20clean%20surface%20soft%20studio%20lighting%20professional%20product%20photography%20high%20quality&width=600&height=600&seq=product8-detail&orientation=squarish',
        'https://readdy.ai/api/search-image?query=modern%20fabric%20sofa%20with%20throw%20pillows%20styled%20setup%20on%20minimal%20background%20soft%20lighting%20professional%20product%20photography%20contemporary%20home%20furniture%20aesthetic&width=600&height=600&seq=product8-styled&orientation=squarish'
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
        'https://readdy.ai/api/search-image?query=Apple%20MacBook%20Air%20silver%20laptop%20computer%20on%20minimal%20white%20surface%20soft%20natural%20lighting%20professional%20product%20photography%20premium%20quality%20sharp%20focus%20modern%20technology%20aesthetic&width=600&height=600&seq=product9-main&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Apple%20MacBook%20Air%20laptop%20open%20showing%20screen%20and%20keyboard%20on%20clean%20background%20soft%20studio%20lighting%20professional%20product%20photography%20high%20quality%20modern%20style&width=600&height=600&seq=product9-open&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Apple%20MacBook%20Air%20laptop%20side%20view%20showing%20slim%20profile%20on%20minimal%20surface%20soft%20natural%20lighting%20professional%20product%20photography%20premium%20quality%20sharp%20details&width=600&height=600&seq=product9-side&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Apple%20MacBook%20Air%20with%20charger%20and%20original%20box%20on%20clean%20white%20surface%20soft%20lighting%20professional%20product%20photography%20modern%20technology%20aesthetic&width=600&height=600&seq=product9-accessories&orientation=squarish'
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
        'https://readdy.ai/api/search-image?query=outdoor%20camping%20tent%20orange%20and%20gray%20portable%20shelter%20on%20clean%20background%20soft%20natural%20lighting%20professional%20product%20photography%20high%20quality%20sharp%20details%20modern%20outdoor%20gear%20aesthetic&width=600&height=600&seq=product10-main&orientation=squarish',
        'https://readdy.ai/api/search-image?query=camping%20tent%20set%20up%20showing%20interior%20space%20on%20minimal%20background%20soft%20lighting%20professional%20product%20photography%20premium%20quality%20modern%20outdoor%20equipment&width=600&height=600&seq=product10-interior&orientation=squarish',
        'https://readdy.ai/api/search-image?query=camping%20tent%20packed%20in%20carrying%20bag%20with%20stakes%20on%20clean%20surface%20soft%20natural%20lighting%20professional%20product%20photography%20high%20quality%20modern%20style&width=600&height=600&seq=product10-packed&orientation=squarish',
        'https://readdy.ai/api/search-image?query=camping%20tent%20rainfly%20and%20accessories%20organized%20layout%20on%20minimal%20background%20soft%20studio%20lighting%20professional%20product%20photography%20outdoor%20gear%20aesthetic&width=600&height=600&seq=product10-accessories&orientation=squarish'
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
        'https://readdy.ai/api/search-image?query=Bose%20wireless%20headphones%20black%20premium%20audio%20equipment%20on%20minimal%20surface%20soft%20studio%20lighting%20professional%20product%20photography%20high%20quality%20sharp%20focus%20modern%20technology%20aesthetic&width=600&height=600&seq=product11-main&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Bose%20headphones%20side%20view%20showing%20design%20and%20ear%20cups%20on%20clean%20white%20background%20soft%20natural%20lighting%20professional%20product%20photography%20premium%20quality&width=600&height=600&seq=product11-side&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Bose%20headphones%20with%20carrying%20case%20and%20cables%20on%20minimal%20surface%20soft%20studio%20lighting%20professional%20product%20photography%20high%20quality%20modern%20style&width=600&height=600&seq=product11-case&orientation=squarish',
        'https://readdy.ai/api/search-image?query=Bose%20headphones%20folded%20in%20carrying%20case%20with%20accessories%20organized%20layout%20on%20clean%20surface%20soft%20lighting%20professional%20product%20photography%20modern%20aesthetic&width=600&height=600&seq=product11-accessories&orientation=squarish'
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
        'https://readdy.ai/api/search-image?query=wooden%20dining%20table%20set%20with%20four%20chairs%20natural%20wood%20furniture%20on%20clean%20white%20background%20soft%20lighting%20professional%20product%20photography%20high%20quality%20sharp%20details%20modern%20home%20furniture%20aesthetic&width=600&height=600&seq=product12-main&orientation=squarish',
        'https://readdy.ai/api/search-image?query=wooden%20dining%20table%20top%20view%20showing%20wood%20grain%20and%20finish%20on%20minimal%20background%20soft%20natural%20lighting%20professional%20product%20photography%20premium%20quality&width=600&height=600&seq=product12-top&orientation=squarish',
        'https://readdy.ai/api/search-image?query=wooden%20dining%20chair%20close%20up%20showing%20design%20and%20construction%20on%20clean%20surface%20soft%20studio%20lighting%20professional%20product%20photography%20high%20quality%20modern%20style&width=600&height=600&seq=product12-chair&orientation=squarish',
        'https://readdy.ai/api/search-image?query=wooden%20dining%20table%20set%20styled%20with%20chairs%20arranged%20on%20minimal%20background%20soft%20lighting%20professional%20product%20photography%20contemporary%20home%20furniture%20aesthetic&width=600&height=600&seq=product12-styled&orientation=squarish'
      ]
    }
  };

  const relatedItems = [
    {
      id: '1',
      image: 'https://readdy.ai/api/search-image?query=Nintendo%20Switch%20Lite%20yellow%20handheld%20gaming%20console%20on%20clean%20minimal%20surface%20soft%20natural%20lighting%20professional%20product%20photography%20high%20quality%20sharp%20focus%20modern%20aesthetic&width=400&height=400&seq=related1&orientation=squarish',
      title: 'Nintendo Switch Lite – Yellow',
      price: 160,
      trustLevel: 'High Trust',
      distance: '1.2 mi away'
    },
    {
      id: '2',
      image: 'https://readdy.ai/api/search-image?query=Sony%20PlayStation%205%20DualSense%20controller%20white%20wireless%20gamepad%20on%20minimal%20beige%20surface%20soft%20lighting%20professional%20product%20photography%20premium%20quality%20sharp%20details%20modern%20style&width=400&height=400&seq=related2&orientation=squarish',
      title: 'PS5 Controller – White',
      price: 55,
      trustLevel: 'Medium Trust',
      distance: '0.9 mi away'
    },
    {
      id: '3',
      image: 'https://readdy.ai/api/search-image?query=The%20Legend%20of%20Zelda%20Tears%20of%20the%20Kingdom%20Nintendo%20Switch%20game%20case%20on%20clean%20white%20surface%20soft%20natural%20lighting%20professional%20product%20photography%20high%20quality%20sharp%20focus%20modern%20aesthetic&width=400&height=400&seq=related3&orientation=squarish',
      title: 'Zelda: Tears of the Kingdom',
      price: 45,
      trustLevel: 'High Trust',
      distance: '1.5 mi away'
    }
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1B1B1B' }}>
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
                style={{ aspectRatio: '1/1', backgroundColor: '#2B2B2B' }}
              ></div>
              <div className="grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl animate-pulse"
                    style={{ aspectRatio: '1/1', backgroundColor: '#2B2B2B' }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Right Side - Info Skeleton */}
            <div className="rounded-2xl p-8" style={{ backgroundColor: '#1F1F1F' }}>
              <div className="h-8 rounded mb-4 animate-pulse" style={{ backgroundColor: '#2B2B2B', width: '80%' }}></div>
              <div className="h-10 rounded mb-6 animate-pulse" style={{ backgroundColor: '#2B2B2B', width: '30%' }}></div>
              <div className="h-6 rounded mb-6 animate-pulse" style={{ backgroundColor: '#2B2B2B', width: '50%' }}></div>
              <div className="h-px mb-6" style={{ backgroundColor: '#2B2B2B' }}></div>
              <div className="space-y-3 mb-8">
                <div className="h-5 rounded animate-pulse" style={{ backgroundColor: '#2B2B2B', width: '60%' }}></div>
                <div className="h-5 rounded animate-pulse" style={{ backgroundColor: '#2B2B2B', width: '70%' }}></div>
                <div className="h-5 rounded animate-pulse" style={{ backgroundColor: '#2B2B2B', width: '50%' }}></div>
              </div>
            </div>
          </div>
        ) : !product ? (
          <div className="py-32 text-center">
            <p className="text-2xl font-semibold mb-3" style={{ color: '#F5F3F0' }}>
              Product not found
            </p>
            <p className="text-lg mb-6" style={{ color: '#A6A19B' }}>
              This listing may have been removed or doesn't exist.
            </p>
            <button
              onClick={() => navigate('/listings')}
              className="px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
              style={{ backgroundColor: '#FF8C42', color: '#FFFFFF' }}
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
                    style={{ aspectRatio: '1/1', backgroundColor: '#262626' }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/600x600/3A3A3A/F5F3F0?text=Image+Not+Available';
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
                        border: selectedImage === index ? '2px solid #FF8C42' : '2px solid transparent',
                        opacity: selectedImage === index ? 1 : 0.6
                      }}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full object-cover"
                        style={{ aspectRatio: '1/1' }}
                        onError={(e) => {
                          e.currentTarget.src = 'https://placehold.co/150x150/3A3A3A/F5F3F0?text=N/A';
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Side - Product Info */}
              <div className="rounded-2xl p-8" style={{ backgroundColor: '#1F1F1F' }}>
                {/* Title */}
                <h2 className="text-3xl font-bold mb-4" style={{ color: '#F5F3F0' }}>
                  {product.title}
                </h2>

                {/* Price */}
                <p className="text-4xl font-bold mb-6" style={{ color: '#FF8C42' }}>
                  ${product.price}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap"
                    style={{ backgroundColor: '#262626', color: '#4ADE80' }}
                  >
                    {product.condition}
                  </span>
                  <span
                    className="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap"
                    style={{ backgroundColor: '#262626', color: '#A6A19B' }}
                  >
                    {product.category}
                  </span>
                </div>

                {/* Distance */}
                <p className="text-sm mb-6" style={{ color: '#A6A19B' }}>
                  📍 {product.distance}
                </p>

                {/* Divider */}
                <div className="h-px mb-6" style={{ backgroundColor: '#2B2B2B' }}></div>

                {/* Seller Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4" style={{ color: '#F5F3F0' }}>
                    Seller information
                  </h3>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm" style={{ color: '#A6A19B' }}>Seller DID:</span>
                      <span className="text-sm font-medium" style={{ color: '#F5F3F0' }}>{product.seller}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <i className="ri-checkbox-circle-fill" style={{ color: getTrustColor(product.trustLevel), fontSize: '18px' }}></i>
                      <span className="text-sm font-medium" style={{ color: getTrustColor(product.trustLevel) }}>{product.trustLevel}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm" style={{ color: '#A6A19B' }}>Completed trades:</span>
                      <span className="text-sm font-medium" style={{ color: '#F5F3F0' }}>{product.completedTrades}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm" style={{ color: '#A6A19B' }}>Member since:</span>
                      <span className="text-sm font-medium" style={{ color: '#F5F3F0' }}>{product.memberSince}</span>
                    </div>
                  </div>

                  <p className="text-xs mb-4" style={{ color: '#B3ADA7' }}>
                    Reputation is stored on-chain and cannot be altered.
                  </p>

                  <button
                    onClick={() => navigate(`/seller/${product.seller}`)}
                    className="px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
                    style={{ backgroundColor: '#262626', color: '#F5F3F0' }}
                  >
                    View profile
                  </button>
                </div>

                {/* Divider */}
                <div className="h-px mb-8" style={{ backgroundColor: '#2B2B2B' }}></div>

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
                    style={{ backgroundColor: '#FF8C42', color: '#FFFFFF', height: '54px' }}
                  >
                    Buy with Escrow
                  </button>

                  <p className="text-xs text-center" style={{ color: '#B3ADA7' }}>
                    Your payment will be securely held until both sides confirm.
                  </p>
                </div>
              </div>
            </div>

            {/* Detail Sections */}
            <div className="grid grid-cols-2 gap-12 mb-20">
              {/* Description */}
              <div className="rounded-2xl p-8" style={{ backgroundColor: '#1F1F1F' }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F3F0' }}>
                  Description
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#D8D2CD' }}>
                  {product.description}
                </p>
              </div>

              {/* Included Items */}
              <div className="rounded-2xl p-8" style={{ backgroundColor: '#1F1F1F' }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F3F0' }}>
                  Included items
                </h3>
                <ul className="space-y-2">
                  {product.includedItems.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <i className="ri-checkbox-circle-fill" style={{ color: '#4ADE80', fontSize: '16px' }}></i>
                      <span className="text-sm" style={{ color: '#D8D2CD' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pickup Info */}
            <div className="rounded-2xl p-8 mb-12" style={{ backgroundColor: '#1F1F1F' }}>
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#F5F3F0' }}>
                Pickup info
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm" style={{ color: '#A6A19B' }}>Neighborhood:</span>
                  <span className="text-sm font-medium" style={{ color: '#F5F3F0' }}>{product.neighborhood}</span>
                </div>
                <p className="text-sm" style={{ color: '#D8D2CD' }}>
                  Pickup only / meetup at public location
                </p>
              </div>
            </div>

            {/* Safety Notice */}
            <div className="rounded-xl p-6 mb-20 flex items-start gap-4" style={{ backgroundColor: '#262626' }}>
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                <i className="ri-shield-check-fill text-xl" style={{ color: '#4ADE80' }}></i>
              </div>
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: '#F5F3F0' }}>
                  No off-platform messaging required.
                </p>
                <p className="text-xs" style={{ color: '#B3ADA7' }}>
                  No Venmo, Cash App, or meetup scams — escrow keeps your payment safe.
                </p>
              </div>
            </div>

            {/* Related Items */}
            <section>
              <h3 className="text-2xl font-bold mb-8" style={{ color: '#F5F3F0' }}>
                You may also like
              </h3>

              <div className="grid grid-cols-3 gap-6">
                {relatedItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl overflow-hidden cursor-pointer transition-all hover:brightness-110"
                    style={{ backgroundColor: '#1F1F1F', padding: '16px' }}
                    onClick={() => {
                      setSelectedImage(0);
                      navigate(`/product/${item.id}`);
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full rounded-xl mb-4 object-cover"
                      style={{ aspectRatio: '1/1' }}
                      onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/400x400/3A3A3A/F5F3F0?text=Image+Not+Available';
                      }}
                    />
                    <h4 className="text-base font-semibold mb-2 line-clamp-2" style={{ color: '#F5F3F0' }}>
                      {item.title}
                    </h4>
                    <p className="text-2xl font-bold mb-3" style={{ color: '#FF8C42' }}>
                      ${item.price}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <i className="ri-checkbox-circle-fill" style={{ color: getTrustColor(item.trustLevel), fontSize: '16px' }}></i>
                      <span className="text-sm font-medium" style={{ color: getTrustColor(item.trustLevel) }}>
                        {item.trustLevel}
                      </span>
                      <span className="text-sm" style={{ color: '#A6A19B' }}>
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
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
          onClick={() => setShowEscrowModal(false)}
        >
          <div
            className="rounded-2xl p-8 max-w-md w-full mx-4"
            style={{ backgroundColor: '#1F1F1F' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#F5F3F0' }}>
              Confirm purchase
            </h3>

            <p className="text-sm mb-6 leading-relaxed" style={{ color: '#D8D2CD' }}>
              Payment will be held in blockchain-based escrow. Funds are only released when both parties confirm.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleConfirmPurchase}
                className="flex-1 py-3 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:opacity-90"
                style={{ backgroundColor: '#FF8C42', color: '#FFFFFF' }}
              >
                Confirm
              </button>
              <button
                onClick={() => setShowEscrowModal(false)}
                className="flex-1 py-3 rounded-full font-semibold text-sm whitespace-nowrap cursor-pointer transition-all hover:brightness-110"
                style={{ backgroundColor: 'transparent', color: '#F5F3F0', border: '1px solid #3A3A3A' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
                <a href="#youtube" className="w-6 h-6 flex items-center justify-center cursor-pointer transition-all hover:brightness-110">
                  <i className="ri-youtube-fill text-xl" style={{ color: '#D8D2CD' }}></i>
                </a>
                <a href="#twitter" className="w-6 h-6 flex items-center justify-center cursor-pointer transition-all hover:brightness-110">
                  <i className="ri-twitter-x-fill text-xl" style={{ color: '#D8D2CD' }}></i>
                </a>
                <a href="#discord" className="w-6 h-6 flex items-center justify-center cursor-pointer transition-all hover:brightness-110">
                  <i className="ri-discord-fill text-xl" style={{ color: '#D8D2CD' }}></i>
                </a>
                <a href="#reddit" className="w-6 h-6 flex items-center justify-center cursor-pointer transition-all hover:brightness-110">
                  <i className="ri-reddit-fill text-xl" style={{ color: '#D8D2CD' }}></i>
                </a>
                <a href="#github" className="w-6 h-6 flex items-center justify-center cursor-pointer transition-all hover:brightness-110">
                  <i className="ri-github-fill text-xl" style={{ color: '#D8D2CD' }}></i>
                </a>
                <a href="#telegram" className="w-6 h-6 flex items-center justify-center cursor-pointer transition-all hover:brightness-110">
                  <i className="ri-telegram-fill text-xl" style={{ color: '#D8D2CD' }}></i>
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
