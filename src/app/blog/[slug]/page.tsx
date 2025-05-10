
import { blogPosts, type BlogPost as BlogPostType } from '@/lib/mockData';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {notFound} from 'next/navigation';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Function to generate static paths
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Function to generate metadata
export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: 'Post Not Found | PixelsFlow Blog',
    }
  }
  return {
    title: `${post.title} | PixelsFlow Blog`,
    description: post.excerpt,
  };
}


export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Dummy content if not present
  const fullContent = post.content || `
    <p class="mb-4 text-lg leading-relaxed">${post.excerpt}</p>
    <p class="mb-4 text-lg leading-relaxed">This is a placeholder for the full blog post content. In a real application, this would be fetched from a CMS or a markdown file. For now, we're re-using the excerpt and adding some more details.</p>
    <h3 class="text-2xl font-semibold mt-6 mb-3 text-primary">Key Takeaways</h3>
    <ul class="list-disc list-inside mb-4 space-y-1 text-lg">
      <li>Understand the core concepts presented in "${post.title}".</li>
      <li>Explore how these ideas can be applied in practical scenarios.</li>
      <li>Gain insights from PixelsFlow's perspective on current trends.</li>
    </ul>
    <p class="mb-4 text-lg leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <p class="mb-4 text-lg leading-relaxed">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
  `;


  return (
    <div className="container py-12 md:py-20">
      <article className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Button variant="outline" asChild className="mb-6 hover:bg-accent/10">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center text-sm text-muted-foreground space-x-4 mb-6">
            <div className="flex items-center">
              <CalendarDays size={16} className="mr-1.5" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <User size={16} className="mr-1.5" />
              <span>By {post.author}</span>
            </div>
          </div>
        </div>

        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg mb-8">
          <Image 
            src={post.image} 
            alt={post.title} 
            fill 
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
            data-ai-hint="blog header technology"
          />
        </div>

        <div 
          className="prose prose-lg dark:prose-invert prose-headings:text-primary prose-a:text-accent hover:prose-a:text-accent/80 prose-strong:text-foreground max-w-none"
          dangerouslySetInnerHTML={{ __html: fullContent }}
        />

        <div className="mt-10 pt-6 border-t border-border">
          <h4 className="text-lg font-semibold mb-3 text-foreground">Tags:</h4>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm hover:bg-primary/20">
                <Tag size={14} className="mr-1.5" /> {tag}
              </Badge>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

