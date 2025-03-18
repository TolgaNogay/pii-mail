import { supabase } from './supabase'
import type { User } from './supabase'

export async function signUp(email: string, password: string, fullName: string, username: string) {
  // Önce kullanıcı adının kullanılabilir olduğunu kontrol et
  const { data: existingUser, error: checkError } = await supabase
    .from('users')
    .select('username')
    .eq('username', username)
    .single()

  if (checkError && checkError.code !== 'PGRST116') {
    throw new Error('Kullanıcı adı kontrolü sırasında bir hata oluştu')
  }

  if (existingUser) {
    throw new Error('Bu kullanıcı adı zaten kullanılıyor')
  }

  // Kullanıcıyı oluştur
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        username: username,
      },
    },
  })

  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error || !session) return null

  const { data, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single()

  if (userError || !data) return null
  return data as User
}

export async function updateProfile(userId: string, updates: Partial<User>) {
  const { error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)

  if (error) throw error
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

  if (error) throw error
}

export async function updateUsername(userId: string, newUsername: string) {
  const { data, error } = await supabase
    .rpc('update_username', {
      user_id: userId,
      new_username: newUsername
    })

  if (error) throw error
  return data as string // Yeni pii_email döner
} 