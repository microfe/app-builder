import { collection, getFirestore } from 'firebase/firestore';

import { getCurrentUserId } from '@/_shared/services';
import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where
} from '@firebase/firestore';

import { storageService } from './storageService';

const db = getFirestore();
const filesRef = collection(db, 'files');

export interface IFileData {
  readonly id?: string;
  readonly fileName?: string;
  readonly fileExt?: string;
  readonly alt?: string;
  readonly filePath?: string;
  readonly url?: string;
  readonly type?: string;
  readonly owner?: string;
  readonly projectId?: string;
  readonly created?: string;
  readonly height?: number;
  readonly width?: number;
  readonly storage?: boolean;
}

export interface IFileFilter {
  readonly projectId: string;
}

export const fileService = {
  getMany: async (filter: IFileFilter) => {
    const q = query(
      filesRef,
      where('owner', '==', getCurrentUserId()),
      where('projectId', '==', filter.projectId)
    );

    const fileSnapshot = await getDocs<IFileData>(q);
    return fileSnapshot.docs.map(o => (o.data()));
  },
  getOne: async (id: string) => {
    const fileRef = await doc(db, filesRef.path, id);
    const fileSnapshot = await getDoc(fileRef);
    return fileSnapshot.data();
  },
  createByUpload: async (fileData: Partial<IFileData>, file: File) => {
    const fileDimensions = await getUploadImageDimensions(file);
    const uploadedFile = await storageService.upload(fileData.fileName!, file);

    const newFile = await addDoc<IFileData>(
      filesRef,
      {
        ...fileData,
        ...fileDimensions,
        filePath: uploadedFile.metadata.fullPath,
        url: uploadedFile.url,
        owner: getCurrentUserId(),
        created: (new Date()).toISOString(),
        storage: true
      }
    );

    const fileRef = await doc(newFile.firestore, newFile.path);
    await setDoc(fileRef, { id: fileRef.id }, { merge: true });
    const fileSnapshot = await getDoc<IFileData>(fileRef);
    return fileSnapshot.data()!;
  },
  update: async (file: Partial<IFileData>) => {
    const fileRef = await doc(db, filesRef.path, file.id!);
    await setDoc(fileRef, file);
    const docRef = await doc(fileRef.firestore, fileRef.path);
    const snapshot = await getDoc(docRef);
    return snapshot.data()!;
  },
  deleteMany: async (files: Partial<IFileData>[]) => {
    for (const file of files) {
      try {
        await storageService.delete(file.fileName!);
      } catch (error) {
        // nothing todo here
      }
      const fileRef = await doc(db, filesRef.path, file.id!);
      await deleteDoc(fileRef);
    }
  }
};

const getUploadImageDimensions = (file: File) => {
  return new Promise<IFileData>((resolve) => {
    const isImage = file.type.startsWith('image');
    if (!isImage) {
      return void resolve({});
    }

    const fr = new FileReader();

    fr.onload = function () {
      const img = new Image;

      img.onload = function () {
        resolve({
          height: img.height,
          width: img.width
        } as IFileData);
      };

      img.src = fr.result as string;
    };

    fr.readAsDataURL(file);
  });
};