import type { BlogPost } from "./types";
export type { BlogPost };

const modules = import.meta.glob<{ default: BlogPost }>("./*.tsx", {
    eager: true,
    import: "default",
});

export const blogPosts: BlogPost[] = Object.values(modules);
