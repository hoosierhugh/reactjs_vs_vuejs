import { useEffect, useState } from 'react'

import DeleteConfirm from './components/DeleteConfirm'
import ProductDetail from './components/ProductDetail'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import Toolbar from './components/Toolbar'

import { useProductsStore } from './store'

import type { Product } from './types/product'

export default function App() {
	const { search, limit, skip, fetchProducts } = useProductsStore()

	const [editing, setEditing] = useState<Product | null>(null)
	const [creating, setCreating] = useState(false)
	const [deletingId, setDeletingId] = useState<number | null>(null)
	const [detailId, setDetailId] = useState<number | null>(null)

	useEffect(() => {
		const handle = setTimeout(
			() => {
				fetchProducts({ limit, skip, search })
			},
			search ? 300 : 0,
		)

		return () => clearTimeout(handle)
	}, [limit, skip, search, fetchProducts])

	return (
		<div className="min-h-full">
			<header className="border-b border-slate-200 bg-white">
				<div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
					<div>
						<h1 className="text-xl font-semibold">Products CRUD App</h1>
						<p className="text-sm text-slate-500">
							React 19 · Zustand · Headless UI · Tailwind
						</p>
					</div>
					<button
						type="button"
						onClick={() => setCreating(true)}
						className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						New product
					</button>
				</div>
			</header>

			<main className="mx-auto max-w-6xl px-6 py-6">
				<Toolbar />
				<ProductList
					onView={(p) => setDetailId(p.id)}
					onEdit={(p) => setEditing(p)}
					onDelete={(p) => setDeletingId(p.id)}
				/>
			</main>

			<ProductForm
				open={creating}
				onClose={() => setCreating(false)}
				mode="create"
			/>
			<ProductForm
				open={editing !== null}
				onClose={() => setEditing(null)}
				mode="edit"
				product={editing ?? undefined}
			/>
			<DeleteConfirm
				open={deletingId !== null}
				productId={deletingId}
				onClose={() => setDeletingId(null)}
			/>
			<ProductDetail
				open={detailId !== null}
				productId={detailId}
				onClose={() => setDetailId(null)}
			/>
		</div>
	)
}
