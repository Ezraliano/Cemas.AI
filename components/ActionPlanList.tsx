'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Clock, Target } from 'lucide-react';
import { useState } from 'react';

interface ActionPlanProps {
  actionPlan: { horizon: "1w" | "1m" | "3m"; steps: string[] }[];
  className?: string;
}

const horizonInfo = {
  '1w': { 
    label: '1 Week', 
    description: 'Quick wins to get started',
    color: 'bg-green-100 text-green-800',
    icon: Target
  },
  '1m': { 
    label: '1 Month', 
    description: 'Building momentum and habits',
    color: 'bg-blue-100 text-blue-800',
    icon: Clock
  },
  '3m': { 
    label: '3 Months', 
    description: 'Long-term strategic moves',
    color: 'bg-purple-100 text-purple-800',
    icon: Calendar
  }
};

export function ActionPlanList({ actionPlan, className }: ActionPlanProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Your Personalized Action Plan
        </CardTitle>
        <CardDescription>
          Step-by-step guidance based on your Ikigai and personality results
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {actionPlan.map((phase, phaseIndex) => {
          const info = horizonInfo[phase.horizon];
          const Icon = info.icon;
          
          return (
            <div key={phase.horizon} className="space-y-4">
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{info.label}</h3>
                    <Badge variant="secondary" className={info.color}>
                      {info.description}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="ml-8 space-y-3">
                {phase.steps.map((step, stepIndex) => {
                  const stepId = `${phase.horizon}-${stepIndex}`;
                  const isCompleted = completedSteps.has(stepId);
                  
                  return (
                    <div key={stepIndex} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <Checkbox
                        id={stepId}
                        checked={isCompleted}
                        onCheckedChange={() => toggleStep(stepId)}
                        className="mt-0.5"
                      />
                      <label 
                        htmlFor={stepId} 
                        className={`flex-1 text-sm cursor-pointer leading-relaxed ${
                          isCompleted ? 'line-through text-muted-foreground' : ''
                        }`}
                      >
                        {step}
                      </label>
                    </div>
                  );
                })}
              </div>
              
              {phaseIndex < actionPlan.length - 1 && (
                <div className="ml-4 h-4 w-px bg-border" />
              )}
            </div>
          );
        })}
        
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>💡 Pro Tip:</strong> Focus on completing the 1-week actions first. 
            Small consistent steps lead to meaningful long-term changes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}