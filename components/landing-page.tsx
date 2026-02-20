"use client"

import React, { useState } from "react"
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

// Interactive Workflow Demo Component
function InteractiveWorkflowDemo() {
  const [activeStep, setActiveStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const workflowSteps = [
    {
      id: 1,
      title: "Add a Cow",
      description: "Simply speak or type the tag number",
      action: "Adding Cow #482...",
      image: "/screen_add.png",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Record Weight",
      description: "Quick weight entry with voice or manual input",
      action: "Weight: 850 lbs recorded",
      image: "/screen_weight.png",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 3,
      title: "Add Medication",
      description: "Track treatments and withdrawal periods",
      action: "5ml Penicillin added",
      image: "/screen3.png",
      color: "from-green-500 to-green-600"
    },
    {
      id: 4,
      title: "Track Costs",
      description: "Real-time cost per head calculation",
      action: "Cost: $1,245/head",
      image: "/screen4.png",
      color: "from-orange-500 to-orange-600"
    }
  ]

  const handleStepClick = (index: number) => {
    // Mark previous steps as completed
    if (index > activeStep) {
      setCompletedSteps((prev) => [...prev, activeStep])
    } else if (index < activeStep) {
      setCompletedSteps((prev) => prev.filter(step => step < index))
    }
    setActiveStep(index)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Steps Timeline */}
      <div className="relative mb-12">
        {/* Progress Line */}
        <div className="absolute top-12 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-[#77461B] to-[#5c3615] rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${(activeStep / (workflowSteps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Step Nodes */}
        <div className="grid grid-cols-4 gap-4 relative">
          {workflowSteps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              {/* Node */}
              <button
                onClick={() => handleStepClick(index)}
                className={`relative z-10 w-24 h-24 rounded-full overflow-hidden flex items-center justify-center transition-all duration-500 cursor-pointer hover:scale-105 ${
                  index === activeStep
                    ? 'shadow-lg scale-110 ring-4 ring-primary/30'
                    : completedSteps.includes(index)
                    ? 'shadow-md ring-2 ring-primary/20'
                    : 'border-2 border-gray-300 dark:border-gray-700 hover:border-primary/50'
                }`}
              >
                {completedSteps.includes(index) ? (
                  <div className="w-full h-full bg-[#77461B] flex items-center justify-center">
                    <CheckCircle2 className="h-12 w-12 text-white" />
                  </div>
                ) : (
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={96}
                    height={96}
                    quality={100}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      index === activeStep ? 'scale-110' : 'scale-100'
                    }`}
                    unoptimized
                  />
                )}
              </button>

              {/* Label */}
              <div className="text-center mt-4">
                <p className={`font-semibold text-sm transition-colors ${
                  index === activeStep ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Step Display */}
      <Card className="border-2 border-primary/20 shadow-2xl overflow-hidden">
        <CardContent className="p-8 md:p-12">
          <div className="text-center space-y-6">
            {/* Image */}
            <div className={`w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 transform transition-all duration-500 ${
              isAnimating ? 'scale-105' : 'scale-100'
            }`}>
              <Image
                src={workflowSteps[activeStep].image}
                alt={workflowSteps[activeStep].title}
                width={1200}
                height={800}
                quality={100}
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-bold text-foreground">
              {workflowSteps[activeStep].title}
            </h3>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
              {workflowSteps[activeStep].description}
            </p>

            {/* Action Display */}
            <div className={`inline-block transition-all duration-500 ${
              isAnimating ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
            }`}>
              <div className="px-6 py-3 rounded-full bg-gradient-to-r from-[#77461B] to-[#5c3615] text-white font-semibold text-lg shadow-lg">
                ✓ {workflowSteps[activeStep].action}
              </div>
            </div>

            {/* Interactive Mockup */}
            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-800">
              <div className="space-y-4">
                {/* Simulated Input Field */}
                <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">
                    {activeStep === 0 && "Tag: #482"}
                    {activeStep === 1 && "Weight: 850 lbs"}
                    {activeStep === 2 && "Med: Penicillin 5ml"}
                    {activeStep === 3 && "Total Cost: $1,245"}
                  </span>
                  <div className="ml-auto">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-1000"
                      style={{ width: `${((activeStep + 1) / workflowSteps.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {Math.round(((activeStep + 1) / workflowSteps.length) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Voice Agent Phone Component
function VoiceAgentPhone() {
  const [step, setStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)

  const conversation = [
    { type: 'user', text: 'Add 5ml of penicillin to pen 7, cow tag 482', delay: 0 },
    { type: 'processing', text: 'Processing...', delay: 2000 },
    { type: 'action', text: 'Adding medication record...', delay: 3500 },
    { type: 'success', text: '✓ Medication added to Cow #482, Pen 7', delay: 5000 },
    { type: 'details', text: '5ml Penicillin • Withdrawal: 60 days', delay: 6000 },
  ]

  React.useEffect(() => {
    if (!isAnimating) return

    const timer = setTimeout(() => {
      if (step < conversation.length - 1) {
        setStep(step + 1)
      } else {
        // Reset animation after a pause
        setTimeout(() => {
          setStep(0)
        }, 3000)
      }
    }, conversation[step]?.delay || 2000)

    return () => clearTimeout(timer)
  }, [step, isAnimating, conversation])

  return (
    <div className="relative">
      {/* Phone Mockup */}
      <div className="relative w-[340px] h-[680px] mx-auto">
        {/* Phone Frame */}
        <div className="absolute inset-0 bg-gray-900 rounded-[3rem] shadow-2xl border-[14px] border-gray-800">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-800 rounded-b-3xl z-10"></div>

          {/* Screen */}
          <div className="relative h-full w-full bg-white rounded-[2.3rem] overflow-hidden">
            {/* Status Bar */}
            <div className="bg-gray-50 px-6 pt-3 pb-2 flex items-center justify-between text-xs">
              <span className="font-semibold">9:41</span>
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  <div className="w-1 h-3 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-3 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-3 bg-gray-400 rounded-full"></div>
                  <div className="w-1 h-3 bg-gray-800 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* App Header */}
            <div className="bg-gradient-to-r from-[#77461B] to-[#5c3615] px-4 py-3 flex items-center gap-3">
              <Image
                src="/Icon (Cream) - CattleOS.png"
                alt="CattleOS"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-white font-semibold text-sm">Voice Agent</h3>
                <p className="text-white/70 text-xs">Listening...</p>
              </div>
              <div className="flex gap-1">
                {isAnimating && (
                  <>
                    <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse delay-75"></div>
                    <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse delay-150"></div>
                  </>
                )}
              </div>
            </div>

            {/* Conversation Area */}
            <div className="p-4 space-y-3 h-[calc(100%-8rem)] overflow-y-auto">
              {conversation.slice(0, step + 1).map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500 ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.type !== 'user' && (
                    <div className="flex-shrink-0">
                      <Image
                        src="/Icon (Green) - CattleOS.png"
                        alt="CattleOS"
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    </div>
                  )}

                  <div
                    className={`rounded-2xl px-3 py-2 max-w-[75%] text-sm ${
                      message.type === 'user'
                        ? 'bg-[#77461B] text-white'
                        : message.type === 'processing'
                        ? 'bg-blue-100 text-blue-900'
                        : message.type === 'action'
                        ? 'bg-orange-100 text-orange-900'
                        : message.type === 'success'
                        ? 'bg-green-100 text-green-900 font-semibold'
                        : 'bg-gray-100 text-gray-700 text-xs'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {step === conversation.length - 1 && (
                <div className="flex justify-center pt-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                    <CheckCircle2 className="h-3 w-3" />
                    Complete
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Input Area */}
            <div className="absolute bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-200 p-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-400 border border-gray-200">
                  Tap to speak...
                </div>
                <div className="w-9 h-9 rounded-full bg-[#77461B] flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phone shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-[3rem] pointer-events-none"></div>
      </div>
    </div>
  )
}

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
                <a href="https://cattleos.com/signup">
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
        <div className="relative z-20 container mx-auto px-4 md:px-8 h-full flex items-center pb-8 md:pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
            {/* Left: Text Content */}
            <div className="max-w-2xl">
              {/* Tag */}
              <div className="inline-block mb-4">
                <div className="px-4 py-2 rounded-full border-2 border-white">
                  <span className="text-white text-sm font-semibold tracking-wide">AI FOR CATTLE MANAGEMENT</span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
                Your Spreadsheets Are
                <br />
                So Messy, Even The
                <br />
                Cattle Are Confused.
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-lg text-white/80 mb-8 max-w-xl leading-relaxed font-light">
                Professional cattle management with real-time inventory tracking, cost management, and performance analytics.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://cattleos.com/signup" className="w-full sm:w-auto">
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

            {/* Right: Phone Demo */}
            <div className="hidden lg:block translate-y-12">
              <VoiceAgentPhone />
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

          {/* Bento Box Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Featured Card - Real-Time Cost Tracking with Screenshot */}
            <Card className="md:col-span-2 lg:row-span-2 bg-gradient-to-br from-[#77461B] to-[#5c3615] text-white border-none hover:shadow-2xl transition-all duration-300 group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
              <CardHeader className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">Real-Time Cost Tracking</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 space-y-6">
                <p className="text-white/90 text-lg leading-relaxed">
                  Know your exact cost of gain at any moment. No more guessing your break-even point.
                  See live updates as you add feed, medications, and other costs.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm text-white border border-white/20">Live Updates</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm text-white border border-white/20">Break-Even Analysis</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm text-white border border-white/20">Cost Per Head</span>
                </div>
                {/* Screenshot */}
                <div className="relative rounded-lg overflow-hidden border-2 border-white/20 shadow-2xl group-hover:border-white/30 transition-all">
                  <Image
                    src="/screen4.png"
                    alt="Real-time cost tracking dashboard"
                    width={600}
                    height={400}
                    quality={100}
                    className="w-full h-auto"
                    unoptimized
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pen-Based Resource Allocation with Image */}
            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 border-primary/20 group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/screen2.png"
                  alt="Pen management interface"
                  width={400}
                  height={250}
                  quality={100}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">Pen-Based Resource Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Allocate feed, meds, and costs by pen. Track performance with precision.
                </p>
              </CardContent>
            </Card>

            {/* Hands-Free Data Capture with Image */}
            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 border-primary/20 group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/screen3.png"
                  alt="Voice command interface"
                  width={400}
                  height={250}
                  quality={100}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">Hands-Free Data Capture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Voice commands and NFC tags eliminate manual paperwork in the field.
                </p>
              </CardContent>
            </Card>

            {/* Profit Optimization with Image */}
            <Card className="md:col-span-2 lg:col-span-1 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 border-primary/20 group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/screen_pens.png"
                  alt="Profit optimization dashboard"
                  width={400}
                  height={250}
                  quality={100}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">
                  Profit Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Identify which pens are profitable and which need adjustments before it's too late.
                </p>
              </CardContent>
            </Card>

            {/* Eliminate Paperwork with Image */}
            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 border-primary/20 group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/screen6.png"
                  alt="Paperless workflow"
                  width={400}
                  height={250}
                  quality={100}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">Eliminate Paperwork</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Stop juggling spreadsheets, notebooks, and receipts. Everything in one place.
                </p>
              </CardContent>
            </Card>

            {/* Instant Insights with Image */}
            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 border-primary/20 group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/screen7.png"
                  alt="Analytics dashboard"
                  width={400}
                  height={250}
                  quality={100}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">Instant Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Make data-driven decisions with real-time analytics and reporting.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works - Interactive Animated Demo */}
      <section className="py-16 md:py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              See How Easy It Is
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Add cattle and manage your entire operation in seconds, not hours.
            </p>
          </div>

          <InteractiveWorkflowDemo />
        </div>
      </section>

      {/* AI-First Section */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                AI-Powered Intelligence
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Advanced analytics and insights to help you make better decisions
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Image Side */}
              <div className="relative order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/cattle_man.jpg"
                    alt="Cattle rancher using CattleOS"
                    width={600}
                    height={700}
                    quality={100}
                    className="w-full h-auto object-cover"
                    unoptimized
                  />
                </div>
              </div>

              {/* Content Side */}
              <div className="order-1 lg:order-2 space-y-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Talk to your data in natural language and have it compliant ready</h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      Our AI assistant understands cattle terminology and your operation. Ask questions in plain English and get instant answers while maintaining full compliance.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-base">Voice-first data entry</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-base">Conversational analytics</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-base">Smart recommendations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-base">Automated compliance tracking</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Guardrails Section */}
            <div className="mt-12 md:mt-16">
              <Card className="border-2 border-primary/20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl mb-4">AI with Guardrails: Your Data Stays Secure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    CattleOS uses proprietary AI Data Mesh Layers that create secure boundaries around your operation's data.
                    Our AI only uses data within your platform—never external sources—ensuring your sensitive cattle and cost
                    information never leaks or gets shared with third parties.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-gray-900 border border-primary/10">
                      <Lock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold mb-1">Platform-Only Data</h4>
                        <p className="text-sm text-muted-foreground">
                          AI models train exclusively on your farm's data within CattleOS—no external data sources
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-gray-900 border border-primary/10">
                      <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold mb-1">Data Mesh Architecture</h4>
                        <p className="text-sm text-muted-foreground">
                          Proprietary mesh layers prevent data leakage and ensure complete isolation between operations
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-gray-900 border border-primary/10">
                      <Eye className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold mb-1">No Cross-Contamination</h4>
                        <p className="text-sm text-muted-foreground">
                          Your data never trains models for other farms—complete privacy and competitive advantage
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-white dark:bg-gray-900 border border-primary/10">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold mb-1">Transparent AI</h4>
                        <p className="text-sm text-muted-foreground">
                          Understand exactly what data the AI uses and how recommendations are generated
                        </p>
                      </div>
                    </div>
                  </div>
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
                Integrations Coming Soon
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                CattleOS will integrate seamlessly with the hardware and software you already use
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
                <div className="inline-flex items-center gap-2 mt-3">
                  <Image
                    src="/canada.svg"
                    alt="Canada"
                    width={16}
                    height={16}
                    className="h-4 w-4"
                  />
                  <span className="text-xs font-semibold text-muted-foreground">Proudly Built in Canada</span>
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
