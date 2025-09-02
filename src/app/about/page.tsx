import { CheckSquare, Users, Target, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="bg-background text-foreground">
            {/* Hero Section */}
            <section className="py-20 md:py-32 bg-card animate-in fade-in duration-1000">
                <div className="container mx-auto px-4 text-center">
                    <CheckSquare className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 tracking-tight">
                        About Factify
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        We are dedicated to promoting truth and clarity in an age of information overload. Learn about our mission, our team, and the technology that powers our analysis.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="animate-in fade-in slide-in-from-left-10 duration-700 delay-200">
                            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Our Mission</h2>
                            <p className="text-muted-foreground text-lg mb-4">
                                In a world saturated with information, distinguishing fact from fiction has never been more challenging. Our mission is to empower individuals with reliable, evidence-based analysis to navigate the digital landscape with confidence.
                            </p>
                            <p className="text-muted-foreground text-lg">
                                We believe in transparency and objectivity. Factify is designed to be an impartial tool that presents evidence from multiple perspectives, helping you to think critically and form your own conclusions.
                            </p>
                        </div>
                        <div className="animate-in fade-in slide-in-from-right-10 duration-700 delay-400">
                            <Image
                                src="https://picsum.photos/600/400"
                                alt="Our Mission"
                                width={600}
                                height={400}
                                className="rounded-lg shadow-xl"
                                data-ai-hint="data analysis"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-16 md:py-24 bg-card">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Core Values</h2>
                        <p className="text-muted-foreground mt-4 text-lg">
                            Our principles guide every analysis we perform and every feature we develop.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
                             <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                                <Target className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Objectivity</h3>
                            <p className="text-muted-foreground">We strive to provide unbiased assessments by analyzing data and evidence without a predetermined agenda.</p>
                        </div>
                        <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-400">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                                <ShieldCheck className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                            <p className="text-muted-foreground">We believe in showing our work. Our analyses include links to sources and a clear breakdown of the evidence.</p>
                        </div>
                        <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-600">
                             <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                                <Users className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Empowerment</h3>
                            <p className="text-muted-foreground">Our goal is to equip you with the tools to be a more discerning consumer of information.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
