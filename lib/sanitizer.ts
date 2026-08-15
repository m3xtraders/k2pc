import sanitize from "sanitize-html";

export function sanitizeHtml(html: string): string {
  if (!html) return "";
  return sanitize(html, {
    allowedTags: [
      "h1", "h2", "h3", "h4", "h5", "h6",
      "p", "b", "i", "strong", "em", "strike", "code", "pre",
      "ul", "ol", "li", "span", "div", "blockquote",
      "a", "img", "table", "thead", "tbody", "tr", "th", "td", "br", "hr"
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      "*": ["class"],
    },
  });
}
