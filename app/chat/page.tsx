'use client';

import { ChatWindow } from '@/components/ChatWindow';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const router = useRouter();
  const { userProfile, combinedResult, clearChat } = useStore();

  useEffect(() => {
    if (!userProfile) {
      router.push('/onboarding');
      return;
    }
  }, [userProfile, router]);

  if (!userProfile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href={combinedResult ? "/results" : "/dashboard"}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <div className="text-2xl font-bold text-primary">Cemas.AI</div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearChat}
            >
              Clear Chat
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                AI Life Coach
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get personalized guidance based on your assessment results. Ask questions, 
              get advice, and stay motivated on your journey of self-discovery.
            </p>
          </div>

          {/* Status Card */}
          {combinedResult ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-800">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="font-medium">Assessment Complete</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                I have access to your Ikigai and personality assessment results and can provide 
                personalized guidance.
              </p>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-800">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="font-medium">General Coaching Available</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">
                Complete your assessments to get personalized coaching based on your results.
              </p>
            </div>
          )}

          {/* Chat Window */}
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}