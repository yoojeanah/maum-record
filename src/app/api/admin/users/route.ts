// app/api/admin/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const dummyUsers = [
    {
      id: 1,
      email: 'eugene@example.com',
      createdAt: '2024-12-01T10:30:00Z',
      journalCount: 14,
      positiveRate: 82,
      active: true,
    },
    {
      id: 2,
      email: 'calmuser@example.com',
      createdAt: '2025-01-10T14:15:00Z',
      journalCount: 7,
      positiveRate: 42,
      active: false,
    },
  ];

  return NextResponse.json(dummyUsers);
}