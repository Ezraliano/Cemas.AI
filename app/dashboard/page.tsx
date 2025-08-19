'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useStore } from '@/lib/store';
import { ArrowRight, BarChart3, MessageCircle, RefreshCw, User, Target, Brain } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const router = useRouter();
  const { 
    userProfile, 
    ikigaiResult, 
    mbtiResult, 
    combinedResult, 
    currentStep,
    resetAssessment 
  } = useStore();

  useEffect(() => {
    if (!userProfile) {
      router.push('/onboarding');
      return;
    }
  }, [userProfile, router]);

  if (!userProfile) {
    return null;
  }

  const getProgressPercentage = () => {
    switch (currentStep) {
      case 'onboarding': return 0;
      case 'ikigai': return 25;
      case 'personality': return 50;
      case 'results': return 75;
      case 'completed': return 100;
      default: return 0;
    }
  };

  const getNextAction = () => {
    if (!ikigaiResult) {
      return { text: 'Start Ikigai Assessment', href: '/ikigai' };
    }
    if (!mbtiResult) {
      return { text: 'Take Personality Test', href: '/personality' };
    }
    if (!combinedResult) {
      return { text: 'View Results', href: '/results' };
    }
    return { text: 'Chat with AI Coach', href: '/chat' };
  };

  const nextAction = getNextAction();
  const progress = getProgressPercentage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">Cemas.AI</div>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">Home</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/chat">
                <MessageCircle className="h-4 w-4 mr-2" />
                AI Coach
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Welcome Header */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {userProfile.name}! 👋
            </h1>
            <p className="text-lg text-gray-600">
              Track your progress and continue your journey of self-discovery
            </p>
          </div>

          {/* Progress Overview */}
          <Card className="bg-gradient-to-r from-primary/10 to-blue-50 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Your Progress
              </CardTitle>
              <CardDescription>
                Overall completion of your assessment journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Assessment Progress</span>
                  <span className="font-medium">{progress}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Current goal: {userProfile.mainGoal}
                  </p>
                  <Button asChild size="sm">
                    <Link href={nextAction.href}>
                      {nextAction.text}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assessment Status */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className={ikigaiResult ? 'bg-green-50 border-green-200' : 'bg-gray-50'}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Ikigai Assessment
                  </CardTitle>
                  <Badge variant={ikigaiResult ? 'default' : 'secondary'}>
                    {ikigaiResult ? 'Complete' : 'Pending'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {ikigaiResult ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>Passion: {Math.round(ikigaiResult.scores.passion)}</div>
                      <div>Mission: {Math.round(ikigaiResult.scores.mission)}</div>
                      <div>Profession: {Math.round(ikigaiResult.scores.profession)}</div>
                      <div>Vocation: {Math.round(ikigaiResult.scores.vocation)}</div>
                    </div>
                    <Button asChild size="sm" variant="outline" className="w-full">
                      <Link href="/ikigai/result">View Results</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Discover your life purpose across 4 key dimensions
                    </p>
                    <Button asChild size="sm" className="w-full">
                      <Link href="/ikigai">Start Assessment</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className={mbtiResult ? 'bg-green-50 border-green-200' : 'bg-gray-50'}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Personality Test
                  </CardTitle>
                  <Badge variant={mbtiResult ? 'default' : 'secondary'}>
                    {mbtiResult ? 'Complete' : 'Pending'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {mbtiResult ? (
                  <div className="space-y-2">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{mbtiResult.type}</div>
                      <div className="text-xs text-muted-foreground">{mbtiResult.description}</div>
                    </div>
                    <Button asChild size="sm" variant="outline" className="w-full">
                      <Link href="/results">View Results</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Understand your MBTI personality type
                    </p>
                    <Button asChild size="sm" className="w-full" disabled={!ikigaiResult}>
                      <Link href="/personality">
                        {ikigaiResult ? 'Start Test' : 'Complete Ikigai First'}
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className={combinedResult ? 'bg-green-50 border-green-200' : 'bg-gray-50'}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5" />
                    AI Coaching
                  </CardTitle>
                  <Badge variant={combinedResult ? 'default' : 'secondary'}>
                    {combinedResult ? 'Available' : 'Locked'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Get personalized guidance and action plans
                  </p>
                  <Button asChild size="sm" className="w-full" disabled={!combinedResult}>
                    <Link href="/chat">
                      {combinedResult ? 'Chat with AI' : 'Complete Assessments First'}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Action Plan (if available) */}
          {combinedResult && (
            <Card>
              <CardHeader>
                <CardTitle>Your Action Plan</CardTitle>
                <CardDescription>
                  Recent goals and next steps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {combinedResult.actionPlan.map((phase) => (
                    <div key={phase.horizon} className="border-l-2 border-primary pl-4">
                      <div className="font-medium mb-1">
                        {phase.horizon === '1w' ? '1 Week Goals' : 
                         phase.horizon === '1m' ? '1 Month Goals' : '3 Month Goals'}
                      </div>
                      <ul className="space-y-1">
                        {phase.steps.slice(0, 2).map((step, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            • {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <Button asChild className="w-full mt-4" variant="outline">
                  <Link href="/results">View Complete Plan</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={resetAssessment}
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Start New Assessment
            </Button>
            
            <Button asChild size="lg" variant="outline">
              <Link href="/chat">
                <MessageCircle className="h-4 w-4 mr-2" />
                Get AI Guidance
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}