export async function uploadToCloudinary(file, type) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'kloud9_unsigned'); // Replace with your preset
  // Optionally, add a folder or tags
  // formData.append('folder', 'profile-photos');

  const res = await fetch('https://api.cloudinary.com/v1_1/di3xxtvs2/image/upload', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Failed to upload image');
  }

  const data = await res.json();
  return data.secure_url; // This is the URL to store in your DB
}