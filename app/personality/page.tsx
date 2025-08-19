'use client';

import { PersonalityQuestionForm } from '@/components/PersonalityQuestionForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PersonalityPage() {
  const router = useRouter();
  const { userProfile, ikigaiResult, currentStep, setCurrentStep } = useStore();

  useEffect(() => {
    if (!userProfile) {
      router.push('/onboarding');
      return;
    }
    
    if (!ikigaiResult) {
      router.push('/ikigai');
      return;
    }
    
    setCurrentStep('personality');
  }, [userProfile, ikigaiResult, router, setCurrentStep]);

  if (!userProfile || !ikigaiResult) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/ikigai/result">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Results
              </Link>
            </Button>
            <div className="text-2xl font-bold text-primary">Cemas.AI</div>
          </div>
          <div className="text-sm text-muted-foreground">
            Personality Assessment
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover Your Personality Type
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Based on the Myers-Briggs Type Indicator (MBTI), this assessment will help you understand 
              your preferences, work style, and how you interact with the world.
            </p>
            
            <div className="mt-6 p-4 bg-white/50 rounded-lg">
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="font-medium mb-1">Energy Focus</div>
                  <div className="text-xs text-muted-foreground">Extraversion vs Introversion</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Information</div>
                  <div className="text-xs text-muted-foreground">Sensing vs Intuition</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Decisions</div>
                  <div className="text-xs text-muted-foreground">Thinking vs Feeling</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Lifestyle</div>
                  <div className="text-xs text-muted-foreground">Judging vs Perceiving</div>
                </div>
              </div>
            </div>
          </div>

          <PersonalityQuestionForm />
        </div>
      </div>
    </div>
  );
}