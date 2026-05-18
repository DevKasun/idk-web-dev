'use client';

import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import ExperimentCard from '../components/ExperimentCard';
import { experiments, type ExperimentTag } from '../data/experiments';

export const Route = createFileRoute('/')({ component: HomePage });

type FilterTag = 'All' | ExperimentTag;
const FILTER_TAGS: FilterTag[] = ['All', 'CSS', 'HTML', 'JS', 'API'];

function HomePage() {
	const [activeFilter, setActiveFilter] = useState<FilterTag>('All');

	const filtered =
		activeFilter === 'All'
			? experiments
			: experiments.filter((e) =>
					e.tags.includes(activeFilter as ExperimentTag),
				);

	return (
		<main>
			{/* ─── Hero ───────────────────────────────────────────────── */}
			<section className='relative overflow-hidden border-b border-(--border) py-16 sm:py-20'>
				{/* Gradient orbs */}
				<div className='hero-orb hero-orb-1' aria-hidden='true' />
				<div className='hero-orb hero-orb-2' aria-hidden='true' />
				<div className='hero-orb hero-orb-3' aria-hidden='true' />

				<div className='page-container relative z-10'>
					{/* Eyebrow */}
					<div className='mb-4 inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--surface) px-3 py-1 text-xs font-semibold text-(--text-muted) backdrop-blur'>
						<span className='h-2 w-2 rounded-full bg-(--accent-start) animate-pulse' />
						Experimenting with modern web technologies
					</div>

					{/* Headline */}
					<h1 className='mb-4 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl'>
						IDK <span className='gradient-text'>Web Dev</span>
						<span className='cursor-blink' aria-hidden='true' />
					</h1>

					{/* Sub */}
					<p className='max-w-xl text-base leading-relaxed text-(--text-muted) sm:text-lg'>
						A curated collection of interactive experiments
						exploring the bleeding edge of{' '}
						<strong className='font-semibold text-(--text)'>
							CSS
						</strong>
						,{' '}
						<strong className='font-semibold text-(--text)'>
							HTML
						</strong>
						, and{' '}
						<strong className='font-semibold text-(--text)'>
							JavaScript
						</strong>{' '}
						— built to be seen, not just read about.
					</p>

					{/* Stats bar */}
					<div className='mt-8 flex flex-wrap gap-6'>
						<Stat value={experiments.length} label='Experiments' />
						<Stat
							value={
								experiments.filter((e) => e.status === 'stable')
									.length
							}
							label='Stable'
						/>
						<Stat
							value={
								experiments.filter(
									(e) => e.status === 'experimental',
								).length
							}
							label='Experimental'
						/>
					</div>
				</div>
			</section>

			{/* ─── Filter + Gallery ───────────────────────────────────── */}
			<section className='page-container py-10'>
				{/* Filter bar */}
				<div
					className='mb-8 flex flex-wrap items-center gap-2'
					role='group'
					aria-label='Filter experiments by tag'
				>
					<span className='mr-1 text-sm font-semibold text-(--text-muted)'>
						Filter:
					</span>
					{FILTER_TAGS.map((tag) => (
						<button
							key={tag}
							type='button'
							id={`filter-${tag.toLowerCase()}`}
							onClick={() => setActiveFilter(tag)}
							className={`filter-pill rounded-full border border-(--border) px-4 py-1.5 text-sm font-semibold text-(--text-muted) ${
								activeFilter === tag
									? 'is-active'
									: 'bg-(--surface) hover:border-(--border-hover)'
							}`}
							aria-pressed={activeFilter === tag}
						>
							{tag}
						</button>
					))}

					{/* Result count */}
					<span className='ml-auto text-sm text-(--text-subtle)'>
						{filtered.length}{' '}
						{filtered.length === 1 ? 'experiment' : 'experiments'}
					</span>
				</div>

				{/* Masonry gallery */}
				{filtered.length > 0 ? (
					<div className='masonry-grid'>
						{filtered.map((experiment) => (
							<ExperimentCard
								key={experiment.slug}
								experiment={experiment}
							/>
						))}
					</div>
				) : (
					<EmptyState tag={activeFilter} />
				)}
			</section>
		</main>
	);
}

function Stat({ value, label }: { value: number; label: string }) {
	return (
		<div className='flex items-baseline gap-1.5'>
			<span className='gradient-text text-2xl font-extrabold'>
				{value}
			</span>
			<span className='text-sm text-(--text-muted)'>{label}</span>
		</div>
	);
}

function EmptyState({ tag }: { tag: FilterTag }) {
	return (
		<div className='flex flex-col items-center gap-3 py-20 text-center'>
			<span className='text-4xl'>🔬</span>
			<p className='text-lg font-semibold text-(--text)'>
				No {tag} experiments yet
			</p>
			<p className='text-sm text-(--text-muted)'>
				Check back soon — new experiments drop regularly.
			</p>
		</div>
	);
}
