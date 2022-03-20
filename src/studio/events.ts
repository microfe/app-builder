import { createEvent } from 'libs/framework';

import { IKeyboardEventPayload } from '@/_shared';

import { IFileData, IPage, IProject } from './services';

export const onProjectLoad = createEvent<IProject>('ON_PROJECT_LOAD');
export const onProjectInfoUpdate = createEvent<IProject>('ON_PROJECT_INFO_UPDATE');
export const onProjectDelete = createEvent<IProject>('ON_PROJECT_DELETE');

export const onPageSave = createEvent<IPage>('ON_PAGE_SAVE');
export const onRequestSavePage = createEvent<undefined>('ON_REQUEST_SAVE_PAGE');

export const onFrameKeyDown = createEvent<IKeyboardEventPayload>('ON_FRAME_KEY_DOW');

export const onOpentSettingWindow = createEvent('ON_OPEN_SETTING_WINDOW');

export interface IOpenMediaPayload {
  readonly selectModel?: 'single' | 'multiple';
  readonly onSelect?: (files: IFileData[]) => void;
}

export const onOpenMediaWindow = createEvent<IOpenMediaPayload>('ON_OPEN_MEDIA_WINDOW');