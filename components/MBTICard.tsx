'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MBTIResult } from '@/types/mbti';

interface MBTICardProps {
  result: MBTIResult;
  className?: string;
}

export function MBTICard({ result, className }: MBTICardProps) {
  const getDimensionLabels = (dim: string) => {
    const labels = {
      'EI': ['Introvert', 'Extravert'],
      'SN': ['Sensing', 'Intuition'],
      'TF': ['Thinking', 'Feeling'],
      'JP': ['Judging', 'Perceiving']
    };
    return labels[dim as keyof typeof labels] || ['', ''];
  };

  const getTypeColor = (type: string) => {
    // Analyst types (NT)
    if (type.includes('NT')) return 'bg-purple-100 text-purple-900 border-purple-200';
    // Diplomat types (NF) 
    if (type.includes('NF')) return 'bg-green-100 text-green-900 border-green-200';
    // Sentinel types (SJ)
    if (type.includes('SJ')) return 'bg-blue-100 text-blue-900 border-blue-200';
    // Explorer types (SP)
    if (type.includes('SP')) return 'bg-orange-100 text-orange-900 border-orange-200';
    return 'bg-gray-100 text-gray-900 border-gray-200';
  };

  return (
    <Card className={`${className} ${getTypeColor(result.type)} border-2`}>
      <CardHeader className="text-center">
        <div className="space-y-2">
          <div className="text-4xl font-bold tracking-wider">{result.type}</div>
          <CardTitle className="text-xl">{result.description}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dimension Bars */}
        <div className="space-y-4">
          <h3 className="font-semibold">Personality Dimensions</h3>
          {Object.entries(result.dimensions).map(([dim, score]) => {
            const labels = getDimensionLabels(dim);
            const isHigher = score > 50;
            return (
              <div key={dim} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className={!isHigher ? 'font-medium' : ''}>{labels[0]}</span>
                  <span className="font-mono">{Math.round(score)}%</span>
                  <span className={isHigher ? 'font-medium' : ''}>{labels[1]}</span>
                </div>
                <Progress value={score} className="h-2" />
              </div>
            );
          })}
        </div>

        {/* Strengths */}
        <div>
          <h3 className="font-semibold mb-3">Key Strengths</h3>
          <div className="flex flex-wrap gap-2">
            {result.strengths.map((strength, index) => (
              <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                {strength}
              </Badge>
            ))}
          </div>
        </div>

        {/* Growth Areas */}
        <div>
          <h3 className="font-semibold mb-3">Growth Areas</h3>
          <div className="flex flex-wrap gap-2">
            {result.weaknesses.map((weakness, index) => (
              <Badge key={index} variant="outline" className="border-orange-200 text-orange-800">
                {weakness}
              </Badge>
            ))}
          </div>
        </div>

        {/* Work Style */}
        <div>
          <h3 className="font-semibold mb-3">Work Style Preferences</h3>
          <ul className="space-y-1">
            {result.workStyle.map((style, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {style}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}