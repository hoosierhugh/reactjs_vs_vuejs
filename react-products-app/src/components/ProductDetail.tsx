import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
	TransitionChild,
} from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { productsApi } from '../api/products'
import type { Product } from '../types/product'

interface Props {
	open: boolean
	productId: number | null
	onClose: () => void
}

export default function ProductDetail({ open, productId, onClose }: Props) {
	const [product, setProduct] = useState<Product | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!open || !productId) {
			setProduct(null)
			return
		}

		let cancelled = false
		setLoading(true)
		setError(null)
		productsApi
			.get(productId)
			.then((p) => {
				if (!cancelled) setProduct(p)
			})
			.catch((err) => {
				if (!cancelled)
					setError(err instanceof Error ? err.message : 'Load failed')
			})
			.finally(() => {
				if (!cancelled) setLoading(false)
			})

		return () => {
			cancelled = true
		}
	}, [open, productId])

	return (
		<Transition show={open} as={Fragment}>
			<Dialog onClose={onClose} className="relative z-50">
				<TransitionChild
					as={Fragment}
					enter="ease-out duration-200"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-150"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-slate-900/40" aria-hidden="true" />
				</TransitionChild>
				<div className="fixed inset-0 flex items-center justify-center p-4">
					<TransitionChild
						as={Fragment}
						enter="ease-out duration-200"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-150"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<DialogPanel className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">
							<DialogTitle className="text-lg font-semibold">
								{product?.title ?? 'Product details'}
							</DialogTitle>
							<div className="mt-4 text-sm text-slate-700">
								{loading && <p className="text-slate-500">Loading…</p>}
								{error && <p className="text-rose-600">{error}</p>}
								{product && (
									<div className="space-y-3">
										{product.thumbnail && (
											<img
												src={product.thumbnail}
												alt=""
												className="h-40 w-full rounded-md object-cover"
											/>
										)}
										<p>{product.description}</p>
										<dl className="grid grid-cols-2 gap-3">
											<Info label="Category" value={product.category} />
											<Info label="Brand" value={product.brand ?? '—'} />
											<Info
												label="Price"
												value={`$${product.price.toFixed(2)}`}
											/>
											<Info
												label="Discount"
												value={`${product.discountPercentage}%`}
											/>
											<Info label="Stock" value={String(product.stock)} />
											<Info label="Rating" value={product.rating.toFixed(2)} />
										</dl>
									</div>
								)}
							</div>
							<div className="mt-6 flex justify-end">
								<button
									type="button"
									onClick={onClose}
									className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
								>
									Close
								</button>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</Dialog>
		</Transition>
	)
}

function Info({ label, value }: { label: string; value: string }) {
	return (
		<div>
			<dt className="text-xs uppercase tracking-wide text-slate-500">
				{label}
			</dt>
			<dd className="text-sm text-slate-900">{value}</dd>
		</div>
	)
}
