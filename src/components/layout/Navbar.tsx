
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems, type NavItem } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react'; // Zap icon for logo

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 sm:max-w-lg md:max-w-xl">
      <nav className="bg-card/80 backdrop-blur-md shadow-xl rounded-full p-3">
        <div className="container mx-auto flex items-center justify-between px-0">
          <Link href="/" className="flex items-center space-x-2 text-xl font-bold gradient-text">
            <Zap className="h-7 w-7 text-primary" />
            <span>PixelsFlow</span>
          </Link>
          <ul className="flex items-center space-x-2 sm:space-x-3">
            {navItems.map((item: NavItem) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-full text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:text-primary-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
