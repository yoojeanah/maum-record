import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    courses: [
      {
        id: 1,
        title: "코스 1",
        summary: "업데이트 예정입니다.",
        locked: true,
        poses: [],
      },
      {
        id: 2,
        title: "코스 2",
        summary: "업데이트 예정입니다.",
        locked: true,
        poses: [],
      },
      {
        id: 3,
        title: "코스 3",
        summary: "업데이트 예정입니다.",
        locked: true,
        poses: [],
      },
      {
        id: 4,
        title: "코스 4",
        summary: "업데이트 예정입니다.",
        locked: true,
        poses: [],
      },
      {
        id: 5,
        title: "코스 5",
        summary: "업데이트 예정입니다.",
        locked: true,
        poses: [],
      },
      {
        id: 6,
        title: "코스 6",
        summary: "업데이트 예정입니다.",
        locked: true,
        poses: [],
      },
      {
        id: 7,
        title: "코스 7",
        summary: "업데이트 예정입니다.",
        locked: true,
        poses: [],
      },
      {
        id: 8,
        title: "코스 8",
        summary: "업데이트 예정입니다.",
        locked: true,
        poses: [],
      },
      {
        id: 9,
        title: "코스 9",
        summary: "업데이트 예정입니다.",
        locked: true,
        poses: [],
      },
    ]
  });
}
