import "server-only";

import sanitizeHtml from "sanitize-html";

// Article HTML written in the admin panel's rich text editor (TinyMCE).
// Sanitized again here before rendering, with the same allowlist the admin
// applies on save (msl_biotech-admin/lib/html.ts — keep the two in step).
// Anything not listed (scripts, iframes, styles, forms, event handlers) is
// removed, and images must come from the Sanity CDN.

const options: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "br", "h2", "h3", "h4", "strong", "b", "em", "i", "u", "s", "blockquote", "ul", "ol", "li",
    "a", "img", "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "hr", "code", "pre",
    "span", "sub", "sup",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel", "title"],
    img: ["src", "alt", "width", "height", "loading", "decoding"],
    td: ["colspan", "rowspan"],
    th: ["colspan", "rowspan", "scope"],
    code: ["class"],
    pre: ["class"],
    "*": ["style"],
  },
  allowedStyles: { "*": { "text-align": [/^(left|right|center|justify)$/] } },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: { img: ["https"] },
  allowProtocolRelative: false,
  transformTags: {
    // One H1 per page: the article title.
    h1: "h2",
    h5: "h4",
    h6: "h4",
    // External links open in a new tab without access to this page.
    a: (tagName, attribs) => {
      const external = /^https?:\/\//i.test(attribs.href ?? "");
      return {
        tagName,
        attribs: external ? { ...attribs, target: "_blank", rel: "noopener noreferrer" } : { ...attribs, target: "", rel: "" },
      };
    },
    // Article images load lazily (they are below the cover image).
    img: (tagName, attribs) => ({ tagName, attribs: { ...attribs, loading: "lazy", decoding: "async" } }),
  },
  exclusiveFilter: (frame) =>
    frame.tag === "img" && !/^https:\/\/cdn\.sanity\.io\//.test(frame.attribs.src ?? ""),
};

export function sanitizeArticleHtml(html: string) {
  return sanitizeHtml(html, options).replace(/\s(target|rel)=""/g, "");
}

/** Visible text, for reading time. */
export function htmlText(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}
