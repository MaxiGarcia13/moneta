<script setup lang="ts">
import MoonIcon from '@/components/icons/moon.vue';
import SunIcon from '@/components/icons/sun.vue';
import Button from '@/components/ui/button.vue';
import { useTheme } from '@/composables/use-theme';

const { isDark, toggleTheme } = useTheme();

function onToggle(event: MouseEvent) {
  toggleTheme(event);
}
</script>

<template>
  <Button
    variant="ghost"
    size="sm"
    class="w-full"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="onToggle"
  >
    <SunIcon
      v-if="isDark"
      class="size-4"
    />
    <MoonIcon
      v-else
      class="size-4"
    />
    {{ isDark ? 'Light mode' : 'Dark mode' }}
  </Button>
</template>
