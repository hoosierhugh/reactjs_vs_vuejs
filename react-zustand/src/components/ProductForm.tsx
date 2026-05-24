import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
	TransitionChild,
} from '@headlessui/react'
import {
	Fragment,
	type ReactNode,
	type SubmitEvent,
	useEffect,
	useId,
	useState,
} from 'react'
import { useProductsStore } from '../store'
import type { Product, ProductDraft } from '../types/product'

interface Props {
	open: boolean
	onClose: () => void
	mode: 'create' | 'edit'
	product?: Product
}

const empty: ProductDraft = {
	title: '',
	description: '',
	category: 'smartphones',
	price: 0,
	discountPercentage: 0,
	stock: 0,
	brand: '',
}

export default function ProductForm({ open, onClose, mode, product }: Props) {
	const { createProduct, updateProduct } = useProductsStore()
	const [draft, setDraft] = useState<ProductDraft>(empty)
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!open) return

		if (mode === 'edit' && product) {
			setDraft({
				title: product.title,
				description: product.description,
				category: product.category,
				price: product.price,
				discountPercentage: product.discountPercentage,
				stock: product.stock,
				brand: product.brand ?? '',
			})
		} else {
			setDraft(empty)
		}
		setError(null)
	}, [open, mode, product])

	function update<K extends keyof ProductDraft>(
		key: K,
		value: ProductDraft[K],
	) {
		setDraft((d) => ({ ...d, [key]: value }))
	}

	async function onSubmit(evt: SubmitEvent<HTMLFormElement>) {
		evt.preventDefault()
		setSubmitting(true)
		setError(null)

		try {
			if (mode === 'create') {
				await createProduct(draft)
			} else if (product) {
				await updateProduct(product.id, draft)
			}
			onClose()
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Save failed')
		} finally {
			setSubmitting(false)
		}
	}

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
						<DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
							<DialogTitle className="text-lg font-semibold">
								{mode === 'create'
									? 'New product'
									: `Edit: ${product?.title ?? ''}`}
							</DialogTitle>
							<form onSubmit={onSubmit} className="mt-4 space-y-4">
								<Field label="Title">
									<input
										required
										value={draft.title}
										onChange={(evt) => update('title', evt.target.value)}
										className={inputCls}
									/>
								</Field>
								<Field label="Description">
									<textarea
										rows={3}
										value={draft.description}
										onChange={(evt) => update('description', evt.target.value)}
										className={inputCls}
									/>
								</Field>
								<div className="grid grid-cols-2 gap-3">
									<Field label="Category">
										<input
											value={draft.category}
											onChange={(evt) => update('category', evt.target.value)}
											className={inputCls}
										/>
									</Field>
									<Field label="Brand">
										<input
											value={draft.brand ?? ''}
											onChange={(evt) => update('brand', evt.target.value)}
											className={inputCls}
										/>
									</Field>
								</div>
								<div className="grid grid-cols-3 gap-3">
									<Field label="Price">
										<input
											type="number"
											step="0.01"
											min="0"
											value={draft.price}
											onChange={(evt) =>
												update('price', Number(evt.target.value))
											}
											className={inputCls}
										/>
									</Field>
									<Field label="Discount %">
										<input
											type="number"
											step="0.01"
											min="0"
											value={draft.discountPercentage}
											onChange={(evt) =>
												update('discountPercentage', Number(evt.target.value))
											}
											className={inputCls}
										/>
									</Field>
									<Field label="Stock">
										<input
											type="number"
											min="0"
											value={draft.stock}
											onChange={(evt) =>
												update('stock', Number(evt.target.value))
											}
											className={inputCls}
										/>
									</Field>
								</div>
								{error && <p className="text-sm text-rose-600">{error}</p>}
								<div className="flex justify-end gap-2 pt-2">
									<button
										type="button"
										onClick={onClose}
										className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
									>
										Cancel
									</button>
									<button
										type="submit"
										disabled={submitting}
										className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-60"
									>
										{submitting
											? 'Saving…'
											: mode === 'create'
												? 'Create'
												: 'Save changes'}
									</button>
								</div>
							</form>
						</DialogPanel>
					</TransitionChild>
				</div>
			</Dialog>
		</Transition>
	)
}

const inputCls =
	'mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'

function Field({ label, children }: { label: string; children: ReactNode }) {
	const id = useId()

	return (
		<label htmlFor={id} className="block">
			<span className="text-sm font-medium text-slate-700">{label}</span>
			{children}
		</label>
	)
}
