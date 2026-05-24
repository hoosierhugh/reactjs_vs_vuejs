<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useProductsStore } from '../stores/products';
import type { Product } from '../types/product';

defineEmits<{
  (e: 'view', p: Product): void;
  (e: 'edit', p: Product): void;
  (e: 'delete', p: Product): void;
}>();

const store = useProductsStore();
const { items, status, error } = storeToRefs(store);
</script>

<template>
  <p v-if="status === 'loading' && items.length === 0" class="py-12 text-center text-slate-500">
    Loading…
  </p>
  <p v-else-if="status === 'failed'" class="py-12 text-center text-rose-600">{{ error }}</p>
  <p v-else-if="items.length === 0" class="py-12 text-center text-slate-500">
    No products found.
  </p>
  <div v-else class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
    <table class="min-w-full divide-y divide-slate-200">
      <thead class="bg-slate-50">
        <tr>
          <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Product</th>
          <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Category</th>
          <th class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">Price</th>
          <th class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">Stock</th>
          <th class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">
        <tr v-for="p in items" :key="p.id" class="hover:bg-slate-50">
          <td class="px-4 py-3">
            <div class="flex items-center gap-3">
              <img v-if="p.thumbnail" :src="p.thumbnail" alt="" class="h-10 w-10 rounded object-cover" />
              <div>
                <div class="font-medium text-slate-900">{{ p.title }}</div>
                <div v-if="p.brand" class="text-xs text-slate-500">{{ p.brand }}</div>
              </div>
            </div>
          </td>
          <td class="px-4 py-3 text-sm text-slate-700">{{ p.category }}</td>
          <td class="px-4 py-3 text-right text-sm tabular-nums">${{ p.price.toFixed(2) }}</td>
          <td class="px-4 py-3 text-right text-sm tabular-nums">{{ p.stock }}</td>
          <td class="px-4 py-3 text-right text-sm">
            <div class="flex justify-end gap-2">
              <button
                type="button"
                @click="$emit('view', p)"
                class="rounded px-2 py-1 text-slate-600 hover:bg-slate-100"
              >View</button>
              <button
                type="button"
                @click="$emit('edit', p)"
                class="rounded px-2 py-1 text-emerald-600 hover:bg-emerald-50"
              >Edit</button>
              <button
                type="button"
                @click="$emit('delete', p)"
                class="rounded px-2 py-1 text-rose-600 hover:bg-rose-50"
              >Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
