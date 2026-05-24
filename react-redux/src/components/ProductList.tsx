import { useAppSelector } from '../store'
import type { Product } from '../types/product'

interface Props {
	onView: (p: Product) => void
	onEdit: (p: Product) => void
	onDelete: (p: Product) => void
}

export default function ProductList({ onView, onEdit, onDelete }: Props) {
	const { items, status, error } = useAppSelector((s) => s.products)

	if (status === 'loading' && items.length === 0) {
		return <p className="py-12 text-center text-slate-500">Loading…</p>
	}
	if (status === 'failed') {
		return <p className="py-12 text-center text-rose-600">{error}</p>
	}
	if (items.length === 0) {
		return (
			<p className="py-12 text-center text-slate-500">No products found.</p>
		)
	}

	return (
		<div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
			<table className="min-w-full divide-y divide-slate-200">
				<thead className="bg-slate-50">
					<tr>
						<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
							Product
						</th>
						<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
							Category
						</th>
						<th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
							Price
						</th>
						<th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
							Stock
						</th>
						<th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-slate-100">
					{items.map((p) => (
						<tr key={p.id} className="hover:bg-slate-50">
							<td className="px-4 py-3">
								<div className="flex items-center gap-3">
									{p.thumbnail && (
										<img
											src={p.thumbnail}
											alt=""
											className="h-10 w-10 rounded object-cover"
										/>
									)}
									<div>
										<div className="font-medium text-slate-900">{p.title}</div>
										{p.brand && (
											<div className="text-xs text-slate-500">{p.brand}</div>
										)}
									</div>
								</div>
							</td>
							<td className="px-4 py-3 text-sm text-slate-700">{p.category}</td>
							<td className="px-4 py-3 text-right text-sm tabular-nums">
								${p.price.toFixed(2)}
							</td>
							<td className="px-4 py-3 text-right text-sm tabular-nums">
								{p.stock}
							</td>
							<td className="px-4 py-3 text-right text-sm">
								<div className="flex justify-end gap-2">
									<button
										type="button"
										onClick={() => onView(p)}
										className="rounded px-2 py-1 text-slate-600 hover:bg-slate-100"
									>
										View
									</button>
									<button
										type="button"
										onClick={() => onEdit(p)}
										className="rounded px-2 py-1 text-indigo-600 hover:bg-indigo-50"
									>
										Edit
									</button>
									<button
										type="button"
										onClick={() => onDelete(p)}
										className="rounded px-2 py-1 text-rose-600 hover:bg-rose-50"
									>
										Delete
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
