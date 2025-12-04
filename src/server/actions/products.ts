'use server';

import { db } from '~/server/db';

export async function getProducts(
  companyId: string,
  page: number = 1,
  limit: number = 10,
  search: string = '',
  category: string = ''
) {
  const skip = (page - 1) * limit;
  
  const where = {
    companyId,
    ...(search && {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } }
      ]
    }),
    ...(category && { category })
  };

  const [products, totalProducts] = await Promise.all([
    db.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        basePrice: true,
        bulkPrice: true,
        bulkThreshold: true,
        sku: true,
        inStock: true,
        stockCount: true,
        images: true,
        category: true,
        createdAt: true,
        updatedAt: true
      }
    }),
    db.product.count({ where })
  ]);

  const totalPages = Math.ceil(totalProducts / limit);

  return {
    products,
    totalProducts,
    totalPages,
    currentPage: page
  };
}

export async function getProductById(productId: string, companyId: string) {
  return await db.product.findFirst({
    where: {
      id: productId,
      companyId
    },
    include: {
      company: {
        select: {
          name: true,
          slug: true
        }
      }
    }
  });
}

export async function createProduct(data: any, companyId: string) {
  return await db.product.create({
    data: {
      ...data,
      companyId
    }
  });
}

export async function updateProduct(productId: string, data: any, companyId: string) {
  return await db.product.update({
    where: {
      id: productId,
      companyId
    },
    data: {
      ...data,
      updatedAt: new Date()
    }
  });
}

export async function deleteProduct(productId: string, companyId: string) {
  return await db.product.delete({
    where: {
      id: productId,
      companyId
    }
  });
}