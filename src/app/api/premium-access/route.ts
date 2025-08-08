import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userInfo = searchParams.get('userInfo') || ''
  // In a real app, check DB for premium status
  const hasAccess = userInfo === 'premium-user'
  return NextResponse.json({ hasAccess })
}
