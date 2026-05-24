<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { computed, ref } from 'vue';
import { useProductsStore } from '../stores/products';

const props = defineProps<{
  open: boolean;
  productId: number | null;
}>();
const emit = defineEmits<(e: 'close') => void>();

const store = useProductsStore();
const product = computed(() =>
  props.productId ? store.items.find((p) => p.id === props.productId) : undefined,
);

const submitting = ref(false);
const error = ref<string | null>(null);

async function onConfirm() {
  if (!props.productId) return;
  submitting.value = true;
  error.value = null;
  try {
    await store.remove(props.productId);
    emit('close');
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Delete failed';
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <TransitionRoot :show="open" as="template">
    <Dialog @close="$emit('close')" class="relative z-50">
      <TransitionChild
        as="template"
        enter="ease-out duration-200"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-150"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-slate-900/40" aria-hidden="true" />
      </TransitionChild>
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <TransitionChild
          as="template"
          enter="ease-out duration-200"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-150"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel class="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <DialogTitle class="text-lg font-semibold">Delete product?</DialogTitle>
            <p class="mt-2 text-sm text-slate-600">
              This will remove
              <span class="font-medium">{{ product?.title ?? 'this product' }}</span>
              from the list.
            </p>
            <p v-if="error" class="mt-2 text-sm text-rose-600">{{ error }}</p>
            <div class="mt-5 flex justify-end gap-2">
              <button
                type="button"
                @click="$emit('close')"
                class="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >Cancel</button>
              <button
                type="button"
                :disabled="submitting"
                @click="onConfirm"
                class="rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500 disabled:opacity-60"
              >{{ submitting ? 'Deleting…' : 'Delete' }}</button>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
