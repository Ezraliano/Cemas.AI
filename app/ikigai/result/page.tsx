'use client';

import { IkigaiRadarChart } from '@/components/IkigaiRadarChart';
import { InsightCard } from '@/components/InsightCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { ArrowRight, Heart, Target, Brain, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function IkigaiResultPage() {
  const router = useRouter();
  const { ikigaiResult, userProfile, setCurrentStep } = useStore();

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

  if (!ikigaiResult) {
    return null;
  }

  const domainInsights = [
    {
      domain: 'passion',
      title: 'Passion',
      description: 'What you love doing',
      icon: Heart,
      color: 'passion' as const,
      score: ikigaiResult.scores.passion,
      insights: ikigaiResult.insights.filter(insight => 
        insight.toLowerCase().includes('passion')
      ).slice(0, 1).concat([
        'Focus on activities that energize and excite you',
        'Consider how to incorporate more passion into daily work',
        'Explore new interests that align with your core values'
      ])
    },
    {
      domain: 'mission',
      title: 'Mission',
      description: 'What the world needs from you',
      icon: Target,
      color: 'mission' as const,
      score: ikigaiResult.scores.mission,
      insights: ikigaiResult.insights.filter(insight => 
        insight.toLowerCase().includes('mission')
      ).slice(0, 1).concat([
        'Identify causes and problems you care about solving',
        'Look for ways to contribute to something meaningful',
        'Connect your work to a larger purpose'
      ])
    },
    {
      domain: 'profession',
      title: 'Profession',
      description: 'What you are good at',
      icon: Brain,
      color: 'profession' as const,
      score: ikigaiResult.scores.profession,
      insights: ikigaiResult.insights.filter(insight => 
        insight.toLowerCase().includes('profession')
      ).slice(0, 1).concat([
        'Continuously develop and refine your key strengths',
        'Seek opportunities to use your natural talents',
        'Consider skills that complement your existing abilities'
      ])
    },
    {
      domain: 'vocation',
      title: 'Vocation',
      description: 'What you can be paid for',
      icon: DollarSign,
      color: 'vocation' as const,
      score: ikigaiResult.scores.vocation,
      insights: ikigaiResult.insights.filter(insight => 
        insight.toLowerCase().includes('vocation')
      ).slice(0, 1).concat([
        'Research market demand for your skills',
        'Explore monetization opportunities',
        'Consider multiple income streams from your talents'
      ])
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">Cemas.AI</div>
          <div className="text-sm text-muted-foreground">
            Ikigai Results
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Ikigai Profile
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here's what we discovered about your life purpose across the four key dimensions of Ikigai.
            </p>
          </div>

          {/* Radar Chart */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <IkigaiRadarChart scores={ikigaiResult.scores} />
            </div>
            
            {/* Summary */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Your Ikigai Summary</CardTitle>
                  <CardDescription>
                    Key insights from your assessment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ikigaiResult.insights.map((insight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-sm leading-relaxed">{insight}</p>
                    </div>
                  ))}
                  
                  <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                    <h3 className="font-semibold mb-2">What's Next?</h3>
                    <p className="text-sm text-muted-foreground">
                      Now that we understand your Ikigai profile, let's discover your personality type 
                      to create a complete picture of who you are and how you work best.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Domain Insights */}
          <div className="grid md:grid-cols-2 gap-6">
            {domainInsights.map((domain) => (
              <InsightCard
                key={domain.domain}
                title={domain.title}
                description={domain.description}
                insights={domain.insights}
                icon={domain.icon}
                color={domain.color}
                score={domain.score}
              />
            ))}
          </div>

          {/* Continue CTA */}
          <Card className="bg-gradient-to-r from-primary/10 to-blue-50 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Ready for the Next Step?</h3>
                <p className="text-muted-foreground mb-6">
                  Complete your personality assessment to get the full picture of your strengths, 
                  work style, and ideal career paths.
                </p>
                <Button asChild size="lg" className="min-w-[200px]">
                  <Link href="/personality">
                    Continue to Personality Test
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}