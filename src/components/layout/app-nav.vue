<script setup lang="ts">
import { capitalize, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const navItems = computed(() =>
  router.options.routes.flatMap((route) => {
    return !route.meta?.isNavigable
      ? []
      : [{
          label: capitalize(route.name as string),
          to: route.path,
        }];
  }),
);
</script>

<template>
  <nav
    class="flex items-center gap-2"
    aria-label="Main"
  >
    <RouterLink
      v-for="item in navItems"
      :key="item.to"
      :to="item.to"
      class="rounded-xl px-4 py-2 text-sm text-muted"
      active-class="font-bold text-foreground!"
    >
      {{ item.label }}
    </RouterLink>
  </nav>
</template>
