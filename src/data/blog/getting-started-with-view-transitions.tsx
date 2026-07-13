import type { BlogPost } from "./types";

const post: BlogPost = {
    slug: "getting-started-with-view-transitions",
    title: "Getting Started with View Transitions",
    date: "2026-06-01",
    description:
        "Learn the basics of the View Transition API and how to add smooth page transitions to your web app.",
    content: (
        <>
            <p>
                The View Transition API lets you animate between two DOM states —
                whether that's a page navigation or a DOM update — with a simple
                declarative API. No JavaScript animation library required.
            </p>
            <h2>Basic Usage</h2>
            <p>
                At its simplest, you wrap a DOM update in{" "}
                <code>document.startViewTransition()</code> and the browser
                handles the cross-fade:
            </p>
            <pre>
                <code>
                    {`document.startViewTransition(() => {
    // DOM update here
    document.querySelector("#content").innerHTML = newContent;
});`}
                </code>
            </pre>
            <p>
                The browser captures a screenshot before and after the callback,
                then cross-fades between them. That's it — you get a smooth
                transition for free.
            </p>
            <h2>Custom Animations</h2>
            <p>
                You can customise the transition with CSS <code>@keyframes</code>{" "}
                using the <code>::view-transition-old</code> and{" "}
                <code>::view-transition-new</code> pseudo-elements. This gives
                you full control over the animation timing, easing, and
                transforms.
            </p>
            <p>
                In the next post, we'll dive deeper into custom keyframes and
                multi-element transitions.
            </p>
        </>
    ),
};

export default post;
