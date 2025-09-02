import Link from 'next/link';
import { CheckSquare, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavLink } from './nav-link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 mr-auto">
          <CheckSquare className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold font-headline">Factify</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/services">Services</NavLink>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden ml-4">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col gap-6 pt-12">
                <Link href="/" className="flex items-center gap-2 mb-4">
                    <CheckSquare className="h-7 w-7 text-primary" />
                    <span className="text-xl font-bold font-headline">Factify</span>
                </Link>
                <NavLink href="/">Home</NavLink>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/services">Services</NavLink>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
