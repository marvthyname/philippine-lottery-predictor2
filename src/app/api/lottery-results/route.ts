import { NextResponse } from 'next/server'

export async function GET() {
  const results = [
    { id: '1', game: 'Swertres', draw: 'Morning', ballNumbers: ['1', '2', '3'], jackpot: 'P5,000', winners: '12' },
    { id: '2', game: '6/42', draw: 'Evening', ballNumbers: ['5', '12', '19', '23', '30', '42'], jackpot: 'P15M', winners: '1' }
  ]
  return NextResponse.json(results)
}
