import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Innovation Screener - AI-Powered Innovation Assessment',
  description: 'Comprehensive AI-powered platform for evaluating and screening innovative ideas using advanced language models and evaluation metrics.',
  keywords: ['innovation', 'AI', 'evaluation', 'screening', 'assessment', 'capstone'],
  authors: [{ name: 'Sneha Maurya' }],
  openGraph: {
    title: 'Innovation Screener - AI-Powered Innovation Assessment',
    description: 'Comprehensive AI-powered platform for evaluating and screening innovative ideas.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-butterYellow/30 via-white to-darkGreen/10">
          {children}
        </div>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
