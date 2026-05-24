<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

import DeleteConfirm from './components/DeleteConfirm.vue';
import ProductDetail from './components/ProductDetail.vue';
import ProductForm from './components/ProductForm.vue';
import ProductList from './components/ProductList.vue';
import Toolbar from './components/Toolbar.vue';

import { useProductsStore } from './stores/products';
import type { Product } from './types/product';

const store = useProductsStore();
const { search, skip, limit } = storeToRefs(store);

const creating = ref(false);
const editing = ref<Product | null>(null);
const deletingId = ref<number | null>(null);
const detailId = ref<number | null>(null);

let debounce: ReturnType<typeof setTimeout> | null = null;
watch(
  [search, skip, limit],
  () => {
    if (debounce) clearTimeout(debounce);
    debounce = setTimeout(() => store.fetchAll(), search.value ? 300 : 0);
  },
  { immediate: true },
);
</script>

<template>
  <div class="min-h-full">
    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <h1 class="text-xl font-semibold">Products</h1>
          <p class="text-sm text-slate-500">Vue 3 · Pinia · Headless UI · Tailwind</p>
        </div>
        <button
          type="button"
          @click="creating = true"
          class="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          New product
        </button>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-6">
      <Toolbar />
      <ProductList
        @view="(p: Product) => (detailId = p.id)"
        @edit="(p: Product) => (editing = p)"
        @delete="(p: Product) => (deletingId = p.id)"
      />
    </main>

    <ProductForm
      :open="creating"
      mode="create"
      @close="creating = false"
    />
    <ProductForm
      :open="editing !== null"
      mode="edit"
      :product="editing ?? undefined"
      @close="editing = null"
    />
    <DeleteConfirm
      :open="deletingId !== null"
      :product-id="deletingId"
      @close="deletingId = null"
    />
    <ProductDetail
      :open="detailId !== null"
      :product-id="detailId"
      @close="detailId = null"
    />
  </div>
</template>
