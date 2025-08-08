'use client'
import * as React from 'react'

export function PaymentModal({ open, onClose, onSuccess }: { open: boolean; onClose: () => void; onSuccess: () => void }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-2">Payment</h2>
        <p>Simulated payment modal. Click confirm to proceed.</p>
        <div className="mt-4 space-x-2">
          <button className="px-4 py-2 bg-gray-200" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 bg-green-500 text-white" onClick={onSuccess}>Confirm</button>
        </div>
      </div>
    </div>
  )
}
