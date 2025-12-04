'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
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
  ChevronRight,
} from 'lucide-react';
import { formatCurrency } from '~/lib/utils';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  // add other fields from your API
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if (page > 1) params.set('page', page.toString());
        if (search) params.set('search', search);
        if (category) params.set('category', category);

        const queryString = params.toString() ? `?${params.toString()}` : '';

        const res = await fetch(`/api/products${queryString}`);
        const data = await res.json();

        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
        setTotalProducts(data.totalProducts || 0);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [page, search, category]);

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
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">
            Manage your product catalog · {totalProducts} total products
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4"
          >
            <h3 className="font-semibold text-white">{product.name}</h3>
            <p className="text-gray-400">{formatCurrency(product.price)}</p>
            <p className="text-gray-500 text-sm">{product.category}</p>
            <ProductActions product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductActions({ product }: { product: Product }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative mt-2">
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
                console.log('Delete product', product.id);
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
