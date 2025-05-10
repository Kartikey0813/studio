
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems, type NavItem } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { Zap, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4 sm:max-w-xl md:max-w-2xl">
      <nav className="bg-card/80 backdrop-blur-md shadow-xl rounded-full p-2 sm:p-3">
        <div className="container mx-auto flex items-center justify-between px-0">
          <Link href="/" className="flex items-center space-x-2 text-xl font-bold gradient-text">
            <Zap className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
            <span className="hidden sm:inline">PixelsFlow</span>
          </Link>
          <ul className="flex items-center space-x-1 sm:space-x-2">
            {navItems.map((item: NavItem) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:text-primary-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="rounded-full w-8 h-8 sm:w-9 sm:h-9 hover:bg-primary/20"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  ) : (
                    <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  )}
                </Button>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
