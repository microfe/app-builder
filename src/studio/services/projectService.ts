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
const projectsRef = collection(db, 'projects');

export interface IProject {
  readonly id?: string;
  readonly name?: string;
  readonly lastOpened?: string;
  readonly owner?: string;
  readonly status?: string;
  readonly created?: string;
}

export const projectService = {
  getMany: async () => {
    const q = query(
      projectsRef,
      where('owner', '==', getCurrentUserId()),
      where('status', '==', 'ENABLE')
    );
    const projectSnapshot = await getDocs<IProject>(q);
    return projectSnapshot.docs.map(o => (o.data()));
  },
  getOne: async (id: string) => {
    const projectRef = await doc(db, projectsRef.path, id);
    const projectSnapshot = await getDoc(projectRef);
    return projectSnapshot.data();
  },
  create: async (project: Partial<IProject>) => {
    const newProject = await addDoc<IProject>(
      projectsRef,
      {
        ...project,
        owner: getCurrentUserId(),
        status: 'ENABLE',
        created: (new Date()).toISOString()
      });
    const projectRef = await doc(newProject.firestore, newProject.path);
    await setDoc(projectRef, { id: projectRef.id }, { merge: true });
    const projectSnapshot = await getDoc<IProject>(projectRef);
    return projectSnapshot.data()!;
  },
  update: async (project: Partial<IProject>) => {
    const projectRef = await doc(db, projectsRef.path, project.id!);
    await setDoc(projectRef, project);
    const docRef = await doc(projectRef.firestore, projectRef.path);
    const snapshot = await getDoc(docRef);
    return snapshot.data()!;
  },
  delete: async (project: Partial<IProject>) => {
    const projectRef = await doc(db, projectsRef.path, project.id!);
    await setDoc(projectRef, { deleted: (new Date()).toISOString(), status: 'DELETED' }, { merge: true });
    return project;
  }
};