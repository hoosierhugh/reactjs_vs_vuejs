import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
	TransitionChild,
} from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { deleteProduct } from '../store/productsSlice'

interface Props {
	open: boolean
	productId: number | null
	onClose: () => void
}

export default function DeleteConfirm({ open, productId, onClose }: Props) {
	const dispatch = useAppDispatch()
	const product = useAppSelector((s) =>
		productId ? s.products.items.find((p) => p.id === productId) : undefined,
	)
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState<string | null>(null)

	async function onConfirm() {
		if (!productId) return

		setSubmitting(true)
		setError(null)
		try {
			await dispatch(deleteProduct(productId)).unwrap()
			onClose()
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Delete failed')
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
						<DialogPanel className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
							<DialogTitle className="text-lg font-semibold">
								Delete product?
							</DialogTitle>
							<p className="mt-2 text-sm text-slate-600">
								This will remove{' '}
								<span className="font-medium">
									{product?.title ?? 'this product'}
								</span>{' '}
								from the list.
							</p>
							{error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
							<div className="mt-5 flex justify-end gap-2">
								<button
									type="button"
									onClick={onClose}
									className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
								>
									Cancel
								</button>
								<button
									type="button"
									disabled={submitting}
									onClick={onConfirm}
									className="rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500 disabled:opacity-60"
								>
									{submitting ? 'Deleting…' : 'Delete'}
								</button>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</Dialog>
		</Transition>
	)
}
