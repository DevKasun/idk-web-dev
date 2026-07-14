import { createFileRoute, Link } from "@tanstack/react-router";
import { blogPosts } from "../../../../data/blog";

export const Route = createFileRoute("/experiments/view-transition-api/blog/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <main className="page-container py-10">
            <nav className="mb-6 flex items-center gap-2 text-sm text-(--text-muted)" aria-label="Breadcrumb">
                <Link to="/" className="hover:text-(--text) transition-colors">Home</Link>
                <span aria-hidden="true">›</span>
                <Link to="/experiments/view-transition-api" className="hover:text-(--text) transition-colors">
                    View Transition API
                </Link>
                <span aria-hidden="true">›</span>
                <span className="text-(--text)">Blog</span>
            </nav>

            <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-(--text) sm:text-4xl">
                Blog
            </h1>
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-(--text-muted)">
                Thoughts, tutorials, and deep dives on the View Transition API.
            </p>

            {blogPosts.length > 0 ? (
                <div className="space-y-6">
                    {blogPosts.map((post) => (
                        <Link
                            key={post.slug}
                            to="/experiments/view-transition-api/blog/$slug"
                            params={{ slug: post.slug }}
                            className="experiment-card block rounded-2xl p-5 no-underline"
                        >
                            <time className="font-mono text-xs text-(--text-subtle)">
                                {new Date(post.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </time>
                            <h2 className="mb-1 mt-1 text-lg font-bold text-(--text)">
                                {post.title}
                            </h2>
                            <p className="text-sm leading-relaxed text-(--text-muted)">
                                {post.description}
                            </p>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center gap-3 py-20 text-center">
                    <p className="text-lg font-semibold text-(--text)">
                        No posts yet
                    </p>
                    <p className="text-sm text-(--text-muted)">
                        Check back soon for new content.
                    </p>
                </div>
            )}
        </main>
    );
}
