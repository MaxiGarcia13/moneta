import { createAppStorage } from '@/utils/create-app-storage';

export type Theme = 'light' | 'dark';

export const DEFAULT_THEME: Theme = 'dark';

const THEME_COLORS: Record<Theme, string> = {
  light: '#ebe7df',
  dark: '#0c0e12',
};

const themeStorage = createAppStorage<Theme>('theme');

export function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark';
}

export function readStoredTheme(): Theme {
  try {
    const stored = themeStorage.getItem();

    if (isTheme(stored)) {
      return stored;
    }
  } catch {
    // ignore storage errors
  }

  return DEFAULT_THEME;
}

export function writeStoredTheme(theme: Theme): void {
  themeStorage.setItem(theme);
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;

  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;

  const colorSchemeMeta = document.querySelector('meta[name="color-scheme"]');
  if (colorSchemeMeta) {
    colorSchemeMeta.setAttribute('content', theme);
  }

  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', THEME_COLORS[theme]);
  }
}

export function getOppositeTheme(theme: Theme): Theme {
  return theme === 'dark' ? 'light' : 'dark';
}
