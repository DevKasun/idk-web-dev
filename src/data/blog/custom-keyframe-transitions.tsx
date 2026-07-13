import type { BlogPost } from "./types";

const post: BlogPost = {
    slug: "custom-keyframe-transitions",
    title: "Custom Keyframe Transitions in Depth",
    date: "2026-06-08",
    description:
        "Go beyond the default cross-fade with custom CSS keyframe animations for View Transitions.",
    content: (
        <>
            <p>
                The default cross-fade is nice, but the real power of the View
                Transition API comes from custom keyframe animations. You can
                slide, scale, and transform elements independently.
            </p>
            <h2>Targeting Elements</h2>
            <p>
                Give an element a <code>view-transition-name</code> in CSS to
                isolate it from the default cross-fade:
            </p>
            <pre>
                <code>
                    {`.card {
    view-transition-name: card;
}`}
                </code>
            </pre>
            <p>
                Now you can animate just that element with its own keyframes:
            </p>
            <pre>
                <code>
                    {`::view-transition-old(card) {
    animation: slide-out 0.3s ease-out forwards;
}
::view-transition-new(card) {
    animation: slide-in 0.3s ease-in forwards;
}

@keyframes slide-out {
    to { transform: translateX(-100%); opacity: 0; }
}
@keyframes slide-in {
    from { transform: translateX(100%); opacity: 0; }
}`}
                </code>
            </pre>
            <p>
                This pattern is excellent for list rearrangements, image
                galleries, and page transitions.
            </p>
        </>
    ),
};

export default post;
