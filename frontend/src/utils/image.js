// utils/image.js
// export const resolveImageUrl = (src, category, subCategory) => {
//   if (!src) return "https://via.placeholder.com/800x600?text=No+Image";
//   if (src.startsWith("http")) return src;
//   return `http://localhost:9494${src}`;// adjust if your backend serves differently
// };

// utils/image.js
// export function resolveImageUrl(path) {
//   if (!path) return "https://via.placeholder.com/800x600?text=No+Image";

//   // If already an absolute URL (http/https), return as-is
//   if (typeof path === "string" && (path.startsWith("http://") || path.startsWith("https://"))) {
//     return path;
//   }

//   // Otherwise prefix with backend
//   return `http://localhost:8080/${path.replace(/^\/+/, "")}`;
// }

export function resolveImageUrl(path) {
  if (!path) return "https://via.placeholder.com/800x600?text=No+Image";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `http://localhost:9494/${path.replace(/^\/+/, "")}`;
}
