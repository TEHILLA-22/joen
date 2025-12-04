import { NextRequest, NextResponse } from 'next/server';
import { db } from '~/server/db';
import { Prisma } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || !body.basePrice) {
      return NextResponse.json(
        { success: false, error: 'Name and price are required' },
        { status: 400 }
      );
    }

    const companyId = 'TEMPORARY'; // Replace with session user companyId

    const product = await db.product.create({
      data: {
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: body.description || '',
        basePrice: body.basePrice,
        bulkPrice: body.bulkPrice ?? null,
        bulkThreshold: body.bulkThreshold ?? null,
        sku: body.sku || `SKU-${Date.now()}`,
        inStock: body.inStock !== false,
        stockCount: body.stockCount ?? 0,
        images: body.images || [],
        category: body.category || null,
        companyId,
      },
    });

    return NextResponse.json({
      success: true,
      product,
      message: 'Product created successfully',
    });
  } catch (error: any) {
    console.error('Product creation error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'Product with this SKU or slug already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const search = url.searchParams.get('search') || '';
    const category = url.searchParams.get('category') || '';

    const limit = 10;
    const skip = (page - 1) * limit;
    const companyId = 'TEMPORARY'; // Replace with session user companyId

    const where: Prisma.ProductWhereInput = {
      companyId,
      ...(category ? { category } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
              { sku: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
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
          updatedAt: true,
        },
      }),
      db.product.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    });
  } catch (error: any) {
    console.error('Product fetch error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
