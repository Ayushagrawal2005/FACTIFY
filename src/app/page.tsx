'use client';

import React, { useState, useTransition } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { performFactCheck } from '@/app/actions';
import type { FactCheckResult } from '@/types';
import { FactCheckResults } from '@/components/fact-check-results';
import { Loader2, Search } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Header } from '@/components/header';
import { useToast } from '@/hooks/use-toast';

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
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
            Uncover the Truth
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Paste an article, a statement, or a URL. Our AI will analyze the claims, gather evidence, and deliver a clear verdict.
          </p>
        </section>

        <section className="max-w-2xl mx-auto">
          <form
            ref={formRef}
            action={handleFactCheck}
            className="space-y-4"
          >
            <Textarea
              name="textInput"
              placeholder="Enter text or URL to fact-check..."
              className="min-h-[150px] text-base p-4 bg-card"
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
        </section>

        <section className="mt-12 max-w-4xl mx-auto">
          {isPending && (
             <div className="flex flex-col items-center justify-center gap-4 p-8 rounded-lg">
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
        </section>
      </main>
    </div>
  );
}
