<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue';

const open = ref(false);
const rootRef = useTemplateRef<HTMLElement>('root');

function toggle() {
  open.value = !open.value;
}

function close() {
  open.value = false;
}

function onPointerDown(event: PointerEvent) {
  const target = event.target;

  if (!(target instanceof Node) || rootRef.value?.contains(target)) {
    return;
  }

  close();
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    close();
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', onPointerDown);
  document.addEventListener('keydown', onKeyDown);
});

onUnmounted(() => {
  document.removeEventListener('pointerdown', onPointerDown);
  document.removeEventListener('keydown', onKeyDown);
});
</script>

<template>
  <div
    ref="root"
    class="relative"
  >
    <slot
      name="trigger"
      :open="open"
      :toggle="toggle"
      :close="close"
    />
    <div
      v-if="open"
      role="menu"
      class="absolute right-0 z-50 mt-2 min-w-44 rounded-xl border border-border bg-surface-raised p-2 shadow-md"
    >
      <slot
        :close="close"
        :open="open"
      />
    </div>
  </div>
</template>
