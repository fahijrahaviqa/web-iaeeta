import { supabase } from './supabaseClient';

// 1. Ambil Semua Anggota
export const getTeamMembers = async () => {
  const { data, error } = await supabase
    .from('tim_kami')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw error;
  return data;
};

// 2. Upload Foto ke Supabase Storage
export const uploadTeamPhoto = async (file) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `team_${Date.now()}.${fileExt}`;
  
  const { error: uploadError } = await supabase.storage
    .from('gallery-images') // Pakai bucket yang sudah ada atau buat bucket khusus 'team-images'
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('gallery-images')
    .getPublicUrl(fileName);

  return data.publicUrl;
};

// 3. Tambah Anggota Baru
export const addTeamMember = async (memberData) => {
  const { data, error } = await supabase
    .from('tim_kami')
    .insert([memberData])
    .select();

  if (error) throw error;
  return data;
};

// 4. Update Data Anggota
export const updateTeamMember = async (id, memberData) => {
  const { data, error } = await supabase
    .from('tim_kami')
    .update(memberData)
    .eq('id', id)
    .select();

  if (error) throw error;
  return data;
};

// 5. Hapus Anggota
export const deleteTeamMember = async (id) => {
  const { error } = await supabase
    .from('tim_kami')
    .delete()
    .eq('id', id);

  if (error) throw error;
};