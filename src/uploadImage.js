export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file); // Yüklenen dosya
  formData.append('upload_preset', 'game-chars-preset'); // Unsigned preset

  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dx4i9tkoj/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    console.log('Uploaded Image URL:', data.secure_url);
    return data.secure_url; // Fotoğraf URL'si
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
