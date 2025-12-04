'use client';  // Client components CANNOT be async

import { 
  Package, 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';  // Add useEffect
import { formatCurrency } from '~/lib/utils';

// REMOVE "async" - Client components cannot be async
export default function ProductsPage({
  searchParams
}: {
  searchParams?: { page?: string; search?: string; category?: string }
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  
  const page = parseInt(searchParams?.page || '1');
  const search = searchParams?.search || '';
  const category = searchParams?.category || '';
  
  // Fetch data on mount and when params change
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        // Build query string
        const params = new URLSearchParams();
        if (page > 1) params.set('page', page.toString());
        if (search) params.set('search', search);
        if (category) params.set('category', category);
        
        const queryString = params.toString() ? `?${params.toString()}` : '';
        
        const response = await fetch(`/api/products${queryString}`);
        const data = await response.json();
        
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
        setTotalProducts(data.totalProducts || 0);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, [page, search, category]);
  
  const categories = [
    'Electronics', 'Tools', 'Safety Equipment', 'Office Supplies', 
    'Industrial', 'Construction', 'Packaging', 'Raw Materials'
  ];

  // Loading state
  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-64 bg-gray-200 rounded mt-8"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">
            Manage your product catalog · {totalProducts} total products
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Form */}
          <form method="GET" action="/dashboard/products" className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              name="search"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              defaultValue={search}
            />
          </form>
          
          <Link
            href="/dashboard/products/new"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Rest of your component remains the same */}
      {/* ... */}
    </div>
  );
}

// ProductActions component (already a client component)
function ProductActions({ product }: { product: any }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setMenuOpen(!menuOpen)}
        className="p-1.5 hover:bg-gray-100 rounded-lg"
      >
        <MoreVertical className="w-4 h-4 text-gray-500" />
      </button>
      
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
          <Link
            href={`/dashboard/products/${product.id}/view`}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Link>
          <Link
            href={`/dashboard/products/${product.id}/edit`}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setMenuOpen(false)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Product
          </Link>
          <div className="border-t my-1"></div>
          <button 
            onClick={() => {
              if (confirm('Are you sure you want to delete this product?')) {
                // Handle delete
                console.log('Delete product:', product.id);
              }
              setMenuOpen(false);
            }}
            className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Product
          </button>
        </div>
      )}
    </div>
  );
}