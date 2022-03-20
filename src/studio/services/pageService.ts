import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where
} from 'firebase/firestore';

import { getCurrentUserId } from '@/_shared/services';

const db = getFirestore();
const pagesRef = collection(db, 'pages');

export interface IPage {
  readonly id?: string;
  readonly name?: string;
  readonly owner?: string;
  readonly projectId?: string;
  readonly content?: string;
}

export interface IPageFilter {
  readonly projectId: string;
}

export const pageService = {
  getMany: async (filter: IPageFilter) => {
    const q = query(
      pagesRef,
      where('owner', '==', getCurrentUserId()),
      where('projectId', '==', filter.projectId)
    );

    const pageSnapshot = await getDocs<IPage>(q);
    return pageSnapshot.docs.map(o => (o.data()));
  },
  getOne: async (id: string) => {
    const pageRef = await doc(db, pagesRef.path, id);
    const pageSnapshot = await getDoc(pageRef);
    return pageSnapshot.data();
  },
  create: async (page: Partial<IPage>) => {
    const newPage = await addDoc<IPage>(pagesRef, { ...page, owner: getCurrentUserId() });
    const pageRef = await doc(newPage.firestore, newPage.path);
    await setDoc(pageRef, { id: pageRef.id }, { merge: true });
    const pageSnapshot = await getDoc<IPage>(pageRef);
    return pageSnapshot.data()!;
  },
  update: async (page: Partial<IPage>) => {
    const pageRef = await doc(db, pagesRef.path, page.id!);
    await setDoc(pageRef, page);
    const docRef = await doc(pageRef.firestore, pageRef.path);
    const snapshot = await getDoc(docRef);
    return snapshot.data()!;
  },
  updateContent: async (page: Partial<IPage>) => {
    const pageRef = await doc(db, pagesRef.path, page.id!);
    await setDoc(pageRef, { content: page.content }, { merge: true });
    const docRef = await doc(pageRef.firestore, pageRef.path);
    const snapshot = await getDoc(docRef);
    return snapshot.data()!;
  },
  delete: async (page: Partial<IPage>) => {
    const pageRef = await doc(db, pagesRef.path, page.id!);
    await setDoc(pageRef, { deleted: new Date(), status: 'DELETED' }, { merge: true });
    return page;
  }
};