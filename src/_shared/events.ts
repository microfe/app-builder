import { createEvent } from 'libs/framework';

export interface IKeyboardEventPayload {
  readonly ctrlKey?: boolean;
  readonly altKey?: boolean;
  readonly key: string;
}

export const onKeyDown = createEvent<IKeyboardEventPayload>('ON_KEY_DOWN');