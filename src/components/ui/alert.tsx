import * as React from 'react'

export function Alert({ children }: { children: React.ReactNode }) {
  return <div className="border-l-4 border-yellow-500 bg-yellow-50 p-2">{children}</div>
}
export function AlertDescription({ children }: { children: React.ReactNode }) {
  return <div className="text-sm">{children}</div>
}
