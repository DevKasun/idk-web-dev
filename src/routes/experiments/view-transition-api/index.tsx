import { createFileRoute, Link } from "@tanstack/react-router";
import { experiments } from "../../../data/experiments";
import { blogPosts } from "../../../data/blog";
import ExperimentLayout from "../../../components/ExperimentLayout";

export const Route = createFileRoute("/experiments/view-transition-api/")({
    component: ViewTransitions,
});

function ViewTransitions() {
    const experiment = experiments.find((e) => e.slug === "view-transition-api")!;
    return (
        <ExperimentLayout
            experiment={experiment}
            allExperiments={experiments}
        >
            {blogPosts.length > 0 && (
                <section>
                    <h2 className="mb-4 text-xl font-bold text-(--text)">
                        Blog
                    </h2>
                    <div className="space-y-3">
                        {blogPosts.map((post) => (
                            <Link
                                key={post.slug}
                                to="/experiments/view-transition-api/blog/$slug"
                                params={{ slug: post.slug }}
                                viewTransition
                                className="experiment-card block rounded-xl p-4 no-underline"
                            >
                                <time 
                                    className="font-mono text-xs text-(--text-subtle)" 
                                    style={{ viewTransitionName: `blog-date-${post.slug}` }}
                                >
                                    {new Date(post.date).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </time>
                                <h3 
                                    className="mt-1 text-base font-bold text-(--text)" 
                                    style={{ viewTransitionName: `blog-title-${post.slug}` }}
                                >
                                    {post.title}
                                </h3>
                                <p className="mt-0.5 text-sm text-(--text-muted)">
                                    {post.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </ExperimentLayout>
    );
}
