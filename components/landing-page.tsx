"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import {
  CheckCircle2,
  TrendingUp,
  Smartphone,
  DollarSign,
  Clock,
  FileText,
  BarChart3,
  Zap,
  Check,
  ArrowRight,
  Users,
  Building2,
  Brain,
  Scale,
  Link as LinkIcon,
  Calendar,
  Rocket,
  Shield,
  Lock,
  Eye,
  MessageCircle,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Upload,
  Tags,
  Activity,
  PieChart
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function LandingPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    fullName: "",
    farmName: "",
    email: "",
    phone: "",
    herdSize: "",
    problemValidation: false,
    pricingValidation: false,
    futureIntent: false,
    acknowledgment: false,
  })

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CattleOS",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, iOS, Android",
    "offers": [
      {
        "@type": "Offer",
        "name": "Cow/Calf Plan",
        "price": "99",
        "priceCurrency": "USD",
        "billingDuration": "P1M"
      },
      {
        "@type": "Offer",
        "name": "Feedlot Plan",
        "price": "275",
        "priceCurrency": "USD",
        "billingDuration": "P1M"
      }
    ],
    "description": "AI-native cattle management platform for cow-calf operations, feedlots, and cattle operations. Real-time cost tracking, inventory management, and break-even analysis.",
    "screenshot": "/cattleos_logo_full.png",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "1"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.fullName || !formData.farmName || !formData.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (!formData.problemValidation || !formData.pricingValidation || !formData.futureIntent || !formData.acknowledgment) {
      toast({
        title: "Agreement required",
        description: "Please confirm all validation statements.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/loi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit")
      }

      toast({
        title: "Thank you for your interest!",
        description: "We've received your Letter of Intent. We'll be in touch soon.",
      })

      // Reset form
      setFormData({
        fullName: "",
        farmName: "",
        email: "",
        phone: "",
        herdSize: "",
        problemValidation: false,
        pricingValidation: false,
        futureIntent: false,
        acknowledgment: false,
      })
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Walkthrough steps data
  const walkthroughSteps = [
    {
      step: 1,
      title: "Add Your Cattle",
      description: "Start by importing your cattle inventory. Use our bulk upload feature or add animals individually with tags, weights, and purchase details.",
      icon: Upload,
      color: "from-blue-500 to-blue-600",
      image: "/screen1.png",
      highlights: ["Bulk CSV import", "Individual entry with voice capture", "Auto-generate EID tags"]
    },
    {
      step: 2,
      title: "Organize Into Pens",
      description: "Group your cattle into pens based on your operation. Assign feed rations, track pen-level performance, and monitor costs in real-time.",
      icon: Tags,
      color: "from-green-500 to-green-600",
      image: "/screen2.png",
      highlights: ["Drag-and-drop pen management", "Custom pen configurations", "Automated cost allocation"]
    },
    {
      step: 3,
      title: "Track Health & Treatments",
      description: "Record treatments, vaccinations, and health observations. Set up automated alerts for withdrawal periods and follow-up care.",
      icon: Activity,
      color: "from-purple-500 to-purple-600",
      image: "/screen3.png",
      highlights: ["Treatment protocols library", "Withdrawal period tracking", "Health trend analysis"]
    },
    {
      step: 4,
      title: "Monitor Performance",
      description: "View real-time dashboards showing cost of gain, break-even prices, and profitability by pen. Make data-driven decisions with confidence.",
      icon: PieChart,
      color: "from-orange-500 to-orange-600",
      image: "/screen4.png",
      highlights: ["Live break-even analysis", "Pen performance comparison", "AI-powered recommendations"]
    }
  ]

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % walkthroughSteps.length)
  }

  const previousStep = () => {
    setCurrentStep((prev) => (prev - 1 + walkthroughSteps.length) % walkthroughSteps.length)
  }

  const features = [
    {
      icon: Clock,
      title: "Real-Time Cost Tracking",
      description: "Know your exact cost of gain at any moment. No more guessing your break-even point.",
    },
    {
      icon: BarChart3,
      title: "Pen-Based Resource Allocation",
      description: "Allocate feed, meds, and costs by pen. Track performance with precision.",
    },
    {
      icon: Smartphone,
      title: "Hands-Free Data Capture",
      description: "Voice commands and NFC tags eliminate manual paperwork in the field.",
    },
    {
      icon: DollarSign,
      title: "Profit Optimization",
      description: "Identify which pens are profitable and which need adjustments before it's too late.",
    },
    {
      icon: FileText,
      title: "Eliminate Paperwork",
      description: "Stop juggling spreadsheets, notebooks, and receipts. Everything in one place.",
    },
    {
      icon: TrendingUp,
      title: "Instant Insights",
      description: "Make data-driven decisions with real-time analytics and reporting.",
    },
  ]

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-4 z-50 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="bg-white dark:bg-gray-950 shadow-lg border border-border rounded-full px-4 md:px-6 py-3 md:py-4 backdrop-blur-sm bg-white/95 dark:bg-gray-950/95">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0 flex-shrink -my-12">
                <Image
                  src="/cattleos_logo_full.png"
                  alt="CattleOS"
                  width={240}
                  height={80}
                  className="h-28 md:h-32 w-auto object-contain max-w-[200px] md:max-w-[240px]"
                  priority
                />
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <a href="https://app.cattleos.com">
                  <Button variant="ghost" size="sm" className="text-xs md:text-sm px-2 md:px-4 rounded-full">Sign In</Button>
                </a>
                <a href="https://app.cattleos.com/signup">
                  <Button size="sm" className="text-xs md:text-sm px-3 md:px-4 rounded-full">Get Started</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Background */}
      <section className="relative overflow-hidden -mt-[120px] pt-[120px] min-h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 top-[-120px] z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <Image
            src="/cow.jpg"
            alt="Cattle farm"
            fill
            className="object-cover scale-105"
            priority
            onError={(e) => {
              // Fallback to gradient if image not found
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 md:px-8 h-full flex items-end pb-8 md:pb-12">
          <div className="max-w-2xl">
            {/* Main Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
              Your Spreadsheets Are
              <br />
              So Messy,
              <br />
              Even The Cattle Are Confused.
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-white/80 mb-8 max-w-xl leading-relaxed font-light">
              Professional cattle management with real-time inventory tracking, cost management, and performance analytics.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="https://app.cattleos.com/signup" className="w-full sm:w-auto">
                <Button
                  size="default"
                  className="w-full sm:w-auto text-lg sm:text-base px-8 py-6 sm:px-6 sm:py-5 bg-[#77461B] hover:bg-[#5c3615] text-white rounded-full shadow-xl hover:shadow-[#77461B]/50 transition-all duration-300 hover:scale-105"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5 sm:h-4 sm:w-4" />
                </Button>
              </a>
              <Button
                size="default"
                variant="outline"
                className="text-base px-6 py-5 bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 rounded-full transition-all duration-300"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            One Platform. Complete Control.
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            CattleOS brings all your cattle operation data together in one powerful,
            easy-to-use platform designed specifically for feedlot and cattle operations.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Interactive Walkthrough */}
      <section className="py-16 md:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                How CattleOS Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get up and running in minutes. Our streamlined workflow makes cattle management effortless.
              </p>
            </div>

            {/* Interactive Carousel */}
            <div className="relative">
              <Card className="border-2 border-primary/20 shadow-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Left side - Step content */}
                    <div className="p-8 md:p-12 bg-card">
                      <div className="mb-6">
                        <div className="inline-flex w-16 h-16 md:w-20 md:h-20 rounded-lg bg-primary/10 items-center justify-center mb-4 transition-all duration-300">
                          {(() => {
                            const StepIcon = walkthroughSteps[currentStep].icon
                            return <StepIcon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                          })()}
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-sm">
                            {walkthroughSteps[currentStep].step}
                          </span>
                          <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                            {walkthroughSteps[currentStep].title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
                        {walkthroughSteps[currentStep].description}
                      </p>

                      <div className="space-y-3 mb-8">
                        <p className="text-sm font-semibold text-foreground uppercase tracking-wide">Key Features:</p>
                        {walkthroughSteps[currentStep].highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                                <Check className="h-3 w-3 text-primary" />
                              </div>
                            </div>
                            <span className="text-sm md:text-base text-muted-foreground">{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* Navigation Controls */}
                      <div className="flex items-center justify-between pt-6 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={previousStep}
                          className="gap-2"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </Button>

                        {/* Step Indicators */}
                        <div className="flex gap-2">
                          {walkthroughSteps.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentStep(idx)}
                              className={`h-2 rounded-full transition-all duration-300 ${
                                idx === currentStep
                                  ? 'w-8 bg-primary'
                                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                              }`}
                              aria-label={`Go to step ${idx + 1}`}
                            />
                          ))}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={nextStep}
                          className="gap-2"
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Right side - Screenshot */}
                    <div className="hidden md:flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-6 transition-all duration-500">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="relative w-full max-w-lg aspect-[4/3] bg-white rounded-lg shadow-xl overflow-hidden border">
                          <Image
                            src={walkthroughSteps[currentStep].image}
                            alt={walkthroughSteps[currentStep].title}
                            fill
                            className="object-cover object-top transition-all duration-500"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            onError={(e) => {
                              // Fallback to icon if image not found
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Call to Action */}
              <div className="text-center mt-12">
                <p className="text-lg text-muted-foreground mb-6">
                  Ready to streamline your cattle operation?
                </p>
                <Button
                  size="lg"
                  className="gap-2"
                  onClick={() => document.getElementById('loi-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start Your Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI-First Section */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                AI-Powered Intelligence
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Advanced analytics and insights to help you make better decisions
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3 md:mb-4">
                    <Activity className="h-8 w-8 md:h-10 md:w-10 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-lg md:text-xl">AI-Powered Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm md:text-base text-muted-foreground">
                    Machine learning models analyze your operation in real-time, predicting optimal marketing windows,
                    detecting health issues early, and recommending ration adjustments.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Predictive health monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Smart cost forecasting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Automated anomaly detection</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3 md:mb-4">
                    <MessageCircle className="h-8 w-8 md:h-10 md:w-10 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-lg md:text-xl">Natural Language Interface</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm md:text-base text-muted-foreground">
                    Talk to your farm data naturally. Ask questions in plain English and get instant answers.
                    Our AI assistant understands cattle terminology and your operation.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Voice-first data entry</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Conversational analytics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Smart recommendations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
                <CardHeader>
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3 md:mb-4">
                    <BarChart3 className="h-8 w-8 md:h-10 md:w-10 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-lg md:text-xl">Continuous Learning</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm md:text-base text-muted-foreground">
                    The more you use CattleOS, the smarter it gets. Our AI learns from your operation's patterns
                    and adapts to your specific management style.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Personalized benchmarks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Custom alerts & workflows</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Industry best practices</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-16 md:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Works With Your Existing Tools
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                CattleOS integrates seamlessly with the hardware and software you already use
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Scale className="h-10 w-10 mx-auto mb-2 text-primary" />
                  <CardTitle className="text-lg">Scale Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Direct integration with Tru-Test, Datamars, and other major scale manufacturers
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <DollarSign className="h-10 w-10 mx-auto mb-2 text-primary" />
                  <CardTitle className="text-lg">QuickBooks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Automatic expense tracking and financial synchronization with QuickBooks
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <FileText className="h-10 w-10 mx-auto mb-2 text-primary" />
                  <CardTitle className="text-lg">Market Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Live cattle market prices from CME, DTN, and regional auction markets
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Smartphone className="h-10 w-10 mx-auto mb-2 text-primary" />
                  <CardTitle className="text-lg">IoT Devices</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Connect with smart ear tags, water sensors, and automated feed systems
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">Need a custom integration?</p>
              <Button variant="outline" size="lg" onClick={() => document.getElementById('loi-form')?.scrollIntoView({ behavior: 'smooth' })}>
                Contact Us About Custom Integrations
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Data Privacy & Security Section */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Your Data Stays Yours. Always.
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We know your operation data is sensitive business information. That's why we built CattleOS with privacy at its core.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <Lock className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />
                  <CardTitle className="text-lg md:text-xl">Never Shared or Sold</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base text-muted-foreground mb-4">
                    Your cattle data, costs, and operations information is <strong>never shared, sold, or used for any purpose</strong> other than powering your CattleOS experience.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>No third-party data sharing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>No advertising partners</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Your data is not our business model</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader>
                  <Shield className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />
                  <CardTitle className="text-lg md:text-xl">Bank-Level Encryption</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base text-muted-foreground mb-4">
                    All your data is encrypted in transit and at rest using industry-standard AES-256 encryption, the same security banks use.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>SSL/TLS encryption for all connections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Encrypted database storage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Secure cloud infrastructure</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors sm:col-span-2 lg:col-span-1">
                <CardHeader>
                  <Eye className="h-10 w-10 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />
                  <CardTitle className="text-lg md:text-xl">You're In Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base text-muted-foreground mb-4">
                    Your data belongs to you. Export it anytime, delete it whenever you want, and control exactly who on your team has access.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>One-click data export</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Granular access controls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Delete your data anytime</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center bg-card border border-primary/20 rounded-lg p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground">Our Privacy Promise</h3>
              <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
                We make money from subscriptions, not from your data. Your operation's information is confidential business data,
                and we treat it that way. <strong className="text-foreground">We will never share, sell, or monetize your cattle data.</strong> Period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Simple, Transparent Pricing
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that fits your operation size
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Cow/Calf Plan */}
              <Card className="relative hover:shadow-lg transition-all duration-300 border-2 flex flex-col">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">Cow/Calf</CardTitle>
                  <CardDescription>Perfect for cow-calf operations</CardDescription>
                  <div className="mt-4">
                    <div className="text-4xl font-bold text-foreground">$99</div>
                    <div className="text-muted-foreground">/month</div>
                    <p className="text-xs text-muted-foreground mt-2">billed annually: $1,188/year</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 flex-1 flex flex-col">
                  <div className="space-y-3 flex-1">
                    <div className="bg-muted/50 rounded-lg p-3 space-y-1">
                      <p className="text-sm font-semibold">Capacity</p>
                      <p className="text-xs text-muted-foreground">Up to 200 head</p>
                      <p className="text-xs text-muted-foreground">15 pens • 1 user</p>
                    </div>
                    <ul className="space-y-2.5">
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Real-time cost tracking</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Cattle & pen management</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Basic health tracking</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Mobile app access</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Email support</span>
                      </li>
                    </ul>
                    <div className="pt-3 border-t">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">Add-ons:</p>
                      <p className="text-xs text-muted-foreground">+$10/month per 100 head over 200</p>
                      <p className="text-xs text-muted-foreground">+$15/month per additional user</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4" onClick={() => document.getElementById('loi-form')?.scrollIntoView({ behavior: 'smooth' })}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* Feedlot Plan - Featured */}
              <Card className="relative hover:shadow-lg transition-all duration-300 border-2 border-[#2D6433] shadow-lg sm:col-span-2 lg:col-span-1 flex flex-col">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-[#2D6433] text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl mb-2">Feedlot</CardTitle>
                  <CardDescription>Built for commercial feedlot operations</CardDescription>
                  <div className="mt-4">
                    <div className="text-4xl font-bold text-foreground">$275</div>
                    <div className="text-muted-foreground">/month</div>
                    <p className="text-xs text-muted-foreground mt-2">billed annually: $3,300/year</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 flex-1 flex flex-col">
                  <div className="space-y-3 flex-1">
                    <div className="bg-primary/5 rounded-lg p-3 space-y-1">
                      <p className="text-sm font-semibold">Capacity</p>
                      <p className="text-xs text-muted-foreground">Up to 2,000 head</p>
                      <p className="text-xs text-muted-foreground">40 pens • 3 users</p>
                    </div>
                    <p className="text-xs font-semibold text-primary">Everything in Cow/Calf, plus:</p>
                    <ul className="space-y-2.5">
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Advanced health & treatment tracking</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>EID tag integration</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Advanced ration management</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Voice & NFC data capture</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Team collaboration tools</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Priority phone & email support</span>
                      </li>
                    </ul>
                    <div className="pt-3 border-t">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">Add-ons:</p>
                      <p className="text-xs text-muted-foreground">+$8/month per 100 head over 2,000</p>
                      <p className="text-xs text-muted-foreground">+$12/month per additional user</p>
                      <p className="text-xs text-muted-foreground">+$5/month per 10 additional pens</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4" onClick={() => document.getElementById('loi-form')?.scrollIntoView({ behavior: 'smooth' })}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* Enterprise Plan */}
              <Card className="relative hover:shadow-lg transition-all duration-300 border-2 sm:col-span-2 lg:col-span-1 flex flex-col">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">Enterprise</CardTitle>
                  <CardDescription>Custom solutions for large operations</CardDescription>
                  <div className="mt-4">
                    <div className="text-4xl font-bold text-foreground">Custom</div>
                    <div className="text-muted-foreground">Contact us</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 flex-1 flex flex-col">
                  <div className="space-y-3 flex-1">
                    <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-3 space-y-1">
                      <p className="text-sm font-semibold">Capacity</p>
                      <p className="text-xs text-muted-foreground">Unlimited head</p>
                      <p className="text-xs text-muted-foreground">Unlimited pens • Unlimited users</p>
                    </div>
                    <p className="text-xs font-semibold text-purple-600">Everything in Feedlot, plus:</p>
                    <ul className="space-y-2.5">
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>Multi-location management</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>Custom integrations & API access</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>Dedicated account manager</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>On-premise deployment options</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>Custom training & onboarding</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span>24/7 priority support with SLA</span>
                      </li>
                    </ul>
                  </div>
                  <Button variant="outline" className="w-full mt-4" onClick={() => document.getElementById('loi-form')?.scrollIntoView({ behavior: 'smooth' })}>
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sign Up Section */}
      <section id="loi-form" className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary/20 shadow-2xl">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                  Ready to Transform Your Cattle Operation?
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Join CattleOS today and start managing your herd with confidence.
                  Get real-time insights, track costs, and make data-driven decisions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <Link href="/signup">
                  <Button size="lg" className="text-lg px-8 py-6 bg-[#77461B] hover:bg-[#5c3615] text-white min-w-[200px]">
                    Sign Up Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 min-w-[200px]">
                    Sign In
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-muted-foreground">
                Start free today • No credit card required • Full access to all features
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 dark:bg-gray-900 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {/* Company Info */}
              <div className="md:col-span-2">
                <div className="-my-8">
                  <Image
                    src="/cattleos_logo_full.png"
                    alt="CattleOS"
                    width={280}
                    height={90}
                    className="h-36 w-auto object-contain"
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                  Professional cattle management software built for cow-calf operations and feedlots.
                  Helping ranchers make data-driven decisions with confidence.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-100 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded mt-3">
                  <MapPin className="h-3.5 w-3.5 text-red-700 dark:text-red-400" />
                  <span className="text-xs font-semibold text-red-700 dark:text-red-400">Proudly Built in Canada</span>
                </div>
              </div>

              {/* Product Links */}
              <div>
                <h4 className="font-semibold mb-4 text-foreground">Product</h4>
                <ul className="space-y-2.5 text-sm">
                  <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                  <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
                  <li><a href="#loi-form" className="text-muted-foreground hover:text-foreground transition-colors">Get Started</a></li>
                  <li><Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">Sign In</Link></li>
                </ul>
              </div>

              {/* Support & Resources */}
              <div>
                <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
                <ul className="space-y-2.5 text-sm">
                  <li><a href="mailto:sales@cattleos.com" className="text-muted-foreground hover:text-foreground transition-colors">sales@cattleos.com</a></li>
                  <li><a href="mailto:support@cattleos.com" className="text-muted-foreground hover:text-foreground transition-colors">support@cattleos.com</a></li>
                  <li><a href="#loi-form" className="text-muted-foreground hover:text-foreground transition-colors">Early Access</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-border">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  © 2026 CattleOS Inc. All rights reserved.
                </div>
                <div className="flex gap-6 text-sm">
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
                  <a href="mailto:sales@cattleos.com" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
  )
}
