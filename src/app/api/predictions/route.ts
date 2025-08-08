import { NextResponse } from 'next/server'

export async function GET() {
  const predictions = [
    { id: '1', game: 'Swertres', draw: 'Morning', numbers: ['1', '2', '3'], algorithm: 'AI-Model', confidence: 80, createdAt: new Date().toISOString() },
    { id: '2', game: '6/42', draw: 'Evening', numbers: ['5', '12', '19', '23', '30', '42'], algorithm: 'AI-Model', confidence: 65, createdAt: new Date().toISOString() }
  ]
  return NextResponse.json(predictions)
}
