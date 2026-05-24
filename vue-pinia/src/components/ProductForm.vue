<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { reactive, ref, watch } from 'vue';
import { useProductsStore } from '../stores/products';
import type { Product, ProductDraft } from '../types/product';

const props = defineProps<{
  open: boolean;
  mode: 'create' | 'edit';
  product?: Product;
}>();
const emit = defineEmits<(e: 'close') => void>();

const store = useProductsStore();

const inputCls =
  'mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500';

const empty: ProductDraft = {
  title: '',
  description: '',
  category: 'smartphones',
  price: 0,
  discountPercentage: 0,
  stock: 0,
  brand: '',
};

const draft = reactive<ProductDraft>({ ...empty });
const submitting = ref(false);
const error = ref<string | null>(null);

watch(
  () => [props.open, props.mode, props.product?.id],
  () => {
    if (!props.open) return;
    if (props.mode === 'edit' && props.product) {
      Object.assign(draft, {
        title: props.product.title,
        description: props.product.description,
        category: props.product.category,
        price: props.product.price,
        discountPercentage: props.product.discountPercentage,
        stock: props.product.stock,
        brand: props.product.brand ?? '',
      });
    } else {
      Object.assign(draft, empty);
    }
    error.value = null;
  },
  { immediate: true },
);

async function onSubmit() {
  submitting.value = true;
  error.value = null;
  try {
    if (props.mode === 'create') {
      await store.create({ ...draft });
    } else if (props.product) {
      await store.update(props.product.id, { ...draft });
    }
    emit('close');
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Save failed';
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
          <DialogPanel class="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <DialogTitle class="text-lg font-semibold">
              {{ mode === 'create' ? 'New product' : `Edit: ${product?.title ?? ''}` }}
            </DialogTitle>
            <form @submit.prevent="onSubmit" class="mt-4 space-y-4">
              <label class="block">
                <span class="text-sm font-medium text-slate-700">Title</span>
                <input v-model="draft.title" required :class="inputCls" />
              </label>
              <label class="block">
                <span class="text-sm font-medium text-slate-700">Description</span>
                <textarea v-model="draft.description" rows="3" :class="inputCls" />
              </label>
              <div class="grid grid-cols-2 gap-3">
                <label class="block">
                  <span class="text-sm font-medium text-slate-700">Category</span>
                  <input v-model="draft.category" :class="inputCls" />
                </label>
                <label class="block">
                  <span class="text-sm font-medium text-slate-700">Brand</span>
                  <input v-model="draft.brand" :class="inputCls" />
                </label>
              </div>
              <div class="grid grid-cols-3 gap-3">
                <label class="block">
                  <span class="text-sm font-medium text-slate-700">Price</span>
                  <input
                    v-model.number="draft.price"
                    type="number"
                    step="0.01"
                    min="0"
                    :class="inputCls"
                  />
                </label>
                <label class="block">
                  <span class="text-sm font-medium text-slate-700">Discount %</span>
                  <input
                    v-model.number="draft.discountPercentage"
                    type="number"
                    step="0.01"
                    min="0"
                    :class="inputCls"
                  />
                </label>
                <label class="block">
                  <span class="text-sm font-medium text-slate-700">Stock</span>
                  <input
                    v-model.number="draft.stock"
                    type="number"
                    min="0"
                    :class="inputCls"
                  />
                </label>
              </div>
              <p v-if="error" class="text-sm text-rose-600">{{ error }}</p>
              <div class="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  @click="$emit('close')"
                  class="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >Cancel</button>
                <button
                  type="submit"
                  :disabled="submitting"
                  class="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-60"
                >
                  {{ submitting ? 'Saving…' : mode === 'create' ? 'Create' : 'Save changes' }}
                </button>
              </div>
            </form>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
