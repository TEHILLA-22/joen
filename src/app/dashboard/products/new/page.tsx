'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Package, 
  ArrowLeft,
  Upload,
  X,
  DollarSign,
  Tag,
  Hash,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [bulkPricing, setBulkPricing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    category: '',
    sku: '',
    basePrice: '',
    bulkPrice: '',
    bulkThreshold: '',
    stockCount: '0',
    inStock: true
  });

  const categories = [
    'Electronics', 'Tools', 'Safety Equipment', 'Office Supplies',
    'Industrial', 'Construction', 'Packaging', 'Raw Materials',
    'Electrical', 'Plumbing', 'Hardware', 'Fasteners'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Prepare data
    const productData = {
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: formData.description,
      category: formData.category,
      sku: formData.sku || `SKU-${Date.now()}`,
      basePrice: parseFloat(formData.basePrice),
      bulkPrice: bulkPricing ? parseFloat(formData.bulkPrice) : null,
      bulkThreshold: bulkPricing ? parseInt(formData.bulkThreshold) : null,
      stockCount: parseInt(formData.stockCount) || 0,
      inStock: formData.inStock,
      images: images
    };

    console.log('Submitting product:', productData); // Debug log

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData)
    });

    const result = await response.json();
    console.log('API Response:', result); // Debug log

    if (result.success) {
      alert('✅ Product created successfully!');
      router.push('/dashboard/products');
      router.refresh();
    } else {
      alert(`❌ Error: ${result.error}`);
    }
  } catch (error) {
    console.error('Submission error:', error);
    alert('⚠️ Error creating product. Check console for details.');
  } finally {
    setLoading(false);
  }
};

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Implement actual image upload to storage
    const files = e.target.files;
    if (!files) return;

    // Simulate upload - in production, upload to S3/Cloudinary/etc
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/dashboard/products"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Products
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-600 mt-1">Fill in the details below to add a new product to your catalog</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Product Details Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
              <p className="text-sm text-gray-600">Basic information about your product</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Industrial Grade Drill Bits"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SKU (Stock Keeping Unit)
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., DRILL-001"
                  value={formData.sku}
                  onChange={(e) => setFormData({...formData, sku: e.target.value})}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Leave blank to auto-generate</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your product in detail..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product URL Slug
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600 text-sm">
                  yourstore.com/products/
                </span>
                <input
                  type="text"
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="industrial-drill-bits"
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Pricing</h2>
              <p className="text-sm text-gray-600">Set your product pricing and bulk discounts</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Price *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                  value={formData.basePrice}
                  onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <input
                  type="checkbox"
                  checked={bulkPricing}
                  onChange={(e) => setBulkPricing(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Enable Bulk Pricing
              </label>
              
              {bulkPricing && (
                <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bulk Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                        value={formData.bulkPrice}
                        onChange={(e) => setFormData({...formData, bulkPrice: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Quantity for Bulk Price
                    </label>
                    <input
                      type="number"
                      min="2"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 10"
                      value={formData.bulkThreshold}
                      onChange={(e) => setFormData({...formData, bulkThreshold: e.target.value})}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Inventory & Images Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Inventory & Images</h2>
              <p className="text-sm text-gray-600">Manage stock levels and upload product images</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Inventory */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Inventory Management</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    Product is in stock
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                    value={formData.stockCount}
                    onChange={(e) => setFormData({...formData, stockCount: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Product Images</h3>
              
              <div className="space-y-4">
                {/* Image Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">Drag & drop images here, or click to browse</p>
                  <p className="text-xs text-gray-500 mb-4">Supports JPG, PNG up to 5MB each</p>
                  <label className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-gray-200">
                    Browse Files
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>

                {/* Image Previews */}
                {images.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Uploaded Images ({images.length})
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img}
                            alt={`Product ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
          <Link
            href="/dashboard/products"
            className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-center"
          >
            Cancel
          </Link>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              type="button"
              className="w-full sm:w-auto px-6 py-3 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 font-medium"
              onClick={() => {
                // Save as draft functionality
                console.log('Saved as draft');
              }}
            >
              Save as Draft
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}