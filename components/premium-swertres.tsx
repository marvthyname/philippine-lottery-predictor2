import * as React from 'react'
import { Button } from './ui/button'

export function PremiumSwertres({ onSubscribe }: { onSubscribe: () => void }) {
  return (
    <div>
      <p>Subscribe to view premium Swertres predictions.</p>
      <Button onClick={onSubscribe}>Subscribe Now</Button>
    </div>
  )
}
