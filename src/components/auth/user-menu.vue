<script setup lang="ts">
import SignOutButton from '@/components/auth/sign-out-button.vue';
import UserAvatar from '@/components/auth/user-avatar.vue';
import ChevronDownIcon from '@/components/icons/chevron-down.vue';
import ThemeSwitch from '@/components/theme/theme-switch.vue';
import Menu from '@/components/ui/menu.vue';
</script>

<template>
  <Menu class="my-auto flex justify-center items-center">
    <template #trigger="{ open, toggle }">
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-full text-muted transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer"
        :aria-expanded="open"
        aria-haspopup="menu"
        aria-label="User menu"
        @click="toggle"
      >
        <UserAvatar />
        <ChevronDownIcon
          class="size-4 transition-transform"
          :class="{ 'rotate-180': open }"
        />
      </button>
    </template>

    <template #default="{ close }">
      <div class="flex flex-col gap-2">
        <ThemeSwitch role="menuitem" />
        <SignOutButton
          role="menuitem"
          class="w-full"
          @click="close"
        />
      </div>
    </template>
  </Menu>
</template>
