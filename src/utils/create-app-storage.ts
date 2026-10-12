import { createStorage } from '@maxigarcia/js-utils';

const APP_STORAGE_PREFIX = 'app-storage';

export function createAppStorage<T>(name: string) {
  return createStorage<T>(`${APP_STORAGE_PREFIX}-${name}`);
}
