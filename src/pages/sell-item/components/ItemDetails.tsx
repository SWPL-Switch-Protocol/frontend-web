
interface ItemDetailsProps {
  formData: {
    title: string;
    category: string;
    condition: string;
    description: string;
  };
  updateFormData: (field: string, value: string) => void;
}

export default function ItemDetails({ formData, updateFormData }: ItemDetailsProps) {
  const categories = [
    'Electronics & Devices',
    'Gaming & Consoles',
    'Collectibles & Trading Cards',
    'Home & Furniture',
    'Outdoor & Gear',
    'Local Community items'
  ];

  const conditions = ['New', 'Like-new', 'Good', 'Fair', 'Needs repair'];

  return (
    <div className="bg-zinc-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-6">Item details</h3>
      
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Item title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => updateFormData('title', e.target.value)}
            placeholder="e.g., Nintendo Switch OLED"
            className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg focus:border-orange-400 focus:outline-none text-sm"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <div className="relative">
            <select
              value={formData.category}
              onChange={(e) => updateFormData('category', e.target.value)}
              className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg focus:border-orange-400 focus:outline-none text-sm appearance-none pr-8 cursor-pointer"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <i className="ri-arrow-down-s-line text-zinc-400"></i>
            </div>
          </div>
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-medium mb-3">Condition</label>
          <div className="flex flex-wrap gap-3">
            {conditions.map((condition) => (
              <button
                key={condition}
                onClick={() => updateFormData('condition', condition)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-all ${
                  formData.condition === condition
                    ? 'bg-orange-500 text-white'
                    : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                }`}
              >
                {condition}
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            placeholder="Describe the condition, included items, and any important details..."
            maxLength={500}
            rows={4}
            className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg focus:border-orange-400 focus:outline-none text-sm resize-none"
          />
          <div className="text-right text-xs text-zinc-500 mt-2">
            {formData.description.length}/500
          </div>
        </div>
      </div>
    </div>
  );
}
