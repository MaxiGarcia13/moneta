import { ref } from 'vue';

export function useAsyncSubmit(fallbackErrorMessage = 'Something went wrong') {
  const isSubmitting = ref(false);
  const submitError = ref<string | null>(null);

  function clearSubmitError() {
    submitError.value = null;
  }

  async function runSubmit(action: () => Promise<void>) {
    submitError.value = null;
    isSubmitting.value = true;

    try {
      await action();
    } catch (error) {
      submitError.value
        = error instanceof Error ? error.message : fallbackErrorMessage;
    } finally {
      isSubmitting.value = false;
    }
  }

  return {
    isSubmitting,
    submitError,
    clearSubmitError,
    runSubmit,
  };
}
