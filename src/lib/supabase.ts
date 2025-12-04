import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper function for server components
export const getCompanies = async () => {
  return await supabase.from('companies').select('*').order('created_at', { ascending: false })
}

export const getProducts = async (companySlug?: string) => {
  if (companySlug) {
    const { data: company } = await supabase
      .from('companies')
      .select('id')
      .eq('slug', companySlug)
      .single()
    
    if (company) {
      return await supabase
        .from('products')
        .select('*')
        .eq('company_id', company.id)
        .order('created_at', { ascending: false })
    }
  }
  return await supabase.from('products').select('*').order('created_at', { ascending: false })
}