import type { Product, ProductDraft, ProductsResponse } from '../types/product'

const BASE_URL = 'https://dummyjson.com/products'

async function request<T>(url: string, init?: RequestInit): Promise<T> {
	const res = await fetch(url, {
		headers: { 'Content-Type': 'application/json' },
		...init,
	})
	if (!res.ok) {
		const body = await res.text().catch(() => '')
		throw new Error(`API ${res.status}: ${body || res.statusText}`)
	}
	return res.json() as Promise<T>
}

export const productsApi = {
	list(limit = 30, skip = 0, search = ''): Promise<ProductsResponse> {
		const params = new URLSearchParams({
			limit: String(limit),
			skip: String(skip),
		})
		const path = search
			? `${BASE_URL}/search?q=${encodeURIComponent(search)}&${params}`
			: `${BASE_URL}?${params}`

		return request<ProductsResponse>(path)
	},
	get(id: number): Promise<Product> {
		return request<Product>(`${BASE_URL}/${id}`)
	},
	create(draft: ProductDraft): Promise<Product> {
		return request<Product>(`${BASE_URL}/add`, {
			method: 'POST',
			body: JSON.stringify(draft),
		})
	},
	update(id: number, patch: Partial<ProductDraft>): Promise<Product> {
		return request<Product>(`${BASE_URL}/${id}`, {
			method: 'PUT',
			body: JSON.stringify(patch),
		})
	},
	remove(
		id: number,
	): Promise<Product & { isDeleted: boolean; deletedOn: string }> {
		return request<Product & { isDeleted: boolean; deletedOn: string }>(
			`${BASE_URL}/${id}`,
			{
				method: 'DELETE',
			},
		)
	},
}
