import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export function FreePredictions() {
  const predictions = [
    { id: 1, game: 'Swertres', numbers: ['1', '2', '3'], confidence: 80 },
    { id: 2, game: '6/42', numbers: ['5', '12', '19', '23', '30', '42'], confidence: 65 }
  ]
  return (
    <div className="grid gap-4">
      {predictions.map((pred) => (
        <Card key={pred.id}>
          <CardHeader><CardTitle>{pred.game}</CardTitle></CardHeader>
          <CardContent>
            <p>Numbers: {pred.numbers.join(', ')}</p>
            <p>Confidence: {pred.confidence}%</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
