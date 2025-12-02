
interface PickupLocationProps {
  pickupInstructions: string;
  pickupOnly: boolean;
  onInstructionsChange: (instructions: string) => void;
  onPickupOnlyToggle: (pickupOnly: boolean) => void;
}

export default function PickupLocation({ 
  pickupInstructions, 
  pickupOnly, 
  onInstructionsChange, 
  onPickupOnlyToggle 
}: PickupLocationProps) {
  return (
    <div className="bg-zinc-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-6">Pickup info</h3>
      
      <div className="space-y-6">
        {/* Auto-detected Location */}
        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <div className="flex items-center gap-3 p-3 bg-zinc-700 rounded-lg">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <i className="ri-map-pin-2-fill text-white text-sm"></i>
            </div>
            <div>
              <p className="font-medium">Williamsburg, Brooklyn</p>
              <p className="text-xs text-zinc-400">Auto-detected from your profile</p>
            </div>
          </div>
        </div>

        {/* Pickup Instructions */}
        <div>
          <label className="block text-sm font-medium mb-2">Pickup instructions</label>
          <textarea
            value={pickupInstructions}
            onChange={(e) => onInstructionsChange(e.target.value)}
            placeholder="Public meetup or preferred location details"
            rows={3}
            className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg focus:border-orange-400 focus:outline-none text-sm resize-none"
          />
        </div>

        {/* Pickup Only Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium">Pickup only</label>
            <p className="text-xs text-zinc-400 mt-1">No shipping required</p>
          </div>
          <button
            onClick={() => onPickupOnlyToggle(!pickupOnly)}
            className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
              pickupOnly ? 'bg-orange-500' : 'bg-zinc-600'
            }`}
          >
            <div
              className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                pickupOnly ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
