import type { createStorage } from '@maxigarcia/js-utils';

export function readStoredJson<T>(
  storage: ReturnType<typeof createStorage<T>>,
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
