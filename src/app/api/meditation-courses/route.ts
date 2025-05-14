// 백엔드 연동 후 삭제
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    courses: [
      {
        id: 1,
        title: "코스 1",
        summary: "업데이트 예정입니다.",
        locked: true,
      },
      {
        id: 2,
        title: "코스 2",
        summary: "업데이트 예정입니다.",
        locked: true,
      },
      {
        id: 3,
        title: "코스 3",
        summary: "업데이트 예정입니다.",
        locked: true,
      },
    ]
  });
}
