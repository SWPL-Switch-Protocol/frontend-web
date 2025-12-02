
interface PricingSectionProps {
  price: string;
  escrowEnabled: boolean;
  onPriceChange: (price: string) => void;
  onEscrowToggle: (enabled: boolean) => void;
}

export default function PricingSection({ 
  price, 
  escrowEnabled, 
  onPriceChange, 
  onEscrowToggle 
}: PricingSectionProps) {
  return (
    <div className="bg-zinc-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-6">Pricing</h3>
      
      <div className="space-y-6">
        {/* Price Input */}
        <div>
          <label className="block text-sm font-medium mb-2">Price (USD)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400">$</span>
            <input
              type="number"
              value={price}
              onChange={(e) => onPriceChange(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full pl-8 pr-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg focus:border-orange-400 focus:outline-none text-sm"
            />
          </div>
        </div>

        {/* Escrow Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium">Enable escrow payment</label>
            <p className="text-xs text-zinc-400 mt-1">Funds are securely held until both sides confirm.</p>
          </div>
          <button
            onClick={() => onEscrowToggle(!escrowEnabled)}
            className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
              escrowEnabled ? 'bg-orange-500' : 'bg-zinc-600'
            }`}
          >
            <div
              className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                escrowEnabled ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
