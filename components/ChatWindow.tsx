'use client';

import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageBubble } from './MessageBubble';
import { Composer } from './Composer';
import { useStore } from '@/lib/store';
import { apiClient } from '@/lib/api';
import { ChatMessage } from '@/types/results';
import { Sparkles } from 'lucide-react';

const SUGGESTED_PROMPTS = [
  "What should be my first step this week?",
  "How can I better align my work with my passions?",
  "What careers would suit my personality type?",
  "How do I overcome my identified blind spots?",
  "What habits should I develop for growth?"
];

export function ChatWindow() {
  const { chatMessages, addChatMessage, combinedResult } = useStore();
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    addChatMessage(userMessage);

    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Call API
      const response = await apiClient.sendChatMessage(content, chatMessages);
      
      // Add AI response
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      addChatMessage(aiMessage);
    } catch (error) {
      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I'm having trouble responding right now. Please try again.",
        timestamp: new Date()
      };
      addChatMessage(errorMessage);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <Card className="flex flex-col h-[600px]">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-semibold">AI Life Coach</h3>
            <p className="text-sm text-muted-foreground">
              Get personalized guidance based on your assessment results
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {chatMessages.length === 0 && (
            <div className="text-center py-8">
              <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">Welcome to your AI Coach!</h3>
              <p className="text-sm text-muted-foreground mb-6">
                I'm here to help you understand your results and create an action plan.
                {combinedResult ? ' I have access to your Ikigai and personality assessment results.' : ''}
              </p>
              
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-medium">Try asking:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {SUGGESTED_PROMPTS.slice(0, 3).map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestedPrompt(prompt)}
                      className="text-xs"
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {chatMessages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="bg-muted px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Suggested Prompts (when chat is not empty) */}
      {chatMessages.length > 0 && (
        <div className="px-4 py-2 border-t bg-muted/30">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {SUGGESTED_PROMPTS.map((prompt, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => handleSuggestedPrompt(prompt)}
                className="text-xs whitespace-nowrap"
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Composer */}
      <Composer
        onSend={handleSendMessage}
        disabled={isTyping}
        placeholder="Ask about your results, get advice, or request specific guidance..."
      />
    </Card>
  );
}