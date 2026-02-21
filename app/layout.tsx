import type React from "react"
import type { Metadata, Viewport } from "next"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#ffffff",
}

export const metadata: Metadata = {
  title: {
    default: "CattleOS - AI-Powered Cattle Management Software for Ranchers & Feedlots",
    template: "%s | CattleOS"
  },
  description: "CattleOS is the AI-native cattle management platform for ranchers, feedlots, and cattle operations. Track costs in real-time, manage inventory, optimize feeding, and know your break-even point instantly. Integrates with scales, QuickBooks, and IoT devices. Starting at $99/month.",
  keywords: [
    "cattle management software",
    "cattle inventory management",
    "feedlot management system",
    "ranch management software",
    "cattle tracking software",
    "livestock management",
    "beef cattle software",
    "cattle cost tracking",
    "feedlot software",
    "ranch inventory software",
    "cattle weighing software",
    "livestock record keeping",
    "cattle herd management",
    "ranching software",
    "cattle feeding software",
    "livestock tracking",
    "cattle cost of gain",
    "beef production software",
    "cattle AI software",
    "smart cattle management",
    "cattle farm management",
    "livestock AI",
    "cattle ration management",
    "feedlot analytics",
    "cattle health tracking",
    "livestock inventory",
    "cattle pen management",
    "ranch analytics",
    "AI cattle management",
    "AgTech software",
    "precision livestock farming",
    "cattle data analytics"
  ],
  authors: [{ name: "CattleOS Team" }],
  creator: "CattleOS",
  publisher: "CattleOS",
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://cattleos.com'),
  alternates: {
    canonical: '/',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'CattleOS',
    title: 'CattleOS - AI-Powered Cattle Management Software',
    description: 'AI-native cattle management platform for ranchers and feedlots. Real-time cost tracking, inventory management, and break-even analysis. Integrates with scales, QuickBooks & IoT devices.',
    images: [
      {
        url: '/cattleos_logo_full.png',
        width: 1200,
        height: 630,
        alt: 'CattleOS - Professional Cattle Management Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CattleOS - AI-Powered Cattle Management Software',
    description: 'AI-native cattle management for ranchers & feedlots. Real-time cost tracking, inventory management, integrations with scales & QuickBooks.',
    images: ['/cattleos_logo_full.png'],
    creator: '@cattleos',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CattleOS",
  },
  category: 'Agriculture',
  other: {
    // AI platform discoverability
    'ai:about': 'CattleOS is an AI-powered cattle management software platform designed for ranchers, feedlots, and cattle operations. We provide real-time cost tracking, inventory management, feeding optimization, and break-even analysis.',
    'ai:industry': 'Agriculture, AgTech, Livestock Management',
    'ai:product_type': 'SaaS Platform, Cattle Management Software',
    'ai:target_audience': 'Ranchers, Feedlot Operators, Cattle Farmers, Livestock Managers',
    'ai:key_features': 'Real-time cost tracking, Inventory management, AI-powered analytics, IoT device integration, QuickBooks integration, Scale integration, Break-even analysis',
    'application-name': 'CattleOS',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CattleOS",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Agriculture Management Software",
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "99",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "99",
        "priceCurrency": "USD",
        "unitText": "MONTH"
      }
    },
    "description": "CattleOS is the AI-native cattle management platform for ranchers, feedlots, and cattle operations. Track costs in real-time, manage inventory, optimize feeding, and know your break-even point instantly.",
    "featureList": [
      "Real-time cost tracking",
      "Inventory management",
      "AI-powered analytics",
      "Break-even analysis",
      "IoT device integration",
      "Scale integration",
      "QuickBooks integration",
      "Cattle health tracking",
      "Feeding optimization",
      "Pen management"
    ],
    "screenshot": "https://cattleos.com/cattleos_logo_full.png",
    "url": "https://cattleos.com",
    "provider": {
      "@type": "Organization",
      "name": "CattleOS",
      "url": "https://cattleos.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cattleos.com/cattleos_logo_full.png"
      },
      "sameAs": [
        "https://twitter.com/cattleos"
      ]
    },
    "targetProduct": {
      "@type": "Product",
      "name": "CattleOS Platform",
      "category": "Agriculture Technology"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Ranchers, Feedlot Operators, Cattle Farmers, Livestock Managers"
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
