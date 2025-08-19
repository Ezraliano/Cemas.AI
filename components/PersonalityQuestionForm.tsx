'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useStore } from '@/lib/store';
import { apiClient } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const likertLabels = [
  'Strongly Disagree',
  'Disagree', 
  'Neutral',
  'Agree',
  'Strongly Agree'
];

export function PersonalityQuestionForm() {
  const router = useRouter();
  const { mbtiAnswers, setMBTIAnswer, setMBTIResult, setCombinedResult } = useStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: questions, isLoading } = useQuery({
    queryKey: ['mbtiQuestions'],
    queryFn: apiClient.getMBTIQuestions
  });

  const submitMutation = useMutation({
    mutationFn: apiClient.submitMBTIScore,
    onSuccess: async (result) => {
      setMBTIResult(result);
      // Also fetch combined results
      try {
        const combinedResult = await apiClient.getCombinedResults();
        setCombinedResult(combinedResult);
      } catch (error) {
        console.error('Failed to fetch combined results:', error);
      }
      router.push('/results');
    }
  });

  const currentQuestion = questions?.[currentQuestionIndex];
  const progress = questions ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
  const allAnswered = questions?.every(q => mbtiAnswers[q.id] !== undefined) || false;

  const handleAnswer = (value: string) => {
    if (currentQuestion) {
      setMBTIAnswer(currentQuestion.id, parseInt(value));
      
      // Auto-advance to next question
      if (currentQuestionIndex < (questions?.length || 0) - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex(prev => prev + 1);
        }, 300);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < (questions?.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    if (allAnswered) {
      setIsSubmitting(true);
      submitMutation.mutate(mbtiAnswers);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return <div>No questions available</div>;
  }

  const getDimensionInfo = (dimension: string) => {
    const info = {
      'EI': { label: 'Energy Focus', description: 'How you direct your energy' },
      'SN': { label: 'Information Processing', description: 'How you take in information' },
      'TF': { label: 'Decision Making', description: 'How you make decisions' },
      'JP': { label: 'Lifestyle', description: 'How you organize your life' }
    };
    return info[dimension as keyof typeof info] || { label: dimension, description: '' };
  };

  const dimensionInfo = getDimensionInfo(currentQuestion.dimension);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">16 Personalities Assessment</h2>
                <p className="text-sm text-muted-foreground">Discover your MBTI personality type</p>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <div>Question {currentQuestionIndex + 1} of {questions.length}</div>
                <div>{Math.round(progress)}% Complete</div>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {dimensionInfo.label}
              </span>
              <span className="text-xs text-muted-foreground">
                {dimensionInfo.description}
              </span>
            </div>
            <CardTitle className="text-xl leading-relaxed">
              {currentQuestion.text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={mbtiAnswers[currentQuestion.id]?.toString() || ''}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={value.toString()} id={`option-${value}`} />
                  <Label htmlFor={`option-${value}`} className="flex-1 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span>{likertLabels[value - 1]}</span>
                      <span className="text-sm text-muted-foreground font-mono">{value}</span>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>

        <div className="flex gap-2">
          {currentQuestionIndex < questions.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!mbtiAnswers[currentQuestion.id]}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered || isSubmitting}
              size="lg"
              className="min-w-[150px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Results
                </>
              ) : (
                'Complete Assessment'
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}