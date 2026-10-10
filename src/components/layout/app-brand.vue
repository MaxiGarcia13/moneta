<script setup lang="ts">
import BrandIcon from '@/components/icons/brand.vue';

const props = withDefaults(defineProps<{
  size?: 'md' | 'lg';
}>(), {
  size: 'md',
});

const sizeClasses = {
  md: {
    icon: 'size-6',
    text: 'text-xl',
  },
  lg: {
    icon: 'size-14',
    text: 'text-4xl',
  },
};

const sizeClass = sizeClasses[props.size] ?? sizeClasses.md;
</script>

<template>
  <h1
    class="font-heading font-semibold tracking-tight text-foreground flex gap-2 items-center"
    :class="[sizeClass.text]"
  >
    <BrandIcon :class="sizeClass.icon" />
    Moneta
  </h1>
</template>
