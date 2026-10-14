<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue';

const props = defineProps<{
  class?: string;
}>();

const MENU_OFFSET_PX = 8;

const open = ref(false);
const rootRef = useTemplateRef<HTMLElement>('root');
const menuRef = useTemplateRef<HTMLElement>('menu');
const menuStyle = ref<Record<string, string>>({});

function updateMenuPosition() {
  const root = rootRef.value;

  if (!root) {
    return;
  }

  const rect = root.getBoundingClientRect();

  menuStyle.value = {
    top: `${rect.bottom + MENU_OFFSET_PX}px`,
    right: `${document.documentElement.clientWidth - rect.right}px`,
  };
}

function toggle() {
  open.value = !open.value;
}

function close() {
  open.value = false;
}

function onPointerDown(event: PointerEvent) {
  const target = event.target;

  if (
    !(target instanceof Node)
    || rootRef.value?.contains(target)
    || menuRef.value?.contains(target)
  ) {
    return;
  }

  close();
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    close();
  }
}

function onReposition() {
  if (open.value) {
    updateMenuPosition();
  }
}

watch(open, (isOpen) => {
  if (isOpen) {
    updateMenuPosition();
  }
});

onMounted(() => {
  document.addEventListener('pointerdown', onPointerDown);
  document.addEventListener('keydown', onKeyDown);
  window.addEventListener('resize', onReposition);
  window.addEventListener('scroll', onReposition, true);
});

onUnmounted(() => {
  document.removeEventListener('pointerdown', onPointerDown);
  document.removeEventListener('keydown', onKeyDown);
  window.removeEventListener('resize', onReposition);
  window.removeEventListener('scroll', onReposition, true);
});
</script>

<template>
  <div
    ref="root"
    class="relative"
    :class="props.class"
  >
    <slot
      name="trigger"
      :open="open"
      :toggle="toggle"
      :close="close"
    />
    <Teleport to="body">
      <div
        v-if="open"
        ref="menu"
        role="menu"
        class="fixed z-50 min-w-44 rounded-xl border border-border bg-surface-raised p-2 shadow-md"
        :style="menuStyle"
      >
        <slot
          :close="close"
          :open="open"
        />
      </div>
    </Teleport>
  </div>
</template>
