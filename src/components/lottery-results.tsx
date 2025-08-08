import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export function LotteryResults({ results, loading }: { results: any[], loading: boolean }) {
  if (loading) return <p>Loading results...</p>
  return (
    <div className="grid gap-4">
      {results.map((res) => (
        <Card key={res.id}>
          <CardHeader><CardTitle>{res.game} - {res.draw}</CardTitle></CardHeader>
          <CardContent>
            <p>{Array.isArray(res.ballNumbers) ? res.ballNumbers.join(', ') : res.ballNumbers}</p>
            {res.jackpot && <p>Jackpot: {res.jackpot}</p>}
            {res.winners && <p>Winners: {res.winners}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
