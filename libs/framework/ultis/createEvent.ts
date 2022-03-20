import EventEmitter from 'eventemitter3';

export const createEvent = <TValue>(key: string) => {
  const eventEmitter = new EventEmitter();
  return {
    emit: (value?: TValue) => {
      eventEmitter.emit(key, value);
    },
    listen: (callback: (value?: TValue) => void) => {
      eventEmitter.addListener(key, callback);
    },
    unlisten: (callback: (value?: TValue) => void) => {
      eventEmitter.removeListener(key, callback);
    }
  };
};
