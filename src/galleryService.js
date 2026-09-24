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

// 2. TAMBAH FOTO & DATA GALERI BARU (CREATE) - Ditambah tanggalKegiatan
export const addGalleryItem = async (title, description, file, tanggalKegiatan) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`
  const filePath = `public/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('gallery-images')
    .upload(filePath, file)

  if (uploadError) throw uploadError

  const { data: urlData } = supabase.storage
    .from('gallery-images')
    .getPublicUrl(filePath)

  const { data, error } = await supabase
    .from('gallery')
    .insert([
      {
        title: title,
        description: description,
        image_url: urlData.publicUrl,
        tanggal_kegiatan: tanggalKegiatan // <--- Mengirim tanggal ke database
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

// 4. PERBARUI FOTO & DATA GALERI (UPDATE) - Ditambah tanggalKegiatan
export const updateGalleryItem = async (id, title, description, file, currentImageUrl, tanggalKegiatan) => {
  let finalImageUrl = currentImageUrl; 

  if (file) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `public/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('gallery-images')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: urlData } = supabase.storage
      .from('gallery-images')
      .getPublicUrl(filePath)
    
    finalImageUrl = urlData.publicUrl;
  }

  const { data, error } = await supabase
    .from('gallery')
    .update({
      title: title,
      description: description,
      image_url: finalImageUrl,
      tanggal_kegiatan: tanggalKegiatan // <--- Mengirim perubahan tanggal
    })
    .eq('id', id)

  if (error) throw error
  return data
}