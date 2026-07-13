import type { BlogPost } from "./types";

const post: BlogPost = {
    slug: "cross-document-navigations",
    title: "Cross-Document View Transitions (SPA & MPA)",
    date: "2026-06-15",
    description:
        "How to use View Transitions across page navigations in both single-page and multi-page apps.",
    content: (
        <>
            <p>
                View Transitions aren't limited to in-page DOM updates. You can
                also use them across full page navigations — both in SPAs and
                traditional MPAs.
            </p>
            <h2>Same-Document (SPA)</h2>
            <p>
                In a framework like React, wrap your route change in a view
                transition. This works especially well with routers that give
                you navigation hooks.
            </p>
            <h2>Cross-Document (MPA)</h2>
            <p>
                For multi-page apps, add the following meta tag to enable
                cross-document view transitions:
            </p>
            <pre>
                <code>
                    {`<meta name="view-transition" content="same-origin" />`}
                </code>
            </pre>
            <p>
                With that single tag, the browser will animate between pages on
                the same origin using the View Transition API — no JavaScript
                required.
            </p>
            <p>
                Combine this with shared elements (same{" "}
                <code>view-transition-name</code> on both pages) for seamless
                hero-image or header transitions.
            </p>
        </>
    ),
};

export default post;
