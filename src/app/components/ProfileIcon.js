"use client";
import Image from "next/image";

export default function ProfileIcon() {
  return (
    <Image
      src="/profile-default.png"
      alt="프로필"
      width={48}
      height={48}
      className="absolute top-4 right-4 w-12 h-12 rounded-full border bg-white object-cover z-20"
      onError={(e) => {
        e.currentTarget.src = "/profile-default.png";
      }}
    />
  );
}
