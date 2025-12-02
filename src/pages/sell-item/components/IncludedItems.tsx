
import { useState } from 'react';

interface IncludedItemsProps {
  includedItems: string[];
  customItem: string;
  onIncludedItemsChange: (items: string[]) => void;
  onCustomItemChange: (item: string) => void;
}

export default function IncludedItems({ 
  includedItems, 
  customItem, 
  onIncludedItemsChange, 
  onCustomItemChange 
}: IncludedItemsProps) {
  const [showCustomInput, setShowCustomInput] = useState(false);

  const defaultItems = [
    'Original box',
    'Cables',
    'Accessories',
    'Manuals',
    'Extra parts'
  ];

  const toggleItem = (item: string) => {
    if (includedItems.includes(item)) {
      onIncludedItemsChange(includedItems.filter(i => i !== item));
    } else {
      onIncludedItemsChange([...includedItems, item]);
    }
  };

  const addCustomItem = () => {
    if (customItem.trim() && !includedItems.includes(customItem.trim())) {
      onIncludedItemsChange([...includedItems, customItem.trim()]);
      onCustomItemChange('');
      setShowCustomInput(false);
    }
  };

  const removeItem = (item: string) => {
    onIncludedItemsChange(includedItems.filter(i => i !== item));
  };

  return (
    <div className="bg-zinc-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-6">What's included? (optional)</h3>
      
      <div className="space-y-4">
        {/* Default Items */}
        <div className="grid grid-cols-2 gap-3">
          {defaultItems.map((item) => (
            <button
              key={item}
              onClick={() => toggleItem(item)}
              className={`flex items-center gap-3 p-3 rounded-lg text-left transition-all cursor-pointer ${
                includedItems.includes(item)
                  ? 'bg-orange-500/20 border border-orange-500/50'
                  : 'bg-zinc-700 hover:bg-zinc-600 border border-transparent'
              }`}
            >
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                includedItems.includes(item) 
                  ? 'border-orange-500 bg-orange-500' 
                  : 'border-zinc-500'
              }`}>
                {includedItems.includes(item) && (
                  <i className="ri-check-line text-white text-xs"></i>
                )}
              </div>
              <span className="text-sm">{item}</span>
            </button>
          ))}
        </div>

        {/* Custom Items Display */}
        {includedItems.filter(item => !defaultItems.includes(item)).length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-300">Custom items:</p>
            <div className="flex flex-wrap gap-2">
              {includedItems
                .filter(item => !defaultItems.includes(item))
                .map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 bg-orange-500/20 border border-orange-500/50 px-3 py-1 rounded-full"
                  >
                    <span className="text-sm">{item}</span>
                    <button
                      onClick={() => removeItem(item)}
                      className="w-4 h-4 flex items-center justify-center cursor-pointer"
                    >
                      <i className="ri-close-line text-xs"></i>
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Add Custom Item */}
        {showCustomInput ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={customItem}
              onChange={(e) => onCustomItemChange(e.target.value)}
              placeholder="Add custom item"
              className="flex-1 px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg focus:border-orange-400 focus:outline-none text-sm"
              onKeyDown={(e) => e.key === 'Enter' && addCustomItem()}
              autoFocus
            />
            <button
              onClick={addCustomItem}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer transition-all"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowCustomInput(false);
                onCustomItemChange('');
              }}
              className="px-4 py-2 bg-zinc-600 hover:bg-zinc-500 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer transition-all"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowCustomInput(true)}
            className="flex items-center gap-2 p-3 border-2 border-dashed border-zinc-600 rounded-lg text-zinc-400 hover:border-orange-400 hover:text-orange-400 transition-colors cursor-pointer w-full"
          >
            <i className="ri-add-line"></i>
            <span className="text-sm">Add custom item</span>
          </button>
        )}
      </div>
    </div>
  );
}
