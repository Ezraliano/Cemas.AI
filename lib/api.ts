import { IkigaiQuestion, IkigaiResult, IkigaiScores } from '@/types/ikigai';
import { MBTIQuestion, MBTIResult } from '@/types/mbti';
import { CombinedResult, ChatMessage } from '@/types/results';

// Mock data
const mockIkigaiQuestions: IkigaiQuestion[] = [
  { id: 'p1', domain: 'passion', text: 'I feel energized when working on activities I love' },
  { id: 'p2', domain: 'passion', text: 'I often lose track of time doing things I enjoy' },
  { id: 'p3', domain: 'passion', text: 'I would do certain activities even without payment' },
  { id: 'p4', domain: 'passion', text: 'I feel excited talking about my hobbies and interests' },
  { id: 'p5', domain: 'passion', text: 'I actively seek opportunities to engage in my interests' },
  
  { id: 'm1', domain: 'mission', text: 'I feel fulfilled when helping others or making a difference' },
  { id: 'm2', domain: 'mission', text: 'I have a strong sense of what the world needs' },
  { id: 'm3', domain: 'mission', text: 'I am motivated by causes greater than myself' },
  { id: 'm4', domain: 'mission', text: 'I want my work to have a positive impact on society' },
  { id: 'm5', domain: 'mission', text: 'I feel responsible for contributing to positive change' },
  
  { id: 'pr1', domain: 'profession', text: 'I am skilled at activities that come naturally to me' },
  { id: 'pr2', domain: 'profession', text: 'Others often compliment me on my abilities' },
  { id: 'pr3', domain: 'profession', text: 'I can perform certain tasks better than most people' },
  { id: 'pr4', domain: 'profession', text: 'I have developed expertise in specific areas' },
  { id: 'pr5', domain: 'profession', text: 'I feel confident in my core competencies' },
  
  { id: 'v1', domain: 'vocation', text: 'I can earn money from my skills and knowledge' },
  { id: 'v2', domain: 'vocation', text: 'There is market demand for what I can offer' },
  { id: 'v3', domain: 'vocation', text: 'I can create sustainable income from my abilities' },
  { id: 'v4', domain: 'vocation', text: 'People are willing to pay for my expertise' },
  { id: 'v5', domain: 'vocation', text: 'I see clear career paths using my strengths' },
];

const mockMBTIQuestions: MBTIQuestion[] = [
  // Extraversion vs Introversion
  { id: 'ei1', text: 'I enjoy being the center of attention at parties', dimension: 'EI' },
  { id: 'ei2', text: 'I prefer working alone rather than in groups', dimension: 'EI', reverse: true },
  { id: 'ei3', text: 'I feel energized after social gatherings', dimension: 'EI' },
  { id: 'ei4', text: 'I need quiet time to recharge after being around people', dimension: 'EI', reverse: true },
  { id: 'ei5', text: 'I easily start conversations with strangers', dimension: 'EI' },
  
  // Sensing vs Intuition
  { id: 'sn1', text: 'I focus on concrete facts rather than possibilities', dimension: 'SN', reverse: true },
  { id: 'sn2', text: 'I enjoy exploring new ideas and concepts', dimension: 'SN' },
  { id: 'sn3', text: 'I prefer practical solutions over theoretical ones', dimension: 'SN', reverse: true },
  { id: 'sn4', text: 'I like to think about future possibilities', dimension: 'SN' },
  { id: 'sn5', text: 'I trust my instincts more than detailed analysis', dimension: 'SN' },
  
  // Thinking vs Feeling
  { id: 'tf1', text: 'I make decisions based on logic rather than emotions', dimension: 'TF', reverse: true },
  { id: 'tf2', text: 'I consider how decisions affect people\'s feelings', dimension: 'TF' },
  { id: 'tf3', text: 'I value harmony in relationships over being right', dimension: 'TF' },
  { id: 'tf4', text: 'I prefer objective analysis when solving problems', dimension: 'TF', reverse: true },
  { id: 'tf5', text: 'I am sensitive to others\' emotional needs', dimension: 'TF' },
  
  // Judging vs Perceiving
  { id: 'jp1', text: 'I prefer to have a clear plan before starting projects', dimension: 'JP', reverse: true },
  { id: 'jp2', text: 'I enjoy keeping my options open', dimension: 'JP' },
  { id: 'jp3', text: 'I like to complete tasks well before deadlines', dimension: 'JP', reverse: true },
  { id: 'jp4', text: 'I adapt easily to unexpected changes', dimension: 'JP' },
  { id: 'jp5', text: 'I prefer structure and organization in my life', dimension: 'JP', reverse: true },
];

// API functions
export const apiClient = {
  // Ikigai endpoints
  getIkigaiQuestions: async (): Promise<IkigaiQuestion[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return mockIkigaiQuestions;
  },

  submitIkigaiScore: async (answers: Record<string, number>): Promise<IkigaiResult> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Calculate scores
    const scores: IkigaiScores = {
      passion: 0,
      mission: 0,
      profession: 0,
      vocation: 0
    };

    // Calculate average scores for each domain
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = mockIkigaiQuestions.find(q => q.id === questionId);
      if (question) {
        scores[question.domain] += answer;
      }
    });

    // Average and normalize to 0-100 scale
    scores.passion = (scores.passion / 5) * 20;
    scores.mission = (scores.mission / 5) * 20;
    scores.profession = (scores.profession / 5) * 20;
    scores.vocation = (scores.vocation / 5) * 20;

    const insights = [
      `Your passion score of ${Math.round(scores.passion)} indicates ${scores.passion > 70 ? 'strong alignment' : scores.passion > 40 ? 'moderate alignment' : 'areas for growth'} with activities you love.`,
      `Your mission score of ${Math.round(scores.mission)} shows ${scores.mission > 70 ? 'clear purpose' : scores.mission > 40 ? 'developing purpose' : 'need for purpose exploration'}.`,
      `Your profession score of ${Math.round(scores.profession)} reflects ${scores.profession > 70 ? 'well-developed skills' : scores.profession > 40 ? 'growing competencies' : 'skill development opportunities'}.`,
      `Your vocation score of ${Math.round(scores.vocation)} suggests ${scores.vocation > 70 ? 'strong market alignment' : scores.vocation > 40 ? 'moderate opportunities' : 'need for market exploration'}.`
    ];

    return { scores, insights };
  },

  // MBTI endpoints
  getMBTIQuestions: async (): Promise<MBTIQuestion[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockMBTIQuestions;
  },

  submitMBTIScore: async (answers: Record<string, number>): Promise<MBTIResult> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const dimensions = { EI: 0, SN: 0, TF: 0, JP: 0 };
    const counts = { EI: 0, SN: 0, TF: 0, JP: 0 };

    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = mockMBTIQuestions.find(q => q.id === questionId);
      if (question) {
        const score = question.reverse ? (6 - answer) : answer;
        dimensions[question.dimension] += score;
        counts[question.dimension]++;
      }
    });

    // Normalize scores
    Object.keys(dimensions).forEach(key => {
      const dim = key as keyof typeof dimensions;
      dimensions[dim] = (dimensions[dim] / counts[dim] / 5) * 100;
    });

    // Determine type
    const type = 
      (dimensions.EI > 50 ? 'E' : 'I') +
      (dimensions.SN > 50 ? 'N' : 'S') +
      (dimensions.TF > 50 ? 'F' : 'T') +
      (dimensions.JP > 50 ? 'P' : 'J');

    const typeDescriptions: Record<string, any> = {
      'INTJ': {
        strengths: ['Strategic thinking', 'Independent', 'Determined', 'Innovative'],
        weaknesses: ['Can be overly critical', 'Impatient with inefficiency', 'May ignore emotions'],
        workStyle: ['Prefers autonomy', 'Long-term planning', 'Complex problem solving'],
        description: 'The Architect - Imaginative and strategic thinkers, with a plan for everything.'
      },
      'ENFP': {
        strengths: ['Enthusiastic', 'Creative', 'Flexible', 'Good with people'],
        weaknesses: ['Can be unfocused', 'Dislikes routine', 'Overthinks criticism'],
        workStyle: ['Collaborative', 'Variety in tasks', 'People-focused projects'],
        description: 'The Campaigner - Enthusiastic, creative and sociable free spirits.'
      },
      // Add more types as needed...
    };

    const result = typeDescriptions[type] || {
      strengths: ['Analytical', 'Reliable', 'Creative', 'Empathetic'],
      weaknesses: ['Can be perfectionist', 'May avoid conflict', 'Sensitive to stress'],
      workStyle: ['Balanced approach', 'Team collaboration', 'Quality focused'],
      description: `The ${type} type - A unique combination of traits and preferences.`
    };

    return {
      type,
      dimensions,
      ...result
    };
  },

  // Combined results
  getCombinedResults: async (): Promise<CombinedResult> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // This would typically combine the stored results
    return {
      ikigai: {
        scores: { passion: 75, mission: 68, profession: 82, vocation: 71 },
        insights: ['Strong alignment with personal interests', 'Clear sense of purpose']
      },
      mbti: {
        type: 'ENFP',
        dimensions: { EI: 72, SN: 84, TF: 76, JP: 68 },
        strengths: ['Enthusiastic', 'Creative', 'Flexible'],
        weaknesses: ['Can be unfocused', 'Dislikes routine'],
        workStyle: ['Collaborative', 'Variety in tasks'],
        description: 'The Campaigner'
      },
      careers: ['UX Designer', 'Marketing Manager', 'Consultant', 'Teacher'],
      optimalWork: ['Creative projects', 'Team collaboration', 'Flexible schedules', 'Meaningful impact'],
      blindspots: ['May avoid routine tasks', 'Can struggle with details', 'Needs structure for follow-through'],
      actionPlan: [
        {
          horizon: '1w',
          steps: ['Identify your top 3 passions', 'Set up a daily reflection practice', 'Connect with like-minded people']
        },
        {
          horizon: '1m',
          steps: ['Explore career opportunities', 'Develop a skill-building plan', 'Create accountability systems']
        },
        {
          horizon: '3m',
          steps: ['Launch a passion project', 'Build professional network', 'Establish long-term goals']
        }
      ]
    };
  },

  // Chat endpoint
  sendChatMessage: async (message: string, history: ChatMessage[]): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const responses = [
      "Based on your Ikigai and personality results, I'd recommend starting with small steps that align with your passions. What specific area interests you most?",
      "Your ENFP personality suggests you thrive in collaborative environments. Consider projects that involve working with others and making a positive impact.",
      "Given your strong passion scores, focus on activities that energize you. This is where you'll find your greatest motivation and success.",
      "Your results show great potential for creative careers. What skills would you like to develop first to move in that direction?",
      "I notice your mission scores are strong. How can you incorporate more purpose-driven activities into your daily routine?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
};