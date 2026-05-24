import { create } from 'zustand'
import { productsApi } from '../api/products'
import type { Product, ProductDraft } from '../types/product'

export interface ProductsState {
	items: Product[]
	total: number
	skip: number
	limit: number
	search: string
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
	error: string | null
	selectedId: number | null

	// Actions
	setSearch(search: string): void
	setSkip(skip: number): void
	selectProduct(id: number | null): void
	fetchProducts(params?: {
		limit?: number
		skip?: number
		search?: string
	}): Promise<void>
	createProduct(draft: ProductDraft): Promise<void>
	updateProduct(id: number, patch: Partial<ProductDraft>): Promise<void>
	deleteProduct(id: number): Promise<void>
}

export const useProductsStore = create<ProductsState>((set, get) => ({
	items: [],
	total: 0,
	skip: 0,
	limit: 30,
	search: '',
	status: 'idle',
	error: null,
	selectedId: null,

	setSearch(search) {
		set({ search, skip: 0 })
	},

	setSkip(skip) {
		set({ skip })
	},

	selectProduct(id) {
		set({ selectedId: id })
	},

	async fetchProducts(
		params: { limit?: number; skip?: number; search?: string } = {},
	) {
		const {
			limit = get().limit,
			skip = get().skip,
			search = get().search,
		} = params
		set({ status: 'loading', error: null })
		try {
			const data = await productsApi.list(limit, skip, search)
			set({
				status: 'succeeded',
				items: data.products,
				total: data.total,
				skip: data.skip,
				limit: data.limit,
			})
		} catch (err) {
			set({
				status: 'failed',
				error: err instanceof Error ? err.message : 'Failed to load products',
			})
		}
	},

	async createProduct(draft) {
		const product = await productsApi.create(draft)
		set((s) => ({ items: [product, ...s.items], total: s.total + 1 }))
	},

	async updateProduct(id, patch) {
		const updated = await productsApi.update(id, patch)
		set((s) => ({
			items: s.items.map((p) => (p.id === id ? { ...p, ...updated } : p)),
		}))
	},

	async deleteProduct(id) {
		await productsApi.remove(id)
		set((s) => ({
			items: s.items.filter((p) => p.id !== id),
			total: Math.max(0, s.total - 1),
			selectedId: s.selectedId === id ? null : s.selectedId,
		}))
	},
}))
