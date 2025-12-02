
import { useRef } from 'react';

interface ImageUploadProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
}

export default function ImageUpload({ images, onImagesChange }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    const newImages = [...images, ...validFiles].slice(0, 6);
    onImagesChange(newImages);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    const newImages = [...images, ...validFiles].slice(0, 6);
    onImagesChange(newImages);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className="bg-zinc-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Add photos</h3>
      
      <div
        className="border-2 border-dashed border-zinc-600 rounded-lg p-8 text-center cursor-pointer hover:border-orange-400 transition-colors"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="w-12 h-12 bg-zinc-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-image-add-line text-2xl text-zinc-400"></i>
        </div>
        <p className="text-zinc-300 font-medium mb-2">Click to upload or drag and drop</p>
        <p className="text-zinc-500 text-sm">Include clear photos of the item from multiple angles.</p>
        <p className="text-zinc-500 text-sm mt-2">3-6 images recommended</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      {images.length > 0 && (
        <div className="mt-6">
          <div className="grid grid-cols-3 gap-4">
            {images.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <i className="ri-close-line text-white text-sm"></i>
                </button>
              </div>
            ))}
            
            {Array.from({ length: Math.max(0, 6 - images.length) }).map((_, index) => (
              <div key={`placeholder-${index}`} className="h-24 border-2 border-dashed border-zinc-600 rounded-lg flex items-center justify-center">
                <i className="ri-image-line text-2xl text-zinc-600"></i>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
