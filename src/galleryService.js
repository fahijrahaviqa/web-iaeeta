import { supabase } from './supabaseClient'

// 1. AMBIL SEMUA DATA GALERI (READ)
export const getGalleryItems = async () => {
  const { data, error } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// 2. TAMBAH FOTO & DATA GALERI BARU (CREATE)
export const addGalleryItem = async (title, description, file) => {
  // A. Upload file gambar ke Supabase Storage (Bucket: gallery-images)
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`
  const filePath = `public/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('gallery-images')
    .upload(filePath, file)

  if (uploadError) throw uploadError

  // B. Ambil URL Publik Gambar yang berhasil di-upload
  const { data: urlData } = supabase.storage
    .from('gallery-images')
    .getPublicUrl(filePath)

  // C. Simpan judul, deskripsi, dan URL gambar ke tabel 'gallery'
  const { data, error } = await supabase
    .from('gallery')
    .insert([
      {
        title: title,
        description: description,
        image_url: urlData.publicUrl
      }
    ])

  if (error) throw error
  return data
}

// 3. HAPUS FOTO & DATA GALERI (DELETE)
export const deleteGalleryItem = async (id) => {
  const { data, error } = await supabase
    .from('gallery')
    .delete()
    .eq('id', id)

  if (error) throw error
  return data
}