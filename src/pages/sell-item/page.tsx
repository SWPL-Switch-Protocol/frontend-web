
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';
import ImageUpload from './components/ImageUpload';
import ItemDetails from './components/ItemDetails';
import PricingSection from './components/PricingSection';
import IncludedItems from './components/IncludedItems';
import PickupLocation from './components/PickupLocation';
import SafetyNotice from './components/SafetyNotice';
import ListingPreview from './components/ListingPreview';

export default function SellItemPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    condition: '',
    description: '',
    price: '',
    escrowEnabled: true,
    includedItems: [] as string[],
    customIncludedItem: '',
    pickupInstructions: '',
    pickupOnly: true,
    images: [] as File[]
  });
  const [showPreview, setShowPreview] = useState(false);

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return formData.title && 
           formData.category && 
           formData.condition && 
           formData.description && 
           formData.price &&
           formData.images.length > 0;
  };

  const handlePublish = () => {
    if (isFormValid()) {
      // Simulate success
      navigate('/profile');
    }
  };

  if (showPreview) {
    return (
      <ListingPreview 
        formData={formData}
        onBack={() => setShowPreview(false)}
        onPublish={handlePublish}
      />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">List an item for sale</h1>
            <p className="text-zinc-400">Your listing will be visible to trusted neighbors in your area.</p>
          </div>

          <div className="space-y-8">
            <ImageUpload 
              images={formData.images}
              onImagesChange={(images) => updateFormData('images', images)}
            />

            <ItemDetails 
              formData={formData}
              updateFormData={updateFormData}
            />

            <PricingSection 
              price={formData.price}
              escrowEnabled={formData.escrowEnabled}
              onPriceChange={(price) => updateFormData('price', price)}
              onEscrowToggle={(enabled) => updateFormData('escrowEnabled', enabled)}
            />

            <IncludedItems 
              includedItems={formData.includedItems}
              customItem={formData.customIncludedItem}
              onIncludedItemsChange={(items) => updateFormData('includedItems', items)}
              onCustomItemChange={(item) => updateFormData('customIncludedItem', item)}
            />

            <PickupLocation 
              pickupInstructions={formData.pickupInstructions}
              pickupOnly={formData.pickupOnly}
              onInstructionsChange={(instructions) => updateFormData('pickupInstructions', instructions)}
              onPickupOnlyToggle={(pickupOnly) => updateFormData('pickupOnly', pickupOnly)}
            />

            <SafetyNotice />

            {/* Action Buttons */}
            <div className="flex gap-4 pt-8">
              <button
                onClick={() => setShowPreview(true)}
                disabled={!isFormValid()}
                className="flex-1 px-6 py-3 bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold whitespace-nowrap cursor-pointer transition-all"
              >
                Preview listing
              </button>
              <button
                onClick={handlePublish}
                disabled={!isFormValid()}
                className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold whitespace-nowrap cursor-pointer transition-all"
              >
                Publish listing
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-800 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <i className="ri-swap-line text-white text-lg"></i>
                </div>
                <span className="font-bold text-xl" style={{ fontFamily: '"Pacifico", serif' }}>Switch Social Market</span>
              </div>
              <p className="text-zinc-400 text-sm">Safe local trading with on-chain reputation</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Marketplace</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="/listings" className="hover:text-orange-400 cursor-pointer">Browse items</a></li>
                <li><a href="/sell" className="hover:text-orange-400 cursor-pointer">Sell an item</a></li>
                <li><a href="/escrow" className="hover:text-orange-400 cursor-pointer">Escrow protection</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="/dao" className="hover:text-orange-400 cursor-pointer">DAO governance</a></li>
                <li><a href="/dao-space" className="hover:text-orange-400 cursor-pointer">Community space</a></li>
                <li><a href="/treasury" className="hover:text-orange-400 cursor-pointer">Treasury</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="/profile" className="hover:text-orange-400 cursor-pointer">My profile</a></li>
                <li><a href="/review" className="hover:text-orange-400 cursor-pointer">Leave review</a></li>
                <li><a href="#" className="hover:text-orange-400 cursor-pointer">Help center</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-zinc-500 text-sm">
            <p>&copy; 2024 Switch Social Market. Building trust in local commerce. <a href="https://readdy.ai/?origin=logo" className="hover:text-orange-400 cursor-pointer">Website Builder</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
