'use client';

import { ConsentForm } from '@/components/ConsentForm';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <div className="text-2xl font-bold text-primary">Cemas.AI</div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Let's Get Started
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Before we begin your journey of self-discovery, we need to collect some basic information 
              and ensure you understand how your data will be used.
            </p>
          </div>

          <ConsentForm />

          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="text-center text-sm text-muted-foreground">
                <p className="mb-2">
                  <strong>What happens next?</strong>
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-left">
                  <div>
                    <div className="font-medium text-foreground">1. Ikigai Assessment</div>
                    <p>Discover what drives you across 4 key life dimensions</p>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">2. Personality Test</div>
                    <p>Understand your MBTI type and work preferences</p>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">3. Results & Coaching</div>
                    <p>Get personalized insights and AI-powered guidance</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}