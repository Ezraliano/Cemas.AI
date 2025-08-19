'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

const consentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.number().min(13, 'Must be at least 13 years old').max(120, 'Please enter a valid age'),
  mainGoal: z.string().min(1, 'Please select your main goal'),
  consentGiven: z.boolean().refine(val => val === true, 'You must agree to continue')
});

type ConsentForm = z.infer<typeof consentSchema>;

const mainGoals = [
  'Find my life purpose',
  'Improve career satisfaction',
  'Develop self-awareness',
  'Make better life decisions',
  'Understand my strengths',
  'Plan career change',
  'Increase motivation',
  'Other'
];

export function ConsentForm() {
  const router = useRouter();
  const setUserProfile = useStore(state => state.setUserProfile);
  const setCurrentStep = useStore(state => state.setCurrentStep);

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<ConsentForm>({
    resolver: zodResolver(consentSchema)
  });

  const watchedConsent = watch('consentGiven');

  const onSubmit = async (data: ConsentForm) => {
    setUserProfile(data);
    setCurrentStep('ikigai');
    router.push('/ikigai');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome to Cemas.AI</CardTitle>
        <CardDescription className="text-lg">
          Let's start your journey of self-discovery
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Enter your full name"
                className="mt-1"
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                {...register('age', { valueAsNumber: true })}
                placeholder="Enter your age"
                className="mt-1"
              />
              {errors.age && (
                <p className="text-sm text-destructive mt-1">{errors.age.message}</p>
              )}
            </div>

            <div>
              <Label>What's your main goal for this assessment?</Label>
              <Select onValueChange={(value) => setValue('mainGoal', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your main goal" />
                </SelectTrigger>
                <SelectContent>
                  {mainGoals.map((goal) => (
                    <SelectItem key={goal} value={goal}>
                      {goal}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.mainGoal && (
                <p className="text-sm text-destructive mt-1">{errors.mainGoal.message}</p>
              )}
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-muted/50">
            <h3 className="font-semibold mb-3">Privacy & Data Policy</h3>
            <div className="text-sm text-muted-foreground space-y-2 mb-4">
              <p>• Your responses will be used to generate personalized insights</p>
              <p>• Data is stored securely and never shared with third parties</p>
              <p>• You can delete your data at any time</p>
              <p>• Results are for guidance only, not professional advice</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox
                id="consent"
                {...register('consentGiven')}
                checked={watchedConsent || false}
                onCheckedChange={(checked) => setValue('consentGiven', checked as boolean)}
              />
              <Label htmlFor="consent" className="text-sm leading-5">
                I agree to the privacy policy and consent to data processing for assessment purposes
              </Label>
            </div>
            {errors.consentGiven && (
              <p className="text-sm text-destructive mt-1">{errors.consentGiven.message}</p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Start Ikigai Assessment'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}