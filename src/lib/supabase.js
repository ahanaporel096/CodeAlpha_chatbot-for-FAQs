import { createClient } from '@supabase/supabase-js'

let rawUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Clean URL (strip /rest/v1, /rest/v1/, or trailing slashes)
rawUrl = rawUrl.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '')

export const isSupabaseConfigured =
  Boolean(rawUrl) &&
  rawUrl !== 'https://your-project-id.supabase.co' &&
  Boolean(supabaseAnonKey) &&
  supabaseAnonKey !== 'your-anon-key-here'

if (!isSupabaseConfigured) {
  console.warn(
    '[Supabase] Missing or default environment variables. App will run in fallback mode.'
  )
}

export const supabase = createClient(
  rawUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)
