import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, CombinedResult, ChatMessage } from '@/types/results';
import { IkigaiResult, IkigaiScores } from '@/types/ikigai';
import { MBTIResult } from '@/types/mbti';

interface AppState {
  // User data
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  
  // Assessment progress
  ikigaiAnswers: Record<string, number>;
  mbtiAnswers: Record<string, number>;
  setIkigaiAnswer: (questionId: string, answer: number) => void;
  setMBTIAnswer: (questionId: string, answer: number) => void;
  
  // Results
  ikigaiResult: IkigaiResult | null;
  mbtiResult: MBTIResult | null;
  combinedResult: CombinedResult | null;
  setIkigaiResult: (result: IkigaiResult) => void;
  setMBTIResult: (result: MBTIResult) => void;
  setCombinedResult: (result: CombinedResult) => void;
  
  // Chat
  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  clearChat: () => void;
  
  // Progress
  currentStep: 'onboarding' | 'ikigai' | 'personality' | 'results' | 'completed';
  setCurrentStep: (step: AppState['currentStep']) => void;
  
  // Reset
  resetAssessment: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      userProfile: null,
      ikigaiAnswers: {},
      mbtiAnswers: {},
      ikigaiResult: null,
      mbtiResult: null,
      combinedResult: null,
      chatMessages: [],
      currentStep: 'onboarding',
      
      // Actions
      setUserProfile: (profile) => set({ userProfile: profile }),
      
      setIkigaiAnswer: (questionId, answer) => set((state) => ({
        ikigaiAnswers: { ...state.ikigaiAnswers, [questionId]: answer }
      })),
      
      setMBTIAnswer: (questionId, answer) => set((state) => ({
        mbtiAnswers: { ...state.mbtiAnswers, [questionId]: answer }
      })),
      
      setIkigaiResult: (result) => set({ ikigaiResult: result }),
      setMBTIResult: (result) => set({ mbtiResult: result }),
      setCombinedResult: (result) => set({ combinedResult: result }),
      
      addChatMessage: (message) => set((state) => ({
        chatMessages: [...state.chatMessages, message]
      })),
      
      clearChat: () => set({ chatMessages: [] }),
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      resetAssessment: () => set({
        ikigaiAnswers: {},
        mbtiAnswers: {},
        ikigaiResult: null,
        mbtiResult: null,
        combinedResult: null,
        chatMessages: [],
        currentStep: 'onboarding'
      })
    }),
    {
      name: 'cemas-ai-storage',
      partialize: (state) => ({
        userProfile: state.userProfile,
        ikigaiAnswers: state.ikigaiAnswers,
        mbtiAnswers: state.mbtiAnswers,
        ikigaiResult: state.ikigaiResult,
        mbtiResult: state.mbtiResult,
        combinedResult: state.combinedResult,
        currentStep: state.currentStep
      })
    }
  )
);