<script setup lang="ts">
import SignOutButton from '@/components/auth/sign-out-button.vue';
import UserAvatar from '@/components/auth/user-avatar.vue';
import ChevronDownIcon from '@/components/icons/chevron-down.vue';
import Menu from '@/components/ui/menu.vue';
</script>

<template>
  <Menu>
    <template #trigger="{ open, toggle }">
      <button
        type="button"
        class="inline-flex items-center gap-1 rounded-full text-muted transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer"
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
      <SignOutButton
        role="menuitem"
        class="w-full"
        @click="close"
      />
    </template>
  </Menu>
</template>
