import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rbniyrtifnxruicmnzqg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJibml5cnRpZm54cnVpY21uenFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzMzE3MDMsImV4cCI6MjA0NjkwNzcwM30.a7djMlWXTB8QLJwV5Y62RibRgCg84EQ3PhypZ8s-Sbg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)