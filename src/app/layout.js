import { Inter } from 'next/font/google'
import Providers from '@/components/providers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'DiDi',
  description: 'Your app description here',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}