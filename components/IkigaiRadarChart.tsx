'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { IkigaiScores } from '@/types/ikigai';

interface IkigaiRadarChartProps {
  scores: IkigaiScores;
  className?: string;
}

export function IkigaiRadarChart({ scores, className }: IkigaiRadarChartProps) {
  const data = [
    {
      domain: 'Passion',
      value: scores.passion,
      fullMark: 100,
    },
    {
      domain: 'Mission',
      value: scores.mission,
      fullMark: 100,
    },
    {
      domain: 'Profession',
      value: scores.profession,
      fullMark: 100,
    },
    {
      domain: 'Vocation',
      value: scores.vocation,
      fullMark: 100,
    },
  ];

  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <CardTitle>Your Ikigai Profile</CardTitle>
        <CardDescription>
          Your scores across the four key dimensions of Ikigai
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
              <PolarGrid gridType="polygon" className="opacity-30" />
              <PolarAngleAxis 
                dataKey="domain" 
                className="text-sm font-medium"
                tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                tickCount={6}
              />
              <Radar
                name="Ikigai Score"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.2}
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          {data.map((item) => (
            <div key={item.domain} className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary">{Math.round(item.value)}</div>
              <div className="text-sm text-muted-foreground">{item.domain}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}