import * as React from 'react'

export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">{children}</span>
}
