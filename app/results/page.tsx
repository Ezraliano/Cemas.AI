'use client';

import { IkigaiRadarChart } from '@/components/IkigaiRadarChart';
import { MBTICard } from '@/components/MBTICard';
import { ActionPlanList } from '@/components/ActionPlanList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/lib/store';
import { ArrowRight, MessageCircle, Download, Share } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ResultsPage() {
  const router = useRouter();
  const { combinedResult, userProfile, setCurrentStep } = useStore();

  useEffect(() => {
    if (!userProfile) {
      router.push('/onboarding');
      return;
    }
    
    if (!combinedResult) {
      router.push('/personality');
      return;
    }
    
    setCurrentStep('results');
  }, [userProfile, combinedResult, router, setCurrentStep]);

  if (!combinedResult) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">Cemas.AI</div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Complete Profile
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here's your personalized roadmap combining your Ikigai purpose with your personality type insights.
            </p>
          </div>

          {/* Main Results Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Ikigai Chart */}
            <IkigaiRadarChart 
              scores={combinedResult.ikigai.scores} 
              className="h-fit"
            />
            
            {/* MBTI Card */}
            <MBTICard 
              result={combinedResult.mbti} 
              className="h-fit"
            />
          </div>

          {/* Combined Insights */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Career Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommended Careers</CardTitle>
                <CardDescription>
                  Based on your Ikigai and personality type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {combinedResult.careers.map((career, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-2">
                      {career}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Optimal Work Environment */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Optimal Work Style</CardTitle>
                <CardDescription>
                  How you work best
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {combinedResult.optimalWork.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Blind Spots */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Areas for Growth</CardTitle>
                <CardDescription>
                  Potential blind spots to watch out for
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {combinedResult.blindspots.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Action Plan */}
          <ActionPlanList actionPlan={combinedResult.actionPlan} />

          {/* Next Steps */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-r from-primary/10 to-blue-50 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Get AI Coaching</h3>
                  <p className="text-muted-foreground mb-6">
                    Chat with your personal AI coach to dive deeper into your results, 
                    get specific advice, and stay motivated.
                  </p>
                  <Button asChild size="lg" className="w-full">
                    <Link href="/chat">
                      Chat with AI Coach
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold mb-2">Track Your Progress</h3>
                  <p className="text-muted-foreground mb-6">
                    Visit your dashboard to monitor your action plan progress, 
                    review insights, and take follow-up assessments.
                  </p>
                  <Button asChild size="lg" variant="outline" className="w-full">
                    <Link href="/dashboard">
                      View Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}