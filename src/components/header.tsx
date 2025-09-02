import { CheckSquare } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2">
            <CheckSquare className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold font-headline">Factify</span>
        </div>
      </div>
    </header>
  );
}
