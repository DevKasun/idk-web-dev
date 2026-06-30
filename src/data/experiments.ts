export type ExperimentStatus = "stable" | "experimental" | "wip";
export type ExperimentTag = "CSS" | "HTML" | "JS" | "API";

export interface Experiment {
    slug: string;
    title: string;
    description: string;
    tags: ExperimentTag[];
    status: ExperimentStatus;
    addedAt: string;
    browserSupport?: string;
}

export const experiments: Experiment[] = [
    {
        slug: "view-transition-api",
        title: "View Transition API",
        description:
            "Animate between DOM states and page navigations with buttery-smooth cross-fades and custom keyframe transitions — zero JS animation library needed.",
        tags: ["API", "CSS"],
        status: "stable",
        addedAt: "2026-05-17",
        browserSupport: "Chrome 111+, Safari 18+, Firefox 130+",
    },
    {
        slug: "css-anchor-position",
        title: "CSS Anchor Position",
        description:
            "Position elements relative to other elements with declarative CSS — no JS positioning math required.",
        tags: ["CSS"],
        status: "stable",
        addedAt: "2026-06-02",
        browserSupport: "Chrome 125+, Safari 26.0+, Firefox 147+",
    },
    // 👇 Add more experiments here — each entry auto-renders a card on the homepage.
];
