import { useProductsStore } from '../store'

export default function Toolbar() {
	const { search, skip, limit, total, status, setSearch, setSkip } =
		useProductsStore()

	const page = Math.floor(skip / limit) + 1
	const totalPages = Math.max(1, Math.ceil(total / limit))

	return (
		<div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<input
				type="search"
				placeholder="Search products…"
				value={search}
				onChange={(evt) => setSearch(evt.target.value)}
				className="w-full max-w-md rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
			/>
			<div className="flex items-center gap-2 text-sm text-slate-600">
				<button
					type="button"
					disabled={skip === 0 || status === 'loading'}
					onClick={() => setSkip(Math.max(0, skip - limit))}
					className="rounded-md border border-slate-300 bg-white px-3 py-1.5 disabled:opacity-50"
				>
					Prev
				</button>
				<span>
					Page {page} of {totalPages}
				</span>
				<button
					type="button"
					disabled={skip + limit >= total || status === 'loading'}
					onClick={() => setSkip(skip + limit)}
					className="rounded-md border border-slate-300 bg-white px-3 py-1.5 disabled:opacity-50"
				>
					Next
				</button>
			</div>
		</div>
	)
}
