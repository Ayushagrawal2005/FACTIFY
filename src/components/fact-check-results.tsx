import type { FactCheckResult } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, AlertTriangle, Scale, List, Link } from 'lucide-react';
import { Progress } from './ui/progress';

const VerdictDisplay = ({ verdict, confidence, reason }: { verdict: string, confidence: string, reason: string }) => {
  const lowerVerdict = verdict.toLowerCase();
  
  let IconComponent;
  let colorClasses;
  let progressValue = 50;
  
  if (lowerVerdict.includes('true') || lowerVerdict.includes('correct') || lowerVerdict.includes('accurate')) {
    IconComponent = <CheckCircle2 className="h-10 w-10 text-green-500" />;
    colorClasses = 'border-green-500/80 bg-green-500/5';
  } else if (lowerVerdict.includes('false') || lowerVerdict.includes('incorrect')) {
    IconComponent = <XCircle className="h-10 w-10 text-destructive" />;
    colorClasses = 'border-destructive/80 bg-destructive/5';
  } else {
    IconComponent = <AlertTriangle className="h-10 w-10 text-yellow-500" />;
    colorClasses = 'border-yellow-500/80 bg-yellow-500/5';
  }

  const lowerConfidence = confidence.toLowerCase();
  if (lowerConfidence.includes('high')) progressValue = 90;
  if (lowerConfidence.includes('medium')) progressValue = 60;
  if (lowerConfidence.includes('low')) progressValue = 30;

  return (
    <Card className={cn('w-full transition-all duration-300 border-2', colorClasses)}>
      <CardHeader>
        <div className="flex items-start gap-4">
          {IconComponent}
          <div className="flex-1">
            <CardTitle className="text-3xl font-headline">{verdict}</CardTitle>
            <CardDescription className="text-base mt-1">
              {reason}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Scale className="h-4 w-4" />
            <span>Confidence: <span className="font-semibold text-foreground">{confidence}</span></span>
          </div>
          <Progress value={progressValue} className="mt-2 h-2" />
      </CardContent>
    </Card>
  );
};

export function FactCheckResults({ data }: { data: FactCheckResult }) {
  const totalSources = data.supportingEvidence.length + data.counterEvidence.length + data.references.length;

  return (
    <div className="space-y-8 animate-in fade-in-0 duration-500">
      <div>
        <p className="text-sm font-semibold text-primary uppercase tracking-wider">Claim Analyzed</p>
        <h2 className="text-2xl md:text-3xl font-bold font-headline mt-1">
          &ldquo;{data.claim}&rdquo;
        </h2>
      </div>

      <VerdictDisplay verdict={data.verdict} confidence={data.confidenceLevel} reason={data.reason} />

      <Card>
        <CardHeader>
          <CardTitle>Evidence Breakdown</CardTitle>
          <CardDescription>A summary of the evidence found for and against the claim. Total sources considered: {totalSources}.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full" defaultValue="supporting-evidence">
            <AccordionItem value="supporting-evidence">
              <AccordionTrigger className="text-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Supporting Evidence ({data.supportingEvidence.length})
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <ul className="space-y-3 list-disc pl-5 text-muted-foreground">
                  {data.supportingEvidence.length > 0 ? (
                     data.supportingEvidence.map((item, index) => <li key={index}>{item}</li>)
                  ) : (
                    <li>No specific supporting evidence found.</li>
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="counter-evidence">
              <AccordionTrigger className="text-lg">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-destructive" />
                  Counter Evidence ({data.counterEvidence.length})
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                 <ul className="space-y-3 list-disc pl-5 text-muted-foreground">
                  {data.counterEvidence.length > 0 ? (
                     data.counterEvidence.map((item, index) => <li key={index}>{item}</li>)
                  ) : (
                    <li>No specific counter evidence found.</li>
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="references">
              <AccordionTrigger className="text-lg">
                <div className="flex items-center gap-2">
                  <Link className="h-5 w-5 text-primary" />
                  API References ({data.references.length})
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                 <ul className="space-y-3 list-disc pl-5 text-muted-foreground">
                  {data.references.length > 0 ? (
                     data.references.map((item, index) => <li key={index}>{item}</li>)
                  ) : (
                    <li>No API references available.</li>
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
