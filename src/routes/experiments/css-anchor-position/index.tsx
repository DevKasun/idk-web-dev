import { createFileRoute } from "@tanstack/react-router";
import { experiments } from "../../../data/experiments";
import ExperimentLayout from "../../../components/ExperimentLayout";

export const Route = createFileRoute("/experiments/css-anchor-position/")({
    component: CssAnchorPosition,
});

function CssAnchorPosition() {
    const experiment = experiments.find(
        (e) => e.slug === "css-anchor-position",
    )!;
    return (
        <ExperimentLayout experiment={experiment} allExperiments={experiments}>
            <section className="py-4">
                <div className="exp-anchor w-64 h-64 bg-blue-500">Anchor</div>
                <div className="positioned-anchor-element absolute w-fit bg-amber-700">
                    Anchor El
                </div>
            </section>
        </ExperimentLayout>
    );
}
