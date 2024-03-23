import {Storage} from 'aws-amplify';

export async function pathToImageFile(
  imageFile: string,
  key: string,
  contentType?: string,
) {
  try {
    const response = await fetch(imageFile);
    const blob = await response.blob();
    return await Storage.put(key, blob, {
      contentType: contentType || 'image/jpeg',
    });
  } catch (err) {
    console.log('Error uploading file:', err);
  }
}
