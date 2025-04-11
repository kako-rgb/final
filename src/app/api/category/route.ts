import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Replace with your actual data fetching logic
    const categories = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
    ];

    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}