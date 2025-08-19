'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Brain, Heart, Target, Users, Sparkles, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const valueProps = [
  {
    icon: Heart,
    title: "Discover Your Ikigai",
    description: "Find the perfect intersection of what you love, what you're good at, what the world needs, and what you can be paid for.",
    features: ["Passion mapping", "Purpose alignment", "Skill assessment"]
  },
  {
    icon: Brain,
    title: "Know Your Personality",
    description: "Understand your MBTI type with a comprehensive 16 personalities assessment tailored for professional growth.",
    features: ["MBTI analysis", "Work style insights", "Team dynamics"]
  },
  {
    icon: Target,
    title: "Get Your Action Plan",
    description: "Receive personalized recommendations combining your Ikigai and personality results for maximum impact.",
    features: ["1-week quick wins", "1-month milestones", "3-month goals"]
  },
  {
    icon: Sparkles,
    title: "AI-Powered Coaching",
    description: "Chat with your personal AI coach to get guidance, answer questions, and stay motivated on your journey.",
    features: ["24/7 availability", "Personalized advice", "Progress tracking"]
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">Cemas.AI</div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-muted-foreground hover:text-primary">
              Dashboard
            </Link>
            <Link href="/chat" className="text-muted-foreground hover:text-primary">
              AI Coach
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            ✨ AI-Powered Self-Discovery
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Cemas.AI
            <span className="block text-3xl md:text-4xl text-primary mt-2">
              Your AI-Powered Mental Clarity & Productivity Booster
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Discover your life purpose through Ikigai assessment, understand your personality type, 
            and get personalized action plans powered by AI coaching.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/onboarding">
                Start Ikigai Test
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="/dashboard">
                View Dashboard
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Value Propositions */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Cemas.AI?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our comprehensive approach combines ancient wisdom with modern psychology and AI technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {valueProps.map((prop, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <prop.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{prop.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {prop.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {prop.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete your assessments in under 30 minutes and get insights that last a lifetime
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Profile Setup", desc: "Share basic info and consent", time: "2 min" },
              { step: "2", title: "Ikigai Assessment", desc: "20 questions on passion, mission, profession, vocation", time: "10 min" },
              { step: "3", title: "Personality Test", desc: "MBTI assessment with 20 questions", time: "15 min" },
              { step: "4", title: "Get Results & Chat", desc: "Personalized insights and AI coaching", time: "Ongoing" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{item.desc}</p>
                <Badge variant="secondary" className="text-xs">
                  {item.time}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Discover Your Purpose?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of people who have found clarity, purpose, and direction through our AI-powered assessments.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/onboarding">
                Begin Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">Cemas.AI</div>
            <p className="text-gray-400 text-sm">
              Empowering personal growth through AI-powered self-discovery
            </p>
            <div className="mt-4 text-xs text-gray-500">
              © 2024 Cemas.AI. Results are for guidance only, not professional advice.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}