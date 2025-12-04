'use client';

import { useState } from 'react';

export default function RegisterCompanyPage() {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    email: '',
    website: '',
    plan: 'BASIC'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/companies/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        alert('✅ Company created successfully!');
        window.location.href = '/companies';
      } else {
        alert(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      alert('⚠️ Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6 text-center">Register Your Company</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <input
              type="text"
              required
              className="w-full p-3 border rounded-lg"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Store URL Slug</label>
            <div className="flex items-center">
              <span className="p-3 bg-gray-100 border rounded-l-lg">joenize.com/</span>
              <input
                type="text"
                required
                className="flex-1 p-3 border rounded-r-lg"
                placeholder="your-company"
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Admin Email</label>
            <input
              type="email"
              required
              className="w-full p-3 border rounded-lg"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Website (Optional)</label>
            <input
              type="url"
              className="w-full p-3 border rounded-lg"
              value={formData.website}
              onChange={(e) => setFormData({...formData, website: e.target.value})}
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Choose Plan</label>
            <select
              className="w-full p-3 border rounded-lg"
              value={formData.plan}
              onChange={(e) => setFormData({...formData, plan: e.target.value})}
            >
              <option value="FREE">Free - $0/month (Limited)</option>
              <option value="BASIC">Basic - $99/month</option>
              <option value="PRO">Pro - $299/month</option>
              <option value="ENTERPRISE">Enterprise - Contact Us</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Register Company
          </button>
        </form>

        <div className="mt-8 pt-6 border-t">
          <h3 className="font-semibold mb-2">What's included:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✓ Your own branded storefront at joenize.com/your-slug</li>
            <li>✓ Unlimited products (Basic+ plans)</li>
            <li>✓ Bulk pricing engine</li>
            <li>✓ Order management dashboard</li>
            <li>✓ Payment processing integration</li>
            <li>✓ 24/7 customer support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}