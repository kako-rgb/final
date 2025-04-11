import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    // Mock data structure for home page
    const data = {
      products: Array(8).fill({ 
        id: 1, 
        name: 'Product',
        price: 100,
        image: '/product.jpg' 
      }),
      services: Array(8).fill({ 
        id: 1, 
        name: 'Service',
        price: 50,
        image: '/service.jpg'
      }),
      stores: Array(3).fill({ 
        id: 1, 
        name: 'Store',
        rating: 4.5,
        image: '/store.jpg'
      }),
      categories: []
    };

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      },
    });
  } catch (error) {
    console.error('Home API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}