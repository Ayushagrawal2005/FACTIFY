import Link from 'next/link';
import { CheckSquare, Twitter, Linkedin, Github } from 'lucide-react';
import { Button } from './ui/button';

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <CheckSquare className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold font-headline">Factify</span>
            </Link>
            <p className="text-muted-foreground">
              Uncovering the truth in a world of information. Your AI-powered partner for combating misinformation.
            </p>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
             <div>
                <h3 className="font-semibold mb-4">Navigation</h3>
                <ul className="space-y-2">
                    <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                    <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
                    <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
                </ul>
            </div>
             <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                    <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                    <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
                </ul>
            </div>
             <div>
                <h3 className="font-semibold mb-4">Connect</h3>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <a href="#" aria-label="Twitter"><Twitter className="h-5 w-5" /></a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <a href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <a href="#" aria-label="GitHub"><Github className="h-5 w-5" /></a>
                    </Button>
                </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Factify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
