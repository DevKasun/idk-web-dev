import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { experiments } from "../../data/experiments";
import ExperimentLayout from "../../components/ExperimentLayout";

export const Route = createFileRoute("/experiments/$slug")({
  loader: ({ params }) => {
    const experiment = experiments.find((e) => e.slug === params.slug);
    if (!experiment) throw notFound();
    return { experiment };
  },
  component: ExperimentPage,
  notFoundComponent: () => (
    <main className="page-container py-20 text-center">
      <p className="text-4xl">🔭</p>
      <h1 className="mt-4 text-2xl font-bold text-(--text)">
        Experiment not found
      </h1>
      <Link
        to="/"
        className="mt-4 inline-block text-sm text-(--text-muted) underline"
      >
        ← Back to gallery
      </Link>
    </main>
  ),
});

function ExperimentPage() {
  const { experiment } = Route.useLoaderData();
  return (
    <ExperimentLayout experiment={experiment} allExperiments={experiments} />
  );
}
