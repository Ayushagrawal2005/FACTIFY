'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { performFactCheck } from '@/app/actions';
import type { FactCheckResult } from '@/types';
import { FactCheckResults } from '@/components/fact-check-results';
import { Loader2, Search, ArrowRight, Lightbulb, ShieldCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function Home() {
  const [result, setResult] = useState<FactCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = React.useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleFactCheck = async (formData: FormData) => {
    setResult(null);
    setError(null);
    
    startTransition(async () => {
      const response = await performFactCheck(formData);
      if (response.success && response.data) {
        setResult(response.data);
      } else {
        const errorMessage = response.error || 'An unknown error occurred.';
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "Fact-check Failed",
          description: errorMessage,
        })
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative text-center py-20 md:py-32 bg-card animate-in fade-in duration-1000">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{backgroundImage: "url('https://picsum.photos/1600/900?grayscale')"}} data-ai-hint="abstract background"
          ></div>
          <div className="container mx-auto px-4 relative">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 tracking-tight">
              Uncover the Truth, Instantly
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Paste an article, a statement, or a URL. Our AI will analyze the claims, gather evidence, and deliver a clear verdict.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" className="text-lg py-7 px-8">
                <Link href="#fact-checker">Start Fact-Checking <ArrowRight className="ml-2" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg py-7 px-8">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Fact-checker input section */}
        <section id="fact-checker" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card className="shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-headline">Factify Analyzer</CardTitle>
                  <CardDescription>Enter text or a URL to begin your analysis.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    ref={formRef}
                    action={handleFactCheck}
                    className="space-y-4"
                  >
                    <Textarea
                      name="textInput"
                      placeholder="e.g., 'The moon is made of cheese.' or 'https://example.com/article'"
                      className="min-h-[150px] text-base p-4 bg-background"
                      required
                      disabled={isPending}
                    />
                    <Button
                      type="submit"
                      className="w-full text-lg py-6"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-5 w-5" />
                          Factify
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Results section */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="mt-12 max-w-4xl mx-auto">
              {isPending && (
                <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-lg animate-in fade-in duration-500">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-muted-foreground font-semibold">Gathering evidence and generating verdict...</p>
                </div>
              )}
              {error && !isPending && (
                <Alert variant="destructive" className="max-w-2xl mx-auto">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {result && !isPending && <FactCheckResults data={result} />}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Why Choose Factify?</h2>
              <p className="text-muted-foreground mt-4 text-lg">
                We provide a comprehensive and unbiased analysis to help you navigate the complex world of information.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                  <ArrowRight className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Analysis</h3>
                <p className="text-muted-foreground">Our AI goes beyond simple checks, analyzing context, sources, and potential biases.</p>
              </div>
              <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-400">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                   <Lightbulb className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Evidence-Based Verdicts</h3>
                <p className="text-muted-foreground">We show you the evidence, both for and against a claim, so you can make your own informed decision.</p>
              </div>
              <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-600">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fighting Misinformation</h3>
                <p className="text-muted-foreground">Join us in the mission to create a more informed and truthful digital world.</p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
