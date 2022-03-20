import { createContext } from 'react';

import { IFileData } from '@/studio/services/fileService';

export interface IMediaContext {
  readonly uploadingFiles?: File[];
  readonly allFiles?: IFileData[];
  readonly selectedFiles?: IFileData[];
  readonly editingFile?: IFileData;
  readonly selectMode?: 'single' | 'multiple'
  readonly setContext?: (nextValue: Partial<IMediaContext>) => void;
}

export const MediaContext = createContext<IMediaContext>({
  selectedFiles: []
});