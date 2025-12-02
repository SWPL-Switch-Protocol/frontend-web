
interface ListingPreviewProps {
  formData: {
    title: string;
    category: string;
    condition: string;
    description: string;
    price: string;
    escrowEnabled: boolean;
    includedItems: string[];
    pickupInstructions: string;
    pickupOnly: boolean;
    images: File[];
  };
  onBack: () => void;
  onPublish: () => void;
}

export default function ListingPreview({ formData, onBack, onPublish }: ListingPreviewProps) {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      {/* Header */}
      <div className="bg-zinc-800 border-b border-zinc-700 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 bg-zinc-700 hover:bg-zinc-600 rounded-full flex items-center justify-center cursor-pointer transition-all"
            >
              <i className="ri-arrow-left-line text-lg"></i>
            </button>
            <div>
              <h1 className="text-xl font-bold">Preview Listing</h1>
              <p className="text-sm text-zinc-400">This is how your listing will appear to buyers</p>
            </div>
          </div>
          <button
            onClick={onPublish}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold whitespace-nowrap cursor-pointer transition-all"
          >
            Publish listing
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <div className="aspect-square bg-zinc-800 rounded-xl overflow-hidden mb-4">
              {formData.images.length > 0 ? (
                <img
                  src={URL.createObjectURL(formData.images[0])}
                  alt={formData.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <i className="ri-image-line text-6xl text-zinc-600"></i>
                </div>
              )}
            </div>
            {formData.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {formData.images.slice(1, 5).map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`${formData.title} ${index + 2}`}
                    className="aspect-square object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-zinc-700 rounded text-xs font-medium">{formData.category}</span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">{formData.condition}</span>
              </div>
              <h1 className="text-3xl font-bold mb-4">{formData.title}</h1>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-orange-500">${formData.price}</span>
                {formData.escrowEnabled && (
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">
                    Escrow protected
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-zinc-700 pt-6">
              <h3 className="font-semibold mb-3">Description</h3>
              <p className="text-zinc-300 leading-relaxed">{formData.description}</p>
            </div>

            {formData.includedItems.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">What's included</h3>
                <div className="grid grid-cols-2 gap-2">
                  {formData.includedItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <i className="ri-check-line text-green-400 text-sm"></i>
                      <span className="text-sm text-zinc-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-zinc-800 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <i className="ri-map-pin-2-fill text-white text-sm"></i>
                </div>
                <div>
                  <p className="font-medium">Pickup in Williamsburg, Brooklyn</p>
                  <p className="text-xs text-zinc-400">Local pickup only</p>
                </div>
              </div>
              {formData.pickupInstructions && (
                <p className="text-sm text-zinc-300 ml-11">{formData.pickupInstructions}</p>
              )}
            </div>

            <div className="bg-zinc-800 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">JD</span>
                </div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i key={star} className="ri-star-fill text-yellow-400 text-xs"></i>
                      ))}
                    </div>
                    <span>4.8 • 24 reviews</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full py-4 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold text-lg whitespace-nowrap cursor-pointer transition-all">
              Contact seller
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
