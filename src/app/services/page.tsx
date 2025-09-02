import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle2, Bot, FileText } from "lucide-react";
import Image from "next/image";

export default function ServicesPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="py-20 md:py-32 bg-card animate-in fade-in duration-1000">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 tracking-tight">
                        Our Services
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Leveraging cutting-edge AI to provide a suite of tools for information verification and analysis.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
                            <CardHeader>
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                                    <FileText className="h-8 w-8" />
                                </div>
                                <CardTitle className="text-2xl">Claim Extraction</CardTitle>
                                <CardDescription>
                                    Our AI automatically identifies the key claims within a body of text or an article, saving you the effort of manual review.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" /><span>Analyze news articles, blog posts, and social media content.</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" /><span>Isolates verifiable statements for focused fact-checking.</span></li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-400">
                            <CardHeader>
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                                    <Bot className="h-8 w-8" />
                                </div>
                                <CardTitle className="text-2xl">Evidence Gathering</CardTitle>
                                <CardDescription>
                                    For each claim, our system scours the web for both supporting and contradictory evidence from a wide range of sources.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" /><span>Presents a balanced view by showing all sides of the story.</span></li>
                                    <li className="flex items-start"><CheckCircle2 className className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" /><span>Considers context and source reputation in its analysis.</span></li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-600">
                            <CardHeader>
                                 <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                                    <CheckCircle2 className="h-8 w-8" />
                                </div>
                                <CardTitle className="text-2xl">Verdict Generation</CardTitle>
                                <CardDescription>
                                    Synthesizing all gathered information, our AI provides a clear, concise verdict on the likely accuracy of a claim.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" /><span>Simple ratings like "True", "False", or "Mixed".</span></li>
                                    <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" /><span>Includes a confidence score and a summary of the reasoning.</span></li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

             {/* How It Works Section */}
            <section className="py-16 md:py-24 bg-card">
                <div className="container mx-auto px-4">
                     <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="animate-in fade-in slide-in-from-left-10 duration-700 delay-200">
                            <Image
                                src="https://picsum.photos/600/500"
                                alt="How it works"
                                width={600}
                                height={500}
                                className="rounded-lg shadow-xl"
                                data-ai-hint="abstract network"
                            />
                        </div>
                        <div className="animate-in fade-in slide-in-from-right-10 duration-700 delay-400">
                            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">The Technology Behind Factify</h2>
                            <p className="text-muted-foreground text-lg mb-4">
                                Factify is powered by advanced large language models (LLMs) and a multi-step analysis pipeline.
                            </p>
                            <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
                                <li><strong>Input Processing:</strong> We take your input—whether text or a URL—and prepare it for analysis.</li>
                                <li><strong>Claim Identification:</strong> The core claims are extracted using natural language understanding.</li>
                                <li><strong>Parallelized Evidence Search:</strong> Our system initiates a broad search for relevant information and cross-references it with known fact-checking APIs.</li>
                                <li><strong>AI-Powered Synthesis:</strong> The LLM synthesizes the gathered evidence, weighs the arguments, and formulates a verdict and a rationale.</li>
                                <li><strong>Structured Output:</strong> The final result is presented in a clear, easy-to-understand format.</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
