import { deleteObject, getStorage, ref, uploadBytes } from 'firebase/storage';

const storage = getStorage();

export const storageService = {
  upload: async (fileName: string, file: File) => {
    const uploadedFile = await uploadBytes(ref(storage, fileName), file);
    return {
      ...uploadedFile,
      url: `https://storage.cloud.google.com/${uploadedFile.ref.bucket}/${fileName}`
    };
  },
  delete: async (fileName: string) => {
    const file = ref(storage, fileName);
    await deleteObject(file);
  }
};