import { 
  TrendingUp, 
  Package, 
  DollarSign, 
  Users,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { getDashboardStats, getCompanyInfo } from '~/server/actions/dashboard';
import { formatCurrency, formatDate } from '~/lib/utils';

// Server Component - fetches real data
export default async function DashboardPage() {
  // TODO: Get companyId from session/auth
  const companyId = 'TEMPORARY'; // Replace with real company ID from session
  
  const [dashboardData, companyInfo] = await Promise.all([
    getDashboardStats(companyId),
    getCompanyInfo(companyId)
  ]);

  const { stats, recentOrders, topProducts } = dashboardData;

  // Format stats with real data
  const statCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      change: '+0%', // Would calculate from previous period
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-50 text-green-700',
      border: 'border-green-200'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      change: '+0%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'bg-blue-50 text-blue-700',
      border: 'border-blue-200'
    },
    {
      title: 'Active Products',
      value: stats.totalProducts.toString(),
      change: '+0%',
      trend: 'up',
      icon: Package,
      color: 'bg-purple-50 text-purple-700',
      border: 'border-purple-200'
    },
    {
      title: 'Customers',
      value: stats.totalCustomers.toString(),
      change: '+0%',
      trend: 'up',
      icon: Users,
      color: 'bg-amber-50 text-amber-700',
      border: 'border-amber-200'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header with Company Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            {companyInfo?.name || 'Your Company'} · {companyInfo?.plan || 'BASIC'} Plan
          </p>
        </div>
        
        {!companyInfo?.isActive && (
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-medium text-amber-800">
              Complete setup to activate your store
            </span>
          </div>
        )}
      </div>

      {/* Stats Grid - Mobile Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statCards.map((stat) => (
          <div key={stat.title} className={`bg-white rounded-xl border ${stat.border} p-4 md:p-6`}>
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                <p className="text-xl md:text-2xl font-bold mt-2 truncate">{stat.value}</p>
                <div className="flex items-center mt-1 md:mt-2">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-1 flex-shrink-0" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 md:w-4 md:h-4 text-red-500 mr-1 flex-shrink-0" />
                  )}
                  <span className={`text-xs md:text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'} truncate`}>
                    {stat.change}
                  </span>
                  <span className="text-xs md:text-sm text-gray-500 ml-2 truncate hidden sm:inline">
                    from last month
                  </span>
                </div>
              </div>
              <div className={`p-2 md:p-3 rounded-lg ${stat.color} ml-3 flex-shrink-0`}>
                <stat.icon className="w-4 h-4 md:w-6 md:h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Tables Grid - Mobile Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Recent Orders - Mobile Optimized Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <Link href="/dashboard/orders" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                View all
              </Link>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Mobile View - Cards */}
              <div className="sm:hidden divide-y divide-gray-200">
                {recentOrders.length > 0 ? recentOrders.map((order) => (
                  <div key={order.id} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Link href={`/dashboard/orders/${order.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                          {order.orderNumber}
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(order.createdAt)}</p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                        order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">{order.customerName}</p>
                      <p className="text-gray-600 truncate">{order.customerEmail}</p>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(order.total)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(order.createdAt, 'time')}
                      </span>
                    </div>
                  </div>
                )) : (
                  <div className="p-8 text-center">
                    <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No orders yet</p>
                    <p className="text-sm text-gray-400 mt-1">Orders will appear here</p>
                  </div>
                )}
              </div>

              {/* Desktop View - Table */}
              <table className="hidden sm:table w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 md:px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Order</th>
                    <th className="text-left py-3 px-4 md:px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                    <th className="text-left py-3 px-4 md:px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                    <th className="text-left py-3 px-4 md:px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentOrders.length > 0 ? recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 md:px-6">
                        <Link href={`/dashboard/orders/${order.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                          {order.orderNumber}
                        </Link>
                        <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                      </td>
                      <td className="py-3 px-4 md:px-6">
                        <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                        <p className="text-xs text-gray-500 truncate max-w-[180px]">{order.customerEmail}</p>
                      </td>
                      <td className="py-3 px-4 md:px-6">
                        <p className="text-sm font-medium text-gray-900">{formatCurrency(order.total)}</p>
                      </td>
                      <td className="py-3 px-4 md:px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                          order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="py-12 text-center">
                        <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No orders yet</p>
                        <p className="text-sm text-gray-400 mt-1">Orders will appear here</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Products - Mobile Optimized */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
              <Link href="/dashboard/products" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                View all
              </Link>
            </div>
          </div>
          
          <div className="p-4 md:p-6">
            {topProducts.length > 0 ? (
              <div className="space-y-3 md:space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-gray-700">{index + 1}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                        <p className="text-xs text-gray-500 truncate">{product.sales} units sold</p>
                      </div>
                    </div>
                    <div className="text-right ml-4 flex-shrink-0">
                      <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                        {formatCurrency(product.revenue)}
                      </p>
                      <p className="text-xs text-gray-500 whitespace-nowrap">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No products yet</p>
                <p className="text-sm text-gray-400 mt-1">Add products to see analytics</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions - Mobile Responsive Grid */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 md:mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <Link
            href="/dashboard/products/new"
            className="p-3 md:p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2 md:mb-3 group-hover:bg-blue-200">
              <Package className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            </div>
            <h3 className="text-sm md:text-base font-medium text-gray-900">Add Product</h3>
            <p className="text-xs md:text-sm text-gray-500 mt-1 hidden md:block">Create new product listing</p>
          </Link>

          <Link
            href="/dashboard/orders"
            className="p-3 md:p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors group"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center mb-2 md:mb-3 group-hover:bg-green-200">
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            </div>
            <h3 className="text-sm md:text-base font-medium text-gray-900">View Orders</h3>
            <p className="text-xs md:text-sm text-gray-500 mt-1 hidden md:block">Manage incoming orders</p>
          </Link>

          <Link
            href="/dashboard/analytics"
            className="p-3 md:p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors group"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2 md:mb-3 group-hover:bg-purple-200">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
            </div>
            <h3 className="text-sm md:text-base font-medium text-gray-900">Analytics</h3>
            <p className="text-xs md:text-sm text-gray-500 mt-1 hidden md:block">Sales & performance data</p>
          </Link>

          <Link
            href="/dashboard/settings"
            className="p-3 md:p-4 border border-gray-200 rounded-lg hover:border-amber-300 hover:bg-amber-50 transition-colors group"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-2 md:mb-3 group-hover:bg-amber-200">
              <Settings className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
            </div>
            <h3 className="text-sm md:text-base font-medium text-gray-900">Settings</h3>
            <p className="text-xs md:text-sm text-gray-500 mt-1 hidden md:block">Company configuration</p>
          </Link>
        </div>
      </div>
    </div>
  );
}