// GaneshaIcon.jsx
export default function GaneshaIcon({ className = "w-6 h-6" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simplified abstract Ganesha symbol */}
      <path d="M32 2c6 8 14 10 14 18s-6 12-6 20 8 14 2 22-14-2-14-8-6 10-14 8-2-14 2-22-6-12-6-20S26 10 32 2z" />
    </svg>
  );
}
