import { createFileRoute } from "@tanstack/react-router";
import { experiments } from "../../data/experiments";
import ExperimentLayout from "../../components/ExperimentLayout";

export const Route = createFileRoute("/experiments/css-anchor-position")({
  component: CssAnchorPosition,
});

function CssAnchorPosition() {
  const experiment = experiments.find((e) => e.slug === "css-anchor-position")!;
  return (
    <ExperimentLayout experiment={experiment} allExperiments={experiments} />
  );
}
