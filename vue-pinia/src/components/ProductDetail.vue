<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { ref, watch } from 'vue';
import { productsApi } from '../api/products';
import type { Product } from '../types/product';

const props = defineProps<{
  open: boolean;
  productId: number | null;
}>();
defineEmits<(e: 'close') => void>();

const product = ref<Product | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

watch(
  () => [props.open, props.productId],
  async () => {
    if (!props.open || !props.productId) {
      product.value = null;
      return;
    }

    loading.value = true;
    error.value = null;
    const id = props.productId;
    try {
      const p = await productsApi.get(id);
      if (props.productId === id) product.value = p;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Load failed';
    } finally {
      loading.value = false;
    }
  },
  { immediate: true },
);
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
          <DialogPanel class="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">
            <DialogTitle class="text-lg font-semibold">
              {{ product?.title ?? 'Product details' }}
            </DialogTitle>
            <div class="mt-4 text-sm text-slate-700">
              <p v-if="loading" class="text-slate-500">Loading…</p>
              <p v-else-if="error" class="text-rose-600">{{ error }}</p>
              <div v-else-if="product" class="space-y-3">
                <img
                  v-if="product.thumbnail"
                  :src="product.thumbnail"
                  alt=""
                  class="h-40 w-full rounded-md object-cover"
                />
                <p>{{ product.description }}</p>
                <dl class="grid grid-cols-2 gap-3">
                  <div>
                    <dt class="text-xs uppercase tracking-wide text-slate-500">Category</dt>
                    <dd class="text-sm text-slate-900">{{ product.category }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs uppercase tracking-wide text-slate-500">Brand</dt>
                    <dd class="text-sm text-slate-900">{{ product.brand ?? '—' }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs uppercase tracking-wide text-slate-500">Price</dt>
                    <dd class="text-sm text-slate-900">${{ product.price.toFixed(2) }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs uppercase tracking-wide text-slate-500">Discount</dt>
                    <dd class="text-sm text-slate-900">{{ product.discountPercentage }}%</dd>
                  </div>
                  <div>
                    <dt class="text-xs uppercase tracking-wide text-slate-500">Stock</dt>
                    <dd class="text-sm text-slate-900">{{ product.stock }}</dd>
                  </div>
                  <div>
                    <dt class="text-xs uppercase tracking-wide text-slate-500">Rating</dt>
                    <dd class="text-sm text-slate-900">{{ product.rating.toFixed(2) }}</dd>
                  </div>
                </dl>
              </div>
            </div>
            <div class="mt-6 flex justify-end">
              <button
                type="button"
                @click="$emit('close')"
                class="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >Close</button>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
