<script setup lang="ts">
import type { Component } from 'vue';
import { capitalize, computed } from 'vue';
import { useRouter } from 'vue-router';
import ChartPieFilledIcon from '@/components/icons/chart-pie-filled.vue';
import ChartPieIcon from '@/components/icons/chart-pie.vue';
import ReceiptEuroFilledIcon from '@/components/icons/receipt-euro-filled.vue';
import ReceiptEuroIcon from '@/components/icons/receipt-euro.vue';

const NAV_ICONS: Record<string, { outline: Component; filled: Component }> = {
  home: {
    outline: ChartPieIcon,
    filled: ChartPieFilledIcon,
  },
  transactions: {
    outline: ReceiptEuroIcon,
    filled: ReceiptEuroFilledIcon,
  },
};

const router = useRouter();

const navItems = computed(() =>
  router.options.routes.flatMap((route) => {
    const routeName = String(route.name ?? '');
    const icons = NAV_ICONS[routeName];

    return !route.meta?.isNavigable || !icons
      ? []
      : [{
          label: capitalize(routeName),
          to: route.path,
          outlineIcon: icons.outline,
          filledIcon: icons.filled,
        }];
  }),
);
</script>

<template>
  <Teleport to="body">
    <nav
      class="app-nav"
      aria-label="Main"
    >
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        v-slot="{ isActive }"
        :to="item.to"
        class="app-nav__link"
        active-class="app-nav__link--active"
      >
        <component
          :is="isActive ? item.filledIcon : item.outlineIcon"
          class="size-5"
          aria-hidden="true"
        />
        <span class="app-nav__label">
          {{ item.label }}
        </span>
      </RouterLink>
    </nav>
  </Teleport>
</template>

<style scoped>
.app-nav {
  position: fixed;
  left: 50%;
  bottom: max(1rem, env(safe-area-inset-bottom, 0px));
  z-index: 50;
  display: flex;
  width: max-content;
  max-width: calc(100vw - 2rem);
  translate: -50% 0;
  align-items: stretch;
  gap: 0.25rem;
  border-radius: 9999px;
  border: 1px solid color-mix(in oklab, var(--color-foreground) 10%, transparent);
  background: color-mix(in oklab, var(--color-surface) 60%, transparent);
  padding: 0.375rem;
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(1.5rem);
}

.app-nav__link {
  display: flex;
  min-width: 4.5rem;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
  border-radius: 9999px;
  padding: 0.375rem 1rem;
  color: var(--color-muted);
  transition: color 150ms ease;
}

.app-nav__link--active {
  color: var(--color-accent);
}

.app-nav__label {
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem;
}

@media (width >= 48rem) {
  .app-nav {
    top: 0.75rem;
    bottom: auto;
  }
}
</style>
