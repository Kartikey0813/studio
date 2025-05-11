
import type { Metadata } from 'next';
import { Unbounded } from 'next/font/google'; // Changed from GeistSans
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const unbounded = Unbounded({
  subsets: ['latin'],
  variable: '--font-unbounded',
  display: 'swap',
});
const geistMono = GeistMono; // Keep GeistMono for mono font styles

export const metadata: Metadata = {
  title: 'PixelsFlow Portfolio',
  description: 'Creative Design and Development by PixelsFlow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${unbounded.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow pt-20"> {/* Add padding-top to avoid overlap with fixed navbar */}
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
