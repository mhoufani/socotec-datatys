import { Try } from '@/utils/entity';
import { isBrowser } from '@/utils/checker';

export interface ILocalStorage {
  isAvailable: () => boolean,
  set: (key: string, value: unknown) => ILocalStorage,
  remove: (key: string) => ILocalStorage,
  clear: () => ILocalStorage,
  get: (key: string) => unknown,
  all: () => unknown
}

export const LocalStorage: ILocalStorage = {
  isAvailable: () => isBrowser() && hasStorageAvailable(Storage.localStorage),
  set(key, value) {
    return Try(() => {
      window.localStorage.setItem(key, JSON.stringify(value))
      return this
    }).fork( x => x,
      (e) => {
      console.error('LocalStorage.setItem.error', e)
      return this
    }) as ILocalStorage
  },
  get(key) {
    return Try(() => JSON.parse(window.localStorage.getItem(key) || ''))
      .fork(
        x => x,
        (e) => {
          console.error('LocalStorage.getItem.error', e);
        });
  },
  remove(key) {
    return Try(() => {
      window.localStorage.removeItem(key);
      return this;
    }).fork(x => x,
      (e) => {
        console.error('LocalStorage.removeItem', e);
        return this;
      }) as ILocalStorage;
  },
  clear: () => Try(() => {
    window.localStorage.clear()
    return this
  }).fork(x => x,
    (e) => {
    console.error('LocalStorage.clear', e)
    return this
  }) as ILocalStorage,
  all: () => {
    return Try(() => JSON.parse(window.localStorage.all()))
      .fork(x => x,
        (e) => {
        console.error('LocalStorage.all', e)
        return {}
      })
  },
}

export enum Storage {
  "localStorage"
}

export interface IGenericStorage {
  setItem(key: string, value: unknown): void;
  removeItem(key: string): void;
  length: number;
}

// doc: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
export function hasStorageAvailable(type: Storage) {
  const storage = window?.[type] as unknown as IGenericStorage;
  return Try(() => {
    const x = '__storage_test__'
    storage.setItem(x, x);
    storage.removeItem(x);
    return true
  }).fork(
    (e) =>
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      !!storage &&
      storage.length !== 0
  ) as boolean
}
