'use client';

import { IkigaiQuestionForm } from '@/components/IkigaiQuestionForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function IkigaiPage() {
  const router = useRouter();
  const { userProfile, currentStep, setCurrentStep } = useStore();

  useEffect(() => {
    if (!userProfile) {
      router.push('/onboarding');
      return;
    }
    
    setCurrentStep('ikigai');
  }, [userProfile, router, setCurrentStep]);

  if (!userProfile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/onboarding">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <div className="text-2xl font-bold text-primary">Cemas.AI</div>
          </div>
          <div className="text-sm text-muted-foreground">
            Ikigai Assessment
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover Your Ikigai
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ikigai (生き甲斐) is a Japanese concept meaning "reason for being". 
              Answer these questions to explore what gives your life meaning and purpose.
            </p>
            
            <div className="mt-6 p-4 bg-white/50 rounded-lg">
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-200 rounded-full"></div>
                  <span className="font-medium">Passion</span> - What you love
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
                  <span className="font-medium">Mission</span> - What the world needs
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-200 rounded-full"></div>
                  <span className="font-medium">Profession</span> - What you're good at
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-200 rounded-full"></div>
                  <span className="font-medium">Vocation</span> - What you can be paid for
                </div>
              </div>
            </div>
          </div>

          <IkigaiQuestionForm />
        </div>
      </div>
    </div>
  );
}