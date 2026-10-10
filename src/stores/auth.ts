import type { Session, User } from '@supabase/supabase-js';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '@/supabase/client';

export const useAuthStore = defineStore('auth', () => {
  const session = ref<Session | null>(null);
  const user = ref<User | null>(null);
  const isReady = ref(false);

  let initialized = false;

  function initialize() {
    if (initialized) {
      return;
    }

    initialized = true;

    supabase.auth.getSession().then(({ data }) => {
      session.value = data.session;
      user.value = data.session?.user ?? null;
      isReady.value = true;
    });

    supabase.auth.onAuthStateChange((_event, nextSession) => {
      session.value = nextSession;
      user.value = nextSession?.user ?? null;
      isReady.value = true;
    });
  }

  async function signInWithGithub() {
    const redirectTo = `${window.location.origin}/`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo },
    });

    if (error) {
      throw error;
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }

  return {
    session,
    user,
    isReady,
    initialize,
    signInWithGithub,
    signOut,
  };
});
