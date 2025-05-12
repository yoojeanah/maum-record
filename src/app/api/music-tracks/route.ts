import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: 1,
      src: "/music/1.mp3"
    },
    {
      id: 2,
      src: "/music/2.mp3"
    },
    {
      id: 3,
      src: "/music/3.mp3"
    }
  ]);
}
