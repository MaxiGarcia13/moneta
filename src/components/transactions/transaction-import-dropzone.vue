<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import UploadIcon from '@/components/icons/upload.vue';

const emit = defineEmits<{
  select: [file: File];
}>();

const ACCEPTED_EXTENSIONS = ['.html', '.xls'];

const fileInputRef = useTemplateRef<HTMLInputElement>('fileInput');
const isDragging = ref(false);
const error = ref<string | null>(null);

function hasAcceptedExtension(file: File) {
  const name = file.name.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((extension) => name.endsWith(extension));
}

function takeFile(file: File | undefined) {
  error.value = null;

  if (!file) {
    return;
  }

  if (!hasAcceptedExtension(file)) {
    error.value = 'Only .html or .xls files are supported';
    return;
  }

  emit('select', file);
}

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  takeFile(input.files?.[0]);
  input.value = '';
}

function onDrop(event: DragEvent) {
  isDragging.value = false;
  takeFile(event.dataTransfer?.files?.[0]);
}

function openFilePicker() {
  fileInputRef.value?.click();
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <button
      type="button"
      class="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border px-6 py-10 text-center transition-colors hover:border-accent-border hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      :class="isDragging ? 'border-accent-border bg-accent-soft' : ''"
      @click="openFilePicker"
      @dragenter.prevent="isDragging = true"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="onDrop"
    >
      <UploadIcon class="size-8 text-muted" />
      <div class="flex flex-col gap-2">
        <p class="font-medium">
          Drop a file here or click to browse
        </p>
        <p class="text-sm text-muted">
          Accepts .html or .xls account exports
        </p>
      </div>
    </button>

    <input
      ref="fileInput"
      type="file"
      class="sr-only"
      accept=".html,.xls,text/html"
      @change="onFileChange"
    >

    <p
      v-if="error"
      class="text-sm text-danger"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>
