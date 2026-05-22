import type { Metadata } from 'next'
import { Outfit, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'Arquitectura de Máquinas 1 | UNI RUPAP Nicaragua',
    template: '%s | Arquitectura de Máquinas 1 · UNI',
  },
  description: 'Plataforma educativa interactiva para Arquitectura de Máquinas 1. Aprende microprocesadores Intel 8086, ensamblador, microcontroladores y Arduino con simuladores en tiempo real.',
  keywords: ['Arquitectura de Computadoras', 'EMU8086', 'Intel 8086', 'Ensamblador', 'Arduino', 'Microcontroladores', 'UNI Nicaragua', 'RUPAP', 'Ingeniería de Sistemas'],
  authors: [{ name: 'Universidad Nacional de Ingeniería (UNI)', url: 'https://www.uni.edu.ni' }],
  openGraph: {
    type: 'website',
    locale: 'es_NI',
    siteName: 'Arquitectura de Máquinas 1 — UNI Nicaragua',
    title: 'Arquitectura de Máquinas 1 | UNI RUPAP Nicaragua',
    description: 'Plataforma educativa interactiva: microprocesadores Intel 8086, ensamblador con EMU8086, microcontroladores y simulador de Arduino.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arquitectura de Máquinas 1 | UNI RUPAP',
    description: 'Aprende arquitectura de computadoras, EMU8086 y Arduino con simuladores interactivos.',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png',  media: '(prefers-color-scheme: dark)'  },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark bg-background scroll-smooth">
      <body className={`${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased text-foreground selection:bg-primary/30 selection:text-foreground`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

