import type { createAppStorage } from '@/utils/create-app-storage';

export function readStoredJson<T>(
  storage: ReturnType<typeof createAppStorage<T>>,
  createDefault: () => T,
  isValid: (value: T) => boolean = () => true,
): T {
  try {
    const stored = storage.getJson();

    if (!stored || !isValid(stored)) {
      return createDefault();
    }

    return stored;
  } catch {
    return createDefault();
  }
}
