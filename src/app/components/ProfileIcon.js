"use client";

export default function ProfileIcon() {
  return (
    <img
      src="/profile-default.png"
      alt="프로필"
      className="absolute top-4 right-4 w-12 h-12 rounded-full border bg-white object-cover z-20"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "/profile-default.png";
      }}
    />
  );
}
