import { Link } from '@tanstack/react-router';
import type { Experiment, ExperimentTag } from '../data/experiments';

const TAG_STYLES: Record<ExperimentTag, string> = {
	CSS: 'bg-[var(--tag-css-bg)] text-[var(--tag-css-text)] border-[var(--tag-css-border)]',
	JS: 'bg-[var(--tag-js-bg)] text-[var(--tag-js-text)] border-[var(--tag-js-border)]',
	HTML: 'bg-[var(--tag-html-bg)] text-[var(--tag-html-text)] border-[var(--tag-html-border)]',
	API: 'bg-[var(--tag-api-bg)] text-[var(--tag-api-text)] border-[var(--tag-api-border)]',
};

const STATUS_STYLES = {
	stable: {
		wrapper: 'bg-[var(--status-stable-bg)] text-[var(--status-stable-text)]',
		dot: 'bg-[var(--status-stable-dot)]',
		label: 'Stable',
	},
	experimental: {
		wrapper: 'bg-[var(--status-experimental-bg)] text-[var(--status-experimental-text)]',
		dot: 'bg-[var(--status-experimental-dot)]',
		label: 'Experimental',
	},
	wip: {
		wrapper: 'bg-[var(--status-wip-bg)] text-[var(--status-wip-text)]',
		dot: 'bg-[var(--status-wip-dot)]',
		label: 'WIP',
	},
};

export default function ExperimentCard({ experiment }: { experiment: Experiment }) {
	const status = STATUS_STYLES[experiment.status];

	return (
		<div className="masonry-item">
			<Link
				to="/experiments/$slug"
				params={{ slug: experiment.slug }}
				className="experiment-card block rounded-2xl p-5 no-underline"
				aria-label={`View ${experiment.title} experiment`}
			>
				{/* Top row: status + date */}
				<div className="mb-3 flex items-center justify-between gap-2">
					<span
						className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.wrapper}`}
					>
						<span className={`h-1.5 w-1.5 rounded-full ${status.dot} animate-pulse`} />
						{status.label}
					</span>
					<span className="font-mono text-xs text-[var(--text-subtle)]">
						{new Date(experiment.addedAt).toLocaleDateString('en-US', {
							month: 'short',
							day: 'numeric',
							year: 'numeric',
						})}
					</span>
				</div>

				{/* Title */}
				<h2 className="mb-2 text-base font-bold leading-snug text-[var(--text)]">
					{experiment.title}
				</h2>

				{/* Description */}
				<p className="mb-4 text-sm leading-relaxed text-[var(--text-muted)]">
					{experiment.description}
				</p>

				{/* Tags */}
				<div className="mb-4 flex flex-wrap gap-1.5">
					{experiment.tags.map((tag) => (
						<span
							key={tag}
							className={`inline-block rounded-md border px-2 py-0.5 text-xs font-semibold ${TAG_STYLES[tag]}`}
						>
							{tag}
						</span>
					))}
				</div>

				{/* Footer: browser support + CTA */}
				<div className="flex items-center justify-between gap-2 border-t border-[var(--border)] pt-3">
					{experiment.browserSupport ? (
						<span className="truncate text-xs text-[var(--text-subtle)]">
							🌐 {experiment.browserSupport}
						</span>
					) : (
						<span />
					)}
					<span className="gradient-text shrink-0 text-sm font-bold">
						View Demo →
					</span>
				</div>
			</Link>
		</div>
	);
}
