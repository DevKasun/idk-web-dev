import { Link } from '@tanstack/react-router';
import type { Experiment, ExperimentTag } from '../data/experiments';

const TAG_COLORS: Record<ExperimentTag, string> = {
	CSS: 'bg-[var(--tag-css-bg)] text-[var(--tag-css-text)] border-[var(--tag-css-border)]',
	JS: 'bg-[var(--tag-js-bg)] text-[var(--tag-js-text)] border-[var(--tag-js-border)]',
	HTML: 'bg-[var(--tag-html-bg)] text-[var(--tag-html-text)] border-[var(--tag-html-border)]',
	API: 'bg-[var(--tag-api-bg)] text-[var(--tag-api-text)] border-[var(--tag-api-border)]',
};

interface ExperimentLayoutProps {
	experiment: Experiment;
	allExperiments: Experiment[];
	children?: React.ReactNode;
}

export default function ExperimentLayout({
	experiment,
	allExperiments,
	children,
}: ExperimentLayoutProps) {
	const idx = allExperiments.findIndex((e) => e.slug === experiment.slug);
	const prev = allExperiments[idx - 1];
	const next = allExperiments[idx + 1];

	return (
		<main className='page-container py-10'>
			<nav
				className='mb-6 flex items-center gap-2 text-sm text-(--text-muted)'
				aria-label='Breadcrumb'
			>
				<Link to='/' className='hover:text-(--text) transition-colors'>
					Home
				</Link>
				<span aria-hidden='true'>›</span>
				<span className='text-(--text)'>{experiment.title}</span>
			</nav>

			<div className='mb-8'>
				<div className='mb-3 flex flex-wrap items-center gap-2'>
					{experiment.tags.map((tag) => (
						<span
							key={tag}
							className={`inline-block rounded-md border px-2 py-0.5 text-xs font-semibold ${TAG_COLORS[tag]}`}
						>
							{tag}
						</span>
					))}
					{experiment.browserSupport && (
						<span className='ml-auto text-xs text-(--text-subtle)'>
							🌐 {experiment.browserSupport}
						</span>
					)}
				</div>

				<h1 className='mb-2 text-3xl font-extrabold tracking-tight text-(--text) sm:text-4xl'>
					{experiment.title}
				</h1>
				<p className='max-w-2xl text-base leading-relaxed text-(--text-muted)'>
					{experiment.description}
				</p>
			</div>

			<div className='demo-shell min-h-64 rounded-2xl p-6 sm:p-8'>
				{children ?? (
					<p className='text-sm text-(--text-subtle)'>
						⚡ Demo for{' '}
						<strong className='text-(--text)'>{experiment.title}</strong>{' '}
						loads below.
					</p>
				)}
			</div>

			<nav
				className='mt-10 flex items-center justify-between gap-4 border-t border-(--border) pt-6'
				aria-label='Experiment navigation'
			>
				{prev ? (
					<Link
						to='/experiments/$slug'
						params={{ slug: prev.slug }}
						className='group flex flex-col gap-0.5 text-sm'
					>
						<span className='text-xs text-(--text-subtle)'>← Previous</span>
						<span className='font-semibold text-(--text) group-hover:gradient-text transition-all'>
							{prev.title}
						</span>
					</Link>
				) : (
					<span />
				)}
				{next ? (
					<Link
						to='/experiments/$slug'
						params={{ slug: next.slug }}
						className='group flex flex-col items-end gap-0.5 text-sm'
					>
						<span className='text-xs text-(--text-subtle)'>Next →</span>
						<span className='font-semibold text-(--text) group-hover:gradient-text transition-all'>
							{next.title}
						</span>
					</Link>
				) : (
					<span />
				)}
			</nav>
		</main>
	);
}
