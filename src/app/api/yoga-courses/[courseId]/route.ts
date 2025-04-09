import { NextResponse } from "next/server";

// 전체 코스 데이터
const coursesData = [
  {
    id: 1,
    title: "코스 1",
    summary: "업데이트 예정입니다.",
    locked: true,
    poses: []
  },
  {
    id: 2,
    title: "코스 2",
    summary: "업데이트 예정입니다.",
    locked: true,
    poses: []
  },
  {
    id: 3,
    title: "코스 3",
    summary: "업데이트 예정입니다.",
    locked: true,
    poses: []
  },
  {
    id: 4,
    title: "코스 4",
    summary: "업데이트 예정입니다.",
    locked: true,
    poses: []
  },
  {
    id: 5,
    title: "코스 5",
    summary: "업데이트 예정입니다.",
    locked: true,
    poses: []
  },
  {
    id: 6,
    title: "코스 6",
    summary: "업데이트 예정입니다.",
    locked: true,
    poses: []
  },
  {
    id: 7,
    title: "코스 7",
    summary: "업데이트 예정입니다.",
    locked: true,
    poses: []
  },
  {
    id: 8,
    title: "코스 8",
    summary: "업데이트 예정입니다.",
    locked: true,
    poses: []
  },
  {
    id: 9,
    title: "코스 9",
    summary: "업데이트 예정입니다.",
    locked: true,
    poses: []
  }
];

// GET 요청 처리 (코스 개별 요청용)
export async function GET(
  _req: Request,
  { params }: { params: { courseId: string } }
) {
  const id = parseInt(params.courseId, 10);
  const course = coursesData.find((course) => course.id === id);

  if (course) {
    return NextResponse.json(course);
  } else {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }
}
