import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit'
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
}

const initialState: ProductsState = {
	items: [],
	total: 0,
	skip: 0,
	limit: 30,
	search: '',
	status: 'idle',
	error: null,
	selectedId: null,
}

export const fetchProducts = createAsyncThunk(
	'products/fetch',
	async (params: { limit?: number; skip?: number; search?: string } = {}) => {
		const { limit = 30, skip = 0, search = '' } = params

		return productsApi.list(limit, skip, search)
	},
)

export const createProduct = createAsyncThunk(
	'products/create',
	async (draft: ProductDraft) => productsApi.create(draft),
)

export const updateProduct = createAsyncThunk(
	'products/update',
	async (payload: { id: number; patch: Partial<ProductDraft> }) =>
		productsApi.update(payload.id, payload.patch),
)

export const deleteProduct = createAsyncThunk(
	'products/delete',
	async (id: number) => {
		await productsApi.remove(id)

		return id
	},
)

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setSearch(state, action: PayloadAction<string>) {
			state.search = action.payload
			state.skip = 0
		},
		setSkip(state, action: PayloadAction<number>) {
			state.skip = action.payload
		},
		selectProduct(state, action: PayloadAction<number | null>) {
			state.selectedId = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.items = action.payload.products
				state.total = action.payload.total
				state.skip = action.payload.skip
				state.limit = action.payload.limit
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message ?? 'Failed to load products'
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				// dummyjson returns a synthetic id but doesn't persist; merge locally.
				state.items.unshift(action.payload)
				state.total += 1
			})
			.addCase(updateProduct.fulfilled, (state, action) => {
				const idx = state.items.findIndex((p) => p.id === action.payload.id)
				if (idx !== -1)
					state.items[idx] = { ...state.items[idx], ...action.payload }
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.items = state.items.filter((p) => p.id !== action.payload)
				if (state.selectedId === action.payload) state.selectedId = null
			})
	},
})

export const { setSearch, setSkip, selectProduct } = productsSlice.actions
export default productsSlice.reducer
