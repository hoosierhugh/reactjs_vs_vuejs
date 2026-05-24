import { defineStore } from "pinia"
import { productsApi } from "../api/products"
import type { Product, ProductDraft } from "../types/product"

interface State {
	items: Product[]
	total: number
	skip: number
	limit: number
	search: string
	status: "idle" | "loading" | "succeeded" | "failed"
	error: string | null
}

export const useProductsStore = defineStore("products", {
	state: (): State => ({
		items: [],
		total: 0,
		skip: 0,
		limit: 30,
		search: "",
		status: "idle",
		error: null,
	}),
	getters: {
		page: (s) => Math.floor(s.skip / s.limit) + 1,
		totalPages: (s) => Math.max(1, Math.ceil(s.total / s.limit)),
	},
	actions: {
		setSearch(value: string) {
			this.search = value
			this.skip = 0
		},
		setSkip(value: number) {
			this.skip = Math.max(0, value)
		},
		async fetchAll() {
			this.status = "loading"
			this.error = null
			try {
				const res = await productsApi.list(this.limit, this.skip, this.search)
				this.items = res.products
				this.total = res.total
				this.skip = res.skip
				this.limit = res.limit
				this.status = "succeeded"
			} catch (err) {
				this.status = "failed"
				this.error =
					err instanceof Error ? err.message : "Failed to load products"
			}
		},
		async create(draft: ProductDraft) {
			const created = await productsApi.create(draft)
			// dummyjson returns a synthetic id but doesn't persist; merge locally.
			this.items.unshift(created)
			this.total += 1

			return created
		},
		async update(id: number, patch: Partial<ProductDraft>) {
			const updated = await productsApi.update(id, patch)
			const idx = this.items.findIndex((p) => p.id === id)
			if (idx !== -1) this.items[idx] = { ...this.items[idx], ...updated }

			return updated
		},
		async remove(id: number) {
			await productsApi.remove(id)
			this.items = this.items.filter((p) => p.id !== id)
		},
	},
})
