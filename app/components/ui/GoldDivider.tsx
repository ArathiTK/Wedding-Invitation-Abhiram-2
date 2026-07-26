export default function GoldDivider({ className = "", color = "#c9a876" }: { className?: string; color?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="flex-1 h-px" style={{ backgroundColor: `${color}66` }} />
      <svg width="10" height="10" viewBox="0 0 24 24" fill={color} opacity="0.8">
        <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
      </svg>
      <div className="flex-1 h-px" style={{ backgroundColor: `${color}66` }} />
    </div>
  );
}
