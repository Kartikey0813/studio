
import Link from 'next/link';
import { Zap, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { footerLinks } from '@/lib/mockData';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 mt-auto">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold mb-4 gradient-text">
              <Zap className="h-8 w-8 text-primary" />
              <span>PixelsFlow</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Creative design and development agency. We bring your ideas to life.
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-foreground mb-3">Services</h5>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-foreground mb-3">Company</h5>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
               {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-foreground mb-3">Recent Posts</h5>
            <ul className="space-y-2">
              {footerLinks.recentPosts.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-2">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} PixelsFlow. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook size={20} />
            </Link>
            <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter size={20} />
            </Link>
            <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram size={20} />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
