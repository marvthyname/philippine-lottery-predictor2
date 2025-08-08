'use client'
import { useState, useEffect } from 'react'

// TEMP stubs for missing components — replace with your real ShadCN/UI components later
const Tabs = ({ children }: any) => <div>{children}</div>
const TabsList = ({ children }: any) => <div>{children}</div>
const TabsTrigger = ({ children }: any) => <button>{children}</button>
const TabsContent = ({ children }: any) => <div>{children}</div>
const Alert = ({ children }: any) => <div style={{ border: '1px solid red', padding: '8px' }}>{children}</div>
const AlertDescription = ({ children }: any) => <p>{children}</p>
const PaymentModal = ({ open, onClose, onSuccess }: any) =>
  open ? <div style={{ background: '#fff' }}>Payment Modal <button onClick={onSuccess}>OK</button></div> : null

// TEMP stubs for app-specific components
const LotteryResults = ({ results, loading }: any) => <div>Lottery Results ({loading ? 'Loading...' : results.length})</div>
const FreePredictions = () => <div>Free Predictions Component</div>
const PremiumSwertres = ({ onSubscribe }: any) => <div>Premium Swertres <button onClick={onSubscribe}>Subscribe</button></div>
const StatsDashboard = () => <div>Stats Dashboard</div>
const InstallPrompt = () => <div>Install Prompt</div>

// Safe JSON helper to avoid SyntaxError
async function safeJson(response: Response) {
  try {
    const text = await response.text()
    return text ? JSON.parse(text) : null
  } catch {
    return null
  }
}

import { sdk } from '@farcaster/miniapp-sdk'

interface LotteryResult {
  id: string
  timestamp: string
  date: string
  game: string
  draw: string
  ballNumbers: string[] | string
  jackpot?: string
  winners?: string
}

interface Prediction {
  id: string
  game: string
  draw: string
  numbers: string[] | string
  algorithm: string
  confidence: number
  createdAt: string
}

export default function PhilippineLotteryPredictor(): JSX.Element {
  useEffect(() => {
    const initializeFarcaster = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 100))
        if (document.readyState !== 'complete') {
          await new Promise(resolve => {
            if (document.readyState === 'complete') {
              resolve(void 0)
            } else {
              window.addEventListener('load', () => resolve(void 0), { once: true })
            }
          })
        }
        await sdk.actions.ready()
        console.log('Farcaster SDK initialized successfully - app fully loaded')
      } catch (error) {
        console.error('Failed to initialize Farcaster SDK:', error)
        setTimeout(async () => {
          try {
            await sdk.actions.ready()
            console.log('Farcaster SDK initialized on retry')
          } catch (retryError) {
            console.error('Farcaster SDK retry failed:', retryError)
          }
        }, 1000)
      }
    }

    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js')
          console.log('PWA: Service Worker registered successfully:', registration.scope)
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'activated') {
                  console.log('PWA: New version available! Please refresh.')
                }
              })
            }
          })
        } catch (error) {
          console.error('PWA: Service Worker registration failed:', error)
        }
      } else {
        console.log('PWA: Service Worker not supported in this browser')
      }
    }

    initializeFarcaster()
    registerServiceWorker()
  }, [])

  const [results, setResults] = useState<LotteryResult[]>([])
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [loading, setLoading] = useState(true)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false)

  useEffect(() => {
    fetchData()
    checkPremiumAccess()
  }, [])

  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true)
      const resultsResponse = await fetch('/api/lottery-results')
      if (resultsResponse.ok) {
        const resultsData = await safeJson(resultsResponse)
        setResults(resultsData || [])
      }
      const predictionsResponse = await fetch('/api/predictions')
      if (predictionsResponse.ok) {
        const predictionsData = await safeJson(predictionsResponse)
        setPredictions(predictionsData || [])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkPremiumAccess = async (): Promise<void> => {
    try {
      const userInfo = localStorage.getItem('userInfo') || ''
      if (!userInfo) return
      const response = await fetch(`/api/premium-access?userInfo=${encodeURIComponent(userInfo)}`)
      if (response.ok) {
        const data = await safeJson(response)
        setHasPremiumAccess(!!data?.hasAccess)
      }
    } catch (error) {
      console.error('Error checking premium access:', error)
    }
  }

  const handlePaymentSuccess = (): void => {
    setShowPaymentModal(false)
    checkPremiumAccess()
  }

  return (
    <main>
      <header>
        <h1>Philippine Lottery Predictor</h1>
        <p>AI-Powered predictions for PCSO lottery games</p>
      </header>

      <section>
        <Alert>
          <AlertDescription>
            Disclaimer: Lottery predictions are based on statistical analysis and do not guarantee winning results. Please gamble responsibly.
          </AlertDescription>
        </Alert>

        <Tabs>
          <TabsList>
            <TabsTrigger value="free">Free Predictions</TabsTrigger>
            <TabsTrigger value="premium">Premium Swertres</TabsTrigger>
            <TabsTrigger value="results">Latest Results</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="free">
            <FreePredictions />
          </TabsContent>

          <TabsContent value="premium">
            <PremiumSwertres onSubscribe={() => setShowPaymentModal(true)} />
          </TabsContent>

          <TabsContent value="results">
            <LotteryResults results={results} loading={loading} />
          </TabsContent>

          <TabsContent value="stats">
            <StatsDashboard />
          </TabsContent>
        </Tabs>

        <PaymentModal
          open={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      </section>

      <InstallPrompt />
    </main>
  )
}

