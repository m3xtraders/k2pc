import DOMPurify from "isomorphic-dompurify";

export function sanitizeHtml(html: string): string {
  if (!html) return "";
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "h1", "h2", "h3", "h4", "h5", "h6",
      "p", "b", "i", "strong", "em", "strike", "code", "pre",
      "ul", "ol", "li", "span", "div", "blockquote",
      "a", "img", "table", "thead", "tbody", "tr", "th", "td", "br", "hr"
    ],
    ALLOWED_ATTR: ["href", "target", "src", "alt", "title", "class", "rel", "width", "height"],
  });
}
