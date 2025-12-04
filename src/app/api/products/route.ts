import { NextRequest, NextResponse } from 'next/server';
import { db } from '~/server/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Product creation request:', body); // Debug log
    
    // Validate required fields
    if (!body.name || !body.basePrice) {
      return NextResponse.json(
        { success: false, error: 'Name and price are required' },
        { status: 400 }
      );
    }

    // TODO: Get companyId from session/auth
    const companyId = 'TEMPORARY'; // Replace with actual company ID
    
    // Create product in database
    const product = await db.product.create({
      data: {
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: body.description || '',
        basePrice: body.basePrice,
        bulkPrice: body.bulkPrice || null,
        bulkThreshold: body.bulkThreshold || null,
        sku: body.sku || `SKU-${Date.now()}`,
        inStock: body.inStock !== false,
        stockCount: body.stockCount || 0,
        images: body.images || [],
        category: body.category || null,
        companyId: companyId,
      }
    });

    console.log('Product created successfully:', product);

    return NextResponse.json({
      success: true,
      product,
      message: 'Product created successfully'
    });
    
  } catch (error: any) {
    console.error('Product creation error:', error);
    
    // Handle Prisma errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'Product with this SKU or slug already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to create product',
        details: error 
      },
      { status: 500 }
    );
  }
}

// Also add GET for product listing
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    
    const limit = 10;
    const skip = (page - 1) * limit;
    
    // TODO: Get companyId from session
    const companyId = 'TEMPORARY';
    
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
    
    return NextResponse.json({
      success: true,
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page
    });
    
  } catch (error: any) {
    console.error('Product fetch error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}