import { NextResponse } from 'next/server'
import { db } from '~/server/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, slug, email, plan } = body

    // Create company
    const company = await db.company.create({
      data: {
        name,
        slug: slug.toLowerCase().replace(/\s+/g, '-'),
        plan,
        isActive: false,
      }
    })

    // Create admin user (link to existing NextAuth user or create new)
    await db.user.create({
      data: {
        email,
        name: `${name} Admin`,
        role: 'COMPANY_ADMIN',
        companyId: company.id,
      }
    })

    return NextResponse.json({ 
      success: true, 
      company,
      message: 'Company registered successfully. Please complete payment to activate.' 
    })

  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}