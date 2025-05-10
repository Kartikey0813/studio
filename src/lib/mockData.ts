
import type { LucideIcon } from 'lucide-react';
import { Briefcase, Code, Palette, Search, Film, MessageSquare, TrendingUp, Users, MapPin, Calendar, UserCircle } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
];

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon; // Using Lucide icons
  image?: string; // Optional image for more visual representation
}

export const services: Service[] = [
  { id: 's1', title: 'Web Design', description: 'Crafting beautiful and intuitive user interfaces that engage your audience.', icon: Palette, image: 'https://picsum.photos/seed/webdesign/600/400' },
  { id: 's2', title: 'Web Development', description: 'Building robust and scalable web applications tailored to your needs.', icon: Code, image: 'https://picsum.photos/seed/webdev/600/400' },
  { id: 's3', title: 'UI/UX Strategy', description: 'User-centric design strategies to create meaningful and impactful digital experiences.', icon: Search, image: 'https://picsum.photos/seed/uiux/600/400' },
  { id: 's4', title: 'Motion Graphics', description: 'Bringing your brand to life with captivating animations and visual storytelling.', icon: Film, image: 'https://picsum.photos/seed/motion/600/400' },
  { id: 's5', title: 'Digital Marketing', description: 'Comprehensive marketing solutions to boost your online presence and growth.', icon: TrendingUp, image: 'https://picsum.photos/seed/marketing/600/400' },
  { id: 's6', title: 'Brand Identity', description: 'Creating unique and memorable brand identities that resonate with your target market.', icon: Briefcase, image: 'https://picsum.photos/seed/branding/600/400' },
];

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link?: string;
}

export const projects: Project[] = Array.from({ length: 8 }, (_, i) => ({
  id: `p${i + 1}`,
  title: `Project Alpha ${i + 1}`,
  category: ['E-commerce', 'Portfolio', 'SaaS', 'Mobile App'][i % 4],
  description: 'A groundbreaking project delivering exceptional user experiences and innovative solutions in its domain.',
  image: `https://picsum.photos/seed/project${i + 1}/800/600`,
  link: '#',
}));

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  feedback: string;
  image: string;
  rating: number; // 1 to 5
}

export const testimonials: Testimonial[] = [
  { id: 't1', name: 'Jane Doe', role: 'CEO, AlphaCorp', feedback: 'PixelsFlow transformed our digital presence. Their creativity and professionalism are unmatched!', image: 'https://picsum.photos/seed/person1/200/200', rating: 5 },
  { id: 't2', name: 'John Smith', role: 'Founder, BetaSolutions', feedback: 'Working with PixelsFlow was a breeze. They understood our vision and delivered beyond expectations.', image: 'https://picsum.photos/seed/person2/200/200', rating: 5 },
  { id: 't3', name: 'Alice Wonderland', role: 'Marketing Head, GammaEnt', feedback: 'The team is incredibly talented and dedicated. Highly recommend for any design and development needs.', image: 'https://picsum.photos/seed/person3/200/200', rating: 4 },
];

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string; // Full content for individual blog post page (optional for list view)
  image: string;
  author: string;
  authorImage?: string;
  date: string; // ISO string or formatted
  tags: string[];
}

export const blogPosts: BlogPost[] = Array.from({ length: 22 }, (_, i) => ({
  id: `b${i + 1}`,
  slug: `blog-post-title-${i + 1}`,
  title: `The Future of Web Design: Trends for 202${(i % 5) + 4}`,
  excerpt: 'Discover the latest trends shaping the future of web design, from AI integration to immersive experiences. Stay ahead of the curve with PixelsFlow insights.',
  image: `https://picsum.photos/seed/blog${i + 1}/800/500`,
  author: ['Alex Johnson', 'Maria Garcia', 'Sam Lee'][i % 3],
  authorImage: `https://picsum.photos/seed/author${i%3}/100/100`,
  date: new Date(2024, 5 - (i % 6) , 28 - (i % 28)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  tags: [['Web Design', 'UX', 'Technology', 'Innovation'][i % 4]],
}));

export const footerLinks = {
  services: services.slice(0, 4).map(s => ({ label: s.title, href: `/services#${s.id}` })),
  company: [
    { label: 'About Us', href: '/#about-us' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/blog' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
  ],
  recentPosts: blogPosts.slice(0, 3).map(p => ({ label: p.title, href: `/blog/${p.slug}` })),
};
