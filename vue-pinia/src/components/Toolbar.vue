<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useProductsStore } from '../stores/products';

const store = useProductsStore();
const { search, skip, limit, total, status, page, totalPages } = storeToRefs(store);
</script>

<template>
  <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <input
      type="search"
      placeholder="Search products…"
      :value="search"
      @input="(evt) => store.setSearch((evt.target as HTMLInputElement).value)"
      class="w-full max-w-md rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
    />
    <div class="flex items-center gap-2 text-sm text-slate-600">
      <button
        type="button"
        :disabled="skip === 0 || status === 'loading'"
        @click="store.setSkip(skip - limit)"
        class="rounded-md border border-slate-300 bg-white px-3 py-1.5 disabled:opacity-50"
      >
        Prev
      </button>
      <span>Page {{ page }} of {{ totalPages }}</span>
      <button
        type="button"
        :disabled="skip + limit >= total || status === 'loading'"
        @click="store.setSkip(skip + limit)"
        class="rounded-md border border-slate-300 bg-white px-3 py-1.5 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>
</template>
