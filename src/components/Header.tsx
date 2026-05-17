import { Link } from '@tanstack/react-router';
import ThemeToggle from './ThemeToggle';

export default function Header() {
	return (
		<header className='sticky top-0 z-50 border-b border-(--header-border) bg-(--header-bg) backdrop-blur'>
			<nav
				className='page-container flex items-center gap-4 py-3 sm:py-4'
				aria-label='Main navigation'
			>
				{/* Logo / wordmark */}
				<Link
					to='/'
					className='mr-4 flex items-center gap-2 no-underline'
					aria-label='IDK Web Lab — home'
				>
					<span className='hidden text-sm font-extrabold tracking-tight text-(--text) sm:block'>
						IDK Web Dev
					</span>
				</Link>

				{/* Nav links */}
				<div className='flex items-center gap-1'>
					<Link
						to='/'
						className='rounded-lg px-3 py-1.5 text-sm font-semibold text-(--text-muted) transition-colors hover:bg-(--surface) hover:text-(--text)'
						activeProps={{
							className:
								'rounded-lg px-3 py-1.5 text-sm font-semibold text-(--text) bg-(--surface)',
						}}
						activeOptions={{ exact: true }}
					>
						Experiments
					</Link>
					<Link
						to='/about'
						className='rounded-lg px-3 py-1.5 text-sm font-semibold text-(--text-muted) transition-colors hover:bg-(--surface) hover:text-(--text)'
						activeProps={{
							className:
								'rounded-lg px-3 py-1.5 text-sm font-semibold text-[var(--text)] bg-[var(--surface)]',
						}}
					>
						About
					</Link>
				</div>

				{/* Spacer */}
				<div className='ml-auto' />

				{/* Theme toggle */}
				<ThemeToggle />
			</nav>
		</header>
	);
}
