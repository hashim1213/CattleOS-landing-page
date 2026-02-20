"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, MapPin, Home } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [farmName, setFarmName] = useState("")
  const [location, setLocation] = useState("")
  const [farmSize, setFarmSize] = useState("")
  const [otherFarmingActivities, setOtherFarmingActivities] = useState("")
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { signup, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      // Redirect to app after signup
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      window.location.href = appUrl
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (password !== confirmPassword) {
      return setError("Passwords do not match")
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters")
    }

    if (!farmName.trim()) {
      return setError("Farm name is required")
    }

    if (!location.trim()) {
      return setError("Location is required")
    }

    if (!acceptedTerms) {
      return setError("You must accept the Terms of Service and Privacy Policy")
    }

    setLoading(true)

    try {
      // Create account
      await signup(email, password, name)

      // Wait for auth to settle
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Get the user ID from the auth context
      const { auth: firebaseAuth } = await import("@/lib/firebase")
      const userId = firebaseAuth.currentUser?.uid

      if (!userId) {
        throw new Error("Failed to get user ID after signup")
      }

      // Store user info and farm details in Firestore
      const profileData = {
        displayName: name,
        email,
        farmName: farmName.trim(),
        location: location.trim(),
        farmSize: farmSize.trim() || "",
        otherFarmingActivities: otherFarmingActivities.trim() || "",
        onboardingCompleted: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      await setDoc(doc(db, "userProfiles", userId), profileData)

      // Redirect to app after successful signup
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      window.location.href = appUrl
    } catch (error: any) {
      console.error("Signup error:", error)
      setError(error.message || "Failed to create account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center -mb-12">
            <div className="relative w-72 h-48">
              <Image src="/cattleos_logo_full.png" alt="CattleOS Logo" fill className="object-contain" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Get started with CattleOS</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <p className="text-xs text-muted-foreground">At least 6 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Farm Details */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-sm font-semibold text-foreground">Farm Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmName" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Farm/Ranch Name *
                  </Label>
                  <Input
                    id="farmName"
                    type="text"
                    placeholder="e.g., Smith Family Ranch"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location *
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="e.g., Alberta, Canada"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmSize">Herd / Farm Size</Label>
                  <Input
                    id="farmSize"
                    type="text"
                    placeholder="e.g., 200 head, 500 acres"
                    value={farmSize}
                    onChange={(e) => setFarmSize(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherActivities">Other Activities</Label>
                  <Input
                    id="otherActivities"
                    type="text"
                    placeholder="e.g., Crops, hay"
                    value={otherFarmingActivities}
                    onChange={(e) => setOtherFarmingActivities(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center gap-2 pt-4 border-t">
              <div className="flex-shrink-0">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  disabled={loading}
                  className="!h-4 !w-4 !min-h-[16px] !min-w-[16px] !max-h-[16px] !max-w-[16px]"
                />
              </div>
              <label
                htmlFor="terms"
                className="text-xs md:text-sm text-muted-foreground leading-tight cursor-pointer"
              >
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline" target="_blank">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline" target="_blank">
                  Privacy Policy
                </Link>
              </label>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
