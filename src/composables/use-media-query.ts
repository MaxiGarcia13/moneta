import { onScopeDispose, ref } from 'vue';

export function useMediaQuery(query: string) {
  const matches = ref(false);

  if (typeof window === 'undefined') {
    return matches;
  }

  const mediaQueryList = window.matchMedia(query);
  matches.value = mediaQueryList.matches;

  function onChange(event: MediaQueryListEvent) {
    matches.value = event.matches;
  }

  mediaQueryList.addEventListener('change', onChange);
  onScopeDispose(() => {
    mediaQueryList.removeEventListener('change', onChange);
  });

  return matches;
}
