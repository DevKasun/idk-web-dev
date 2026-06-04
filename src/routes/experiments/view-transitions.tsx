import { createFileRoute } from "@tanstack/react-router";
import { experiments } from "../../data/experiments";
import ExperimentLayout from "../../components/ExperimentLayout";

export const Route = createFileRoute("/experiments/view-transitions")({
  component: ViewTransitions,
});

function ViewTransitions() {
  const experiment = experiments.find((e) => e.slug === "view-transitions")!;
  return (
    <ExperimentLayout experiment={experiment} allExperiments={experiments} />
  );
}
