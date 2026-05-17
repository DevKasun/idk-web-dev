import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { experiments } from '../../data/experiments';

// Resolve the experiment data from the slug param during routing
export const Route = createFileRoute('/experiments/$slug')({
	loader: ({ params }) => {
		const experiment = experiments.find((e) => e.slug === params.slug);
		if (!experiment) throw notFound();
		return { experiment };
	},
	component: ExperimentLayout,
	notFoundComponent: () => (
		<main className="page-container py-20 text-center">
			<p className="text-4xl">🔭</p>
			<h1 className="mt-4 text-2xl font-bold text-[var(--text)]">Experiment not found</h1>
			<Link to="/" className="mt-4 inline-block text-sm text-[var(--text-muted)] underline">
				← Back to gallery
			</Link>
		</main>
	),
});

function ExperimentLayout() {
	const { experiment } = Route.useLoaderData();

	const TAG_COLORS: Record<string, string> = {
		CSS: 'bg-[var(--tag-css-bg)] text-[var(--tag-css-text)] border-[var(--tag-css-border)]',
		JS: 'bg-[var(--tag-js-bg)] text-[var(--tag-js-text)] border-[var(--tag-js-border)]',
		HTML: 'bg-[var(--tag-html-bg)] text-[var(--tag-html-text)] border-[var(--tag-html-border)]',
		API: 'bg-[var(--tag-api-bg)] text-[var(--tag-api-text)] border-[var(--tag-api-border)]',
	};

	// Find prev/next for navigation
	const idx = experiments.findIndex((e) => e.slug === experiment.slug);
	const prev = experiments[idx - 1];
	const next = experiments[idx + 1];

	return (
		<main className="page-container py-10">
			{/* Breadcrumb */}
			<nav className="mb-6 flex items-center gap-2 text-sm text-[var(--text-muted)]" aria-label="Breadcrumb">
				<Link to="/" className="hover:text-[var(--text)] transition-colors">
					Home
				</Link>
				<span aria-hidden="true">›</span>
				<span className="text-[var(--text)]">{experiment.title}</span>
			</nav>

			{/* Header */}
			<div className="mb-8">
				<div className="mb-3 flex flex-wrap items-center gap-2">
					{experiment.tags.map((tag) => (
						<span
							key={tag}
							className={`inline-block rounded-md border px-2 py-0.5 text-xs font-semibold ${TAG_COLORS[tag]}`}
						>
							{tag}
						</span>
					))}
					{experiment.browserSupport && (
						<span className="ml-auto text-xs text-[var(--text-subtle)]">
							🌐 {experiment.browserSupport}
						</span>
					)}
				</div>

				<h1 className="mb-2 text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl">
					{experiment.title}
				</h1>
				<p className="max-w-2xl text-base leading-relaxed text-[var(--text-muted)]">
					{experiment.description}
				</p>
			</div>

			{/* Demo area — each experiment page renders its own demo here via Outlet or direct import */}
			<div className="demo-shell min-h-64 rounded-2xl p-6 sm:p-8">
				<p className="text-sm text-[var(--text-subtle)]">
					⚡ Demo for <strong className="text-[var(--text)]">{experiment.title}</strong> loads below.
				</p>
			</div>

			{/* Prev / Next navigation */}
			<nav
				className="mt-10 flex items-center justify-between gap-4 border-t border-[var(--border)] pt-6"
				aria-label="Experiment navigation"
			>
				{prev ? (
					<Link
						to="/experiments/$slug"
						params={{ slug: prev.slug }}
						className="group flex flex-col gap-0.5 text-sm"
					>
						<span className="text-xs text-[var(--text-subtle)]">← Previous</span>
						<span className="font-semibold text-[var(--text)] group-hover:gradient-text transition-all">
							{prev.title}
						</span>
					</Link>
				) : <span />}
				{next ? (
					<Link
						to="/experiments/$slug"
						params={{ slug: next.slug }}
						className="group flex flex-col items-end gap-0.5 text-sm"
					>
						<span className="text-xs text-[var(--text-subtle)]">Next →</span>
						<span className="font-semibold text-[var(--text)] group-hover:gradient-text transition-all">
							{next.title}
						</span>
					</Link>
				) : <span />}
			</nav>
		</main>
	);
}
