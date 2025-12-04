import { db } from '~/server/db'
import Link from 'next/link'

export default async function CompaniesPage() {
  const companies = await db.company.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
  })

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Company Directory</h1>
        <Link
          href="/register-company"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Register Your Company
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <Link
            key={company.id}
            href={`/${company.slug}`}
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{company.name}</h2>
            <p className="text-gray-600 mb-4">{company.description}</p>
            <div className="flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-sm ${
                company.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {company.isActive ? 'Active' : 'Pending'}
              </span>
              <span className="text-sm text-gray-500">{company.plan} Plan</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}