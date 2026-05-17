import { Link } from '@tanstack/react-router';
import ThemeToggle from './ThemeToggle';

export default function Header() {
	return (
		<header className="sticky top-0 z-50 border-b border-[var(--header-border)] bg-[var(--header-bg)] backdrop-blur-lg">
			<nav
				className="page-container flex items-center gap-4 py-3 sm:py-4"
				aria-label="Main navigation"
			>
				{/* Logo / wordmark */}
				<Link
					to="/"
					className="mr-4 flex items-center gap-2 no-underline"
					aria-label="The Web Lab — home"
				>
					<span
						className="flex h-7 w-7 items-center justify-center rounded-lg text-sm font-black text-white"
						style={{ background: 'var(--accent-gradient)' }}
						aria-hidden="true"
					>
						⚗
					</span>
					<span className="hidden text-sm font-extrabold tracking-tight text-[var(--text)] sm:block">
						The Web Lab
					</span>
				</Link>

				{/* Nav links */}
				<div className="flex items-center gap-1">
					<Link
						to="/"
						className="rounded-lg px-3 py-1.5 text-sm font-semibold text-[var(--text-muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text)]"
						activeProps={{ className: 'rounded-lg px-3 py-1.5 text-sm font-semibold text-[var(--text)] bg-[var(--surface)]' }}
						activeOptions={{ exact: true }}
					>
						Experiments
					</Link>
					<Link
						to="/about"
						className="rounded-lg px-3 py-1.5 text-sm font-semibold text-[var(--text-muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text)]"
						activeProps={{ className: 'rounded-lg px-3 py-1.5 text-sm font-semibold text-[var(--text)] bg-[var(--surface)]' }}
					>
						About
					</Link>
				</div>

				{/* Spacer */}
				<div className="ml-auto" />

				{/* Theme toggle */}
				<ThemeToggle />
			</nav>
		</header>
	);
}
