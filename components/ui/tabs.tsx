'use client'
import * as React from 'react'

export function Tabs({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
export function TabsList({ children }: { children: React.ReactNode }) {
  return <div className="flex space-x-2 my-2">{children}</div>
}
export function TabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
  return <button className="px-2 py-1 border rounded">{children}</button>
}
export function TabsContent({ value, children }: { value: string; children: React.ReactNode }) {
  return <div>{children}</div>
}
