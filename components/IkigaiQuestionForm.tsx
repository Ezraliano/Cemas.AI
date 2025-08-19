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

export function IkigaiQuestionForm() {
  const router = useRouter();
  const { ikigaiAnswers, setIkigaiAnswer, setIkigaiResult } = useStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: questions, isLoading } = useQuery({
    queryKey: ['ikigaiQuestions'],
    queryFn: apiClient.getIkigaiQuestions
  });

  const submitMutation = useMutation({
    mutationFn: apiClient.submitIkigaiScore,
    onSuccess: (result) => {
      setIkigaiResult(result);
      router.push('/ikigai/result');
    }
  });

  const currentQuestion = questions?.[currentQuestionIndex];
  const progress = questions ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
  const allAnswered = questions?.every(q => ikigaiAnswers[q.id] !== undefined) || false;

  const handleAnswer = (value: string) => {
    if (currentQuestion) {
      setIkigaiAnswer(currentQuestion.id, parseInt(value));
      
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
      submitMutation.mutate(ikigaiAnswers);
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

  const getDomainColor = (domain: string) => {
    switch (domain) {
      case 'passion': return 'bg-red-100 text-red-800';
      case 'mission': return 'bg-blue-100 text-blue-800';
      case 'profession': return 'bg-green-100 text-green-800';
      case 'vocation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
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
              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getDomainColor(currentQuestion.domain)}`}>
                {currentQuestion.domain}
              </span>
            </div>
            <CardTitle className="text-xl leading-relaxed">
              {currentQuestion.text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={ikigaiAnswers[currentQuestion.id]?.toString() || ''}
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
              disabled={!ikigaiAnswers[currentQuestion.id]}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered || isSubmitting}
              size="lg"
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing
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