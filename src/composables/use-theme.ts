import type { ThemeRevealOrigin } from '@maxigarcia/view-transitions';
import type { Theme } from '@/utils/theme';
import {
  onCircularRevealAnimation,

} from '@maxigarcia/view-transitions';
import { computed, ref } from 'vue';
import {
  applyTheme,
  getOppositeTheme,
  readStoredTheme,

  writeStoredTheme,
} from '@/utils/theme';

const theme = ref<Theme>(readStoredTheme());

applyTheme(theme.value);

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark');

  function setTheme(nextTheme: Theme, origin?: ThemeRevealOrigin) {
    const apply = () => {
      theme.value = nextTheme;
      writeStoredTheme(nextTheme);
      applyTheme(nextTheme);
    };

    if (origin) {
      onCircularRevealAnimation(apply, origin);
      return;
    }

    apply();
  }

  function toggleTheme(origin?: ThemeRevealOrigin) {
    setTheme(getOppositeTheme(theme.value), origin);
  }

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  };
}
