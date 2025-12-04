'use server';

import { db } from '~/server/db';

// Get real dashboard stats for a company
export async function getDashboardStats(companyId: string) {
  // Real data from database
  const [totalRevenue, totalOrders, totalProducts, totalCustomers] = await Promise.all([
    // Total Revenue
    db.order.aggregate({
      where: { 
        companyId,
        status: { in: ['DELIVERED', 'SHIPPED'] }  
      },
      _sum: { total: true }
    }),
    
    // Total Orders
    db.order.count({
      where: { companyId }
    }),
    
    // Total Products
    db.product.count({
      where: { 
        companyId,
        inStock: true 
      }
    }),
    
    // Total Customers (unique buyers)
    db.order.groupBy({
      by: ['customerEmail'],
      where: { companyId },
      _count: true
    })
  ]);

  // Recent Orders (last 10)
  const recentOrders = await db.order.findMany({
    where: { companyId },
    orderBy: { createdAt: 'desc' },
    take: 10,
    select: {
      id: true,
      orderNumber: true,
      customerName: true,
      customerEmail: true,
      total: true,
      status: true,
      createdAt: true
    }
  });

  // Top Products by quantity sold
  const topProducts = await db.orderItem.groupBy({
    by: ['productId'],
    where: {
      order: { companyId }
    },
    _sum: { quantity: true },
    orderBy: { _sum: { quantity: 'desc' } },
    take: 5
  }).then(async (items) => {
    // Get product details
    const productIds = items.map(item => item.productId);
    const products = await db.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name: true, basePrice: true }
    });

    return items.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        name: product?.name || 'Unknown Product',
        sales: item._sum.quantity || 0,
        revenue: (product?.basePrice || 0).times(item._sum.quantity || 0)
      };
    });
  });

  return {
    stats: {
      totalRevenue: totalRevenue._sum.total || 0,
      totalOrders: totalOrders,
      totalProducts: totalProducts,
      totalCustomers: totalCustomers.length
    },
    recentOrders,
    topProducts
  };
}

// Get company info
export async function getCompanyInfo(companyId: string) {
  return await db.company.findUnique({
    where: { id: companyId },
    select: {
      id: true,
      name: true,
      slug: true,
      plan: true,
      isActive: true
    }
  });
}