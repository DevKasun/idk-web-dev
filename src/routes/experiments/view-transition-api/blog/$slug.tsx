import { createFileRoute, Link } from "@tanstack/react-router";
import { blogPosts } from "../../../../data/blog";

export const Route = createFileRoute(
    "/experiments/view-transition-api/blog/$slug",
)({
    loader: ({ params }) => {
        const post = blogPosts.find((p) => p.slug === params.slug);
        if (!post) {
            throw new Error("Post not found");
        }
        return post;
    },
    component: RouteComponent,
    notFoundComponent: () => (
        <main className="page-container py-10">
            <div className="flex flex-col items-center gap-4 py-20 text-center">
                <p className="text-lg font-semibold text-(--text)">
                    Post not found
                </p>
                <Link
                    to="/experiments/view-transition-api/blog"
                    className="text-sm text-(--text-muted) hover:text-(--text) underline transition-colors"
                >
                    ← Back to blog
                </Link>
            </div>
        </main>
    ),
});

function RouteComponent() {
    const post = Route.useLoaderData();

    return (
        <main className="page-container py-10">
            <nav className="mb-6 flex items-center gap-2 text-sm text-(--text-muted)" aria-label="Breadcrumb">
                <Link to="/" className="hover:text-(--text) transition-colors">Home</Link>
                <span aria-hidden="true">›</span>
                <Link to="/experiments/view-transition-api" className="hover:text-(--text) transition-colors">
                    View Transition API
                </Link>
                <span aria-hidden="true">›</span>
                <Link to="/experiments/view-transition-api/blog" className="hover:text-(--text) transition-colors">
                    Blog
                </Link>
                <span aria-hidden="true">›</span>
                <span className="text-(--text)">{post.title}</span>
            </nav>

            <article>
                <time className="font-mono text-xs text-(--text-subtle)">
                    {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}
                </time>
                <h1 className="mb-6 mt-2 text-3xl font-extrabold tracking-tight text-(--text) sm:text-4xl">
                    {post.title}
                </h1>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    {post.content}
                </div>
            </article>

            <div className="mt-10 border-t border-(--border) pt-6">
                <Link
                    to="/experiments/view-transition-api/blog"
                    className="text-sm text-(--text-muted) hover:text-(--text) transition-colors"
                >
                    ← Back to blog
                </Link>
            </div>
        </main>
    );
}
