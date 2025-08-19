'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InsightCardProps {
  title: string;
  description: string;
  insights: string[];
  icon: LucideIcon;
  color: 'passion' | 'mission' | 'profession' | 'vocation';
  score: number;
}

const colorClasses = {
  passion: 'border-red-200 bg-red-50 text-red-900',
  mission: 'border-blue-200 bg-blue-50 text-blue-900',
  profession: 'border-green-200 bg-green-50 text-green-900',
  vocation: 'border-purple-200 bg-purple-50 text-purple-900'
};

const badgeClasses = {
  passion: 'bg-red-100 text-red-800',
  mission: 'bg-blue-100 text-blue-800',
  profession: 'bg-green-100 text-green-800',
  vocation: 'bg-purple-100 text-purple-800'
};

export function InsightCard({ title, description, insights, icon: Icon, color, score }: InsightCardProps) {
  const getScoreLevel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Moderate';
    return 'Needs Growth';
  };

  return (
    <Card className={`${colorClasses[color]} border-2 transition-all duration-200 hover:shadow-lg`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className="h-6 w-6" />
            <div>
              <CardTitle className="capitalize">{title}</CardTitle>
              <CardDescription className={colorClasses[color]}>
                {description}
              </CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{Math.round(score)}</div>
            <Badge variant="secondary" className={badgeClasses[color]}>
              {getScoreLevel(score)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {insights.map((insight, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-current mt-2 flex-shrink-0" />
              <span className="text-sm leading-relaxed">{insight}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}